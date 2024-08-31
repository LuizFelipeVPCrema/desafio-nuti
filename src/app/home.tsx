// "use client";
// import Button from "@/components/Button";
// import ContractsList from "@/components/ContractList";
// import Input from "@/components/Input";
// import OrgInfo from "@/components/OrgInfo";
// import { ContractType } from "@/Contract";
// import { OrgInfoType } from "@/OrgInfo";
// import { fetchOrgContracts } from "@/services/api";
// import React, { useState } from "react";

// const formatCnpj = (value: string) => {
//     return value
//       .replace(/\D/g, '') // Remove tudo que não for dígito
//       .replace(/(\d{2})(\d)/, '$1.$2') // Coloca o primeiro ponto
//       .replace(/(\d{3})(\d)/, '$1.$2') // Coloca o segundo ponto
//       .replace(/(\d{3})(\d)/, '$1/$2') // Coloca a barra
//       .replace(/(\d{4})(\d)/, '$1-$2') // Coloca o traço
//       .replace(/(-\d{2})\d+?$/, '$1'); // Limita o tamanho
//   };


// const Home: React.FC = () => {
//   const [cnpjOrgao, setCnpjOrgao] = useState('');
//   const [dataInicial, setDataInicial] = useState('');
//   const [dataFinal, setdataFinal] = useState('');
//   const [page, setPage] = useState<number>(1);
//   const [orgInfo, setOrgInfo] = useState<OrgInfoType | null>(null);
//   const [contracts, setContracts] = useState<ContractType[] | null>(null);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   const handleSearch = async () => {
//     // Validação dos campos obrigatórios
//     if (!cnpjOrgao.trim()) {
//       setErrorMessage('CNPJ é obrigatório.');
//       return;
//     }
//     if (!dataInicial.trim()) {
//       setErrorMessage('Data inicial é obrigatória.');
//       return;
//     }
//     if (!dataFinal.trim()) {
//       setErrorMessage('Data final é obrigatória.');
//       return;
//     }
//     if (!page || page <= 0) {
//       setErrorMessage('A página deve ser um número positivo.');
//       return;
//     }
//     if (new Date(dataInicial) >= new Date(dataFinal)) {
//         setErrorMessage('A data inicial deve ser menor que a data final.');
//         return;
//       }

//     try {
//       setErrorMessage(null); // Limpa qualquer mensagem de erro anterior
//       const cleanCnpj = cnpjOrgao.replace(/\D/g, ''); // Remove a formatação do CNPJ antes de enviar
//       const response = await fetchOrgContracts(cleanCnpj, dataInicial, dataFinal, page); // Envia o CNPJ sem formatação
//       setOrgInfo(response.data[0].orgaoEntidade); // Ajuste se necessário
//       setContracts(response.data); // Use 'response.data' para passar os contratos para o ContractList
//     } catch (error: any) {
//       if (error.response && error.response.status === 422) {
//         setOrgInfo(null);
//         setContracts([]);
//         setErrorMessage('Nenhum contrato encontrado com o CNPJ fornecido.');
//       } else {
//         console.error("Erro ao buscar contratos:", error);
//         setErrorMessage('Ocorreu um erro ao buscar os contratos. Tente novamente.');
//       }
//     }
//   };

//   return (
//     <div className="p-6 max-w-lg mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Consulta de Contratos</h1>
//       <Input
//         type="text"
//         placeholder="CNPJ"
//         value={formatCnpj(cnpjOrgao)} // Exibe o CNPJ formatado
//         onChange={(event) => {
//           const value = event.target.value.replace(/\D/g, ''); // Remove a formatação para armazenar o valor real
//           setCnpjOrgao(value);
//         }}
//       />
//       <Input
//         type="date"
//         value={dataInicial}
//         onChange={(event) => setDataInicial(event.target.value)}
//       />
//       <Input
//         type="date"
//         value={dataFinal}
//         onChange={(event) => setdataFinal(event.target.value)}
//       />
//       <Input
//         type="number"
//         value={page}
//         onChange={(event) => setPage(Number(event.target.value))}
//       />
//       <Button onClick={handleSearch}>
//         Buscar
//       </Button>

//       {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
//       {orgInfo && <OrgInfo org={orgInfo} />}
//       <ContractsList contracts={contracts} />
//     </div>
//   );
// }

// export default Home;
"use client";
import Button from "@/components/Button";
import ContractsList from "@/components/ContractList";
import Input from "@/components/Input";
import OrgInfo from "@/components/OrgInfo";
import { ContractType } from "@/Contract";
import { OrgInfoType } from "@/OrgInfo";
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
  const [dataFinal, setdataFinal] = useState('');
  const [page, setPage] = useState<number>(1);
  const [orgInfo, setOrgInfo] = useState<OrgInfoType | null>(null);
  const [contracts, setContracts] = useState<ContractType[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSearch = async () => {
    // Validação dos campos obrigatórios
    if (!cnpjOrgao.trim()) {
      setErrorMessage('CNPJ é obrigatório.');
      return;
    }
    if (!dataInicial.trim()) {
      setErrorMessage('Data inicial é obrigatória.');
      return;
    }
    if (!dataFinal.trim()) {
      setErrorMessage('Data final é obrigatória.');
      return;
    }
    if (!page || page <= 0) {
      setErrorMessage('A página deve ser um número positivo.');
      return;
    }

    try {
      setErrorMessage(null); // Limpa qualquer mensagem de erro anterior
      const cleanCnpj = cnpjOrgao.replace(/\D/g, ''); // Remove a formatação do CNPJ antes de enviar
      const response = await fetchOrgContracts(cleanCnpj, dataInicial, dataFinal, page); // Envia o CNPJ sem formatação
      setOrgInfo(response.data[0].orgaoEntidade); // Ajuste se necessário
      setContracts(response.data); // Use 'response.data' para passar os contratos para o ContractList
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        setOrgInfo(null);
        setContracts([]);
        setErrorMessage('Nenhum contrato encontrado com o CNPJ fornecido.');
      } else {
        console.error("Erro ao buscar contratos:", error);
        setErrorMessage('Ocorreu um erro ao buscar os contratos. Tente novamente.');
      }
    }
  };

  // Atualização automática das datas
  const handleDataFinalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDataFinal = event.target.value;
    setdataFinal(newDataFinal);

    if (new Date(dataInicial) > new Date(newDataFinal)) {
      setDataInicial(newDataFinal); // Se a data inicial for maior, ajusta para ser igual à data final
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
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
      <Input
        type="number"
        value={page}
        onChange={(event) => setPage(Number(event.target.value))}
      />
      <Button onClick={handleSearch}>
        Buscar
      </Button>

      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      {orgInfo && <OrgInfo org={orgInfo} />}
      <ContractsList contracts={contracts} />
    </div>
  );
}

export default Home;
