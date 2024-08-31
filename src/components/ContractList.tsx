import { ContractType } from "@/Contract";
import React from "react";

interface ContractListProps {
    contracts: ContractType[] | null;
}

const ContractList: React.FC<ContractListProps> = ({ contracts }) => {
    if (!contracts || contracts.length === 0) {
        return <p>Nenhum contrato encontrado.</p>;
    }
    return (
        <div>
            <h3>Contratos</h3>
            <ul>
                {contracts.map((contract) => (
                    <li key={contract.numeroControlePNCP}>
                        <p>Fornecedor: {contract.nomeRazaoSocialFornecedor}</p>
                        <p>Objeto: {contract.objetoContrato}</p>
                        <p>Vigência: {contract.dataVigenciaInicio} - {contract.dataVigenciaFim}</p>
                        <p>Valor Inicial: {contract.valorInicial}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ContractList;
