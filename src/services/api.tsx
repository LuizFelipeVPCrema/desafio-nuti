import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pncp.gov.br/api/consulta/v1', // baseURL da API do PNCP
});

const formatDate = (date: string): string => {
    const [year, month, day] = date.split('-');
    return `${year}${month}${day}`;
  };

export const fetchOrgContracts = async (cnpjOrgao: string | null, dataInicial: string, dataFinal: string) => {

const dataInicialFormatada = formatDate(dataInicial)
const dataFinalFormatada = formatDate(dataFinal)

    // ! CRIA O OBJETO PARAMS E REMOVE O cnpjOrgao se ele for null ou vazio para não dar erro na requisão da API
    const params: any = {
        dataInicial: dataInicialFormatada,
        dataFinal: dataFinalFormatada,
        pagina: 1, //* API Só retorna valores se o valor da pagina for 1.
        tamanhoPagina: 10
    };

    if(cnpjOrgao) {
        params.cnpjOrgao = cnpjOrgao;
    }

    try{
        const response = await api.get('/contratos', { params });
    return response.data;
    } catch(error) {
        console.error('Erro ao buscar contratos:', error);
        if(axios.isAxiosError(error)) {
            console.error('Erro de Axios', error.message);
            throw error;
        } else {
            console.error('Erro desconhecido', error);
            throw new Error('ERRO DESCONHECIDO AO BUSCAR CONTRATOS')
        }
    }
};
