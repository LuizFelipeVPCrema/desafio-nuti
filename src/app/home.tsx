"use client";
import Button from "@/components/Button";
import ContractsList from "@/components/ContractList";
import Input from "@/components/Input";
import { ContractType } from "@/Contract";
import { fetchOrgContracts } from "@/services/api";
import React, { useState } from "react";

const formatCnpj = (value: string) => {
    return value
      .replace(/\D/g, '') // Remove tudo que não for dígito
      .replace(/(\d{2})(\d)/, '$1.$2') // Coloca o primeiro ponto
      .replace(/(\d{3})(\d)/, '$1.$2') // Coloca o segundo ponto
      .replace(/(\d{3})(\d)/, '$1/$2') // Coloca a barra
      .replace(/(\d{4})(\d)/, '$1-$2') // Coloca o traço
      .replace(/(-\d{2})\d+?$/, '$1'); // Limita o tamanho
};

const Home: React.FC = () => {
  const [cnpjOrgao, setCnpjOrgao] = useState('');
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [contracts, setContracts] = useState<ContractType[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Adicionando estado de carregamento

  const handleSearch = async () => {
    // Validação dos campos obrigatórios
    if (!cnpjOrgao) {
      const startDate = new Date(dataInicial);
      const endDate = new Date(dataFinal);
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

      if (diffDays > 1) {
        alert("Quando o CNPJ não é fornecido, a diferença entre a data inicial e a data final deve ser de no máximo 1 dia. ATENÇÃO: ERROS DE COMUNICAÇÃO COM O BANCO DE DADOS SÃO ESPERADOS!");
        return;
      }
    }
    if (!dataInicial.trim()) {
      setErrorMessage('Data inicial é obrigatória.');
      return;
    }
    if (!dataFinal.trim()) {
      setErrorMessage('Data final é obrigatória.');
      return;
    }

    try {
      setLoading(true); // Inicia o estado de carregamento
      setErrorMessage(null); // Limpa qualquer mensagem de erro anterior
      const cleanCnpj = cnpjOrgao.replace(/\D/g, ''); // Remove a formatação do CNPJ antes de enviar
      const response = await fetchOrgContracts(cleanCnpj, dataInicial, dataFinal); // Envia o CNPJ sem formatação
      setContracts(response.data); // Uso do 'response.data' para passar os contratos para o ContractList
    } catch (error: any) {
      setContracts(null);
      if (error.response && error.response.status === 422) {
        setErrorMessage('Nenhum contrato encontrado!');
      } else if (error.response && error.response.status === 500) {
        setErrorMessage(`Erro na comunicação com o banco de dados.\n Tente Novamente Mais Tarde!`);
      } else {
        console.error("Erro ao buscar contratos:", error);
        setErrorMessage('Ocorreu um erro ao buscar os contratos. Tente novamente.');
      }
    } finally {
      setLoading(false); // Finaliza o estado de carregamento
    }
  };

  // Atualização automática das datas
  const handleDataFinalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDataFinal = event.target.value;
    setDataFinal(newDataFinal);

    if (new Date(dataInicial) > new Date(newDataFinal)) {
      setDataInicial(newDataFinal); // Se a data inicial for maior, ajusta para ser igual à data final
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto h-auto min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Consulta de Contratos</h1>
      <Input
        type="text"
        placeholder="CNPJ"
        value={formatCnpj(cnpjOrgao)} // Exibe o CNPJ formatado
        onChange={(event) => {
          const value = event.target.value.replace(/\D/g, ''); // Remove a formatação para armazenar o valor real
          setCnpjOrgao(value);
        }}
      />
      <Input
        type="date"
        value={dataInicial}
        onChange={(event) => setDataInicial(event.target.value)}
      />
      <Input
        type="date"
        value={dataFinal}
        onChange={handleDataFinalChange}
      />
      <Button onClick={handleSearch} disabled={loading}>
        {loading ? 'Buscando...' : 'Buscar'}
      </Button>

      {errorMessage && <p className="text-red-500 mt-4 flex items-center justify-center">{errorMessage}</p>}
      {contracts && <ContractsList contracts={contracts} />}
    </div>
  );
}

export default Home;
