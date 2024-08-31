import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pncp.gov.br/api/consulta/v1', // baseURL da API do PNCP
});

const formatDate = (date: string): string => {
    const [year, month, day] = date.split('-');
    return `${year}${month}${day}`;
  };

export const fetchOrgContracts = async (cnpjOrgao: string, dataInicial: string, dataFinal: string, pagina: Number) => {

const dataInicialFormatada = formatDate(dataInicial)
const dataFinalFormatada = formatDate(dataFinal)


    try{
        const response = await api.get('/contratos', {
            params: {
            cnpjOrgao,
            dataInicial: dataInicialFormatada,
            dataFinal: dataFinalFormatada,
            pagina
            },

    });
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
