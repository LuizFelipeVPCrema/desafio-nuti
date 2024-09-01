export interface OrgaoEntidadeType {
    cnpj: string,
    razaoSocial: string
}

export interface ContractType {
    numeroControlePNCP: string;
    dataVigenciaInicio: string;
    dataVigenciaFim: string;
    nomeRazaoSocialFornecedor: string;
    objetoContrato: string;
    valorInicial: number;
    orgaoEntidade: OrgaoEntidadeType;
}
