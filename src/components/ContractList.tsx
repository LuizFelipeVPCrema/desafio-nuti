import { ContractType } from "@/Contract";
import React from "react";

export interface ContractListProps {
    contracts: ContractType[] | null;
}

const formatCnpj = (value: string) => {
    return value
      .replace(/\D/g, '') // Remove tudo que não for dígito
      .replace(/(\d{2})(\d)/, '$1.$2') // Coloca o primeiro ponto
      .replace(/(\d{3})(\d)/, '$1.$2') // Coloca o segundo ponto
      .replace(/(\d{3})(\d)/, '$1/$2') // Coloca a barra
      .replace(/(\d{4})(\d)/, '$1-$2') // Coloca o traço
      .replace(/(-\d{2})\d+?$/, '$1'); // Limita o tamanho
};

function formatToBRL(value: number): string {
    return value
        .toFixed(2) // Garante que o valor tenha duas casas decimais
        .replace('.', ',') // Substitui o ponto decimal por vírgula
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.') // Adiciona pontos a cada grupo de três dígitos
        .replace(/^/, 'R$ '); // Adiciona o símbolo de reais no início
}

const ContractList: React.FC<ContractListProps> = ({ contracts }) => {
    if (!contracts || contracts.length === 0) {
        return <p>Error!</p>
    }
    return (
        <div className="flex flex-col p-4">
            {contracts?.map((contract) => (
                <>
                    <h4 className="text-xl " key={contract.numeroControlePNCP}>{contract.orgaoEntidade.razaoSocial} - {formatCnpj(contract.orgaoEntidade.cnpj)}</h4>
                    <h3 className="flex justify-center">-------------------- Contrato --------------------</h3>
                    <ul className="pb-4">
                            <li className="" key={contract.numeroControlePNCP}>
                                <p className="font-bold ">Fornecedor: </p>
                                    <p className="">{contract.nomeRazaoSocialFornecedor}</p>
                                <p className="font-bold">Objeto:</p>
                                    {contract.objetoContrato}
                                <p className="font-bold">Vigência: </p>
                                    {contract.dataVigenciaInicio} - {contract.dataVigenciaFim}
                                <p className="font-bold">Valor Inicial: </p>
                                    {formatToBRL(contract.valorInicial)}
                            </li>
                    </ul>
                </>
            ))}
        </div>
    );
}

export default ContractList;
