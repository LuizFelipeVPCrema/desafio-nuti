---

# Consulta de Contratos Públicos - Desafio NUTI

Este projeto é uma aplicação web que permite a consulta de contratos de órgãos públicos utilizando a API do Portal Nacional de Contratações Públicas (PNCP). A aplicação permite que o usuário consulte contratos de um órgão público específico, fornecendo o CNPJ do órgão e um período de datas. As informações sobre os contratos, incluindo detalhes do fornecedor, objeto do contrato, vigência e valores, são exibidas na página.

## Funcionalidades

- **Consulta de Contratos:** Permite a consulta de contratos de um órgão público específico, informando o CNPJ, a data inicial e a data final.
- **Exibição de Contratos:** Exibe uma lista de contratos com informações detalhadas sobre o fornecedor, objeto do contrato, vigência e valores.
- **Formatação Monetária:** Os valores dos contratos são formatados de acordo com o padrão monetário brasileiro (R$ 0.000,00).
- **Validação de Datas:** Quando o CNPJ não é informado, a aplicação valida se a diferença entre a data inicial e a data final é de no máximo 1 dia(Por limitações da API e conectividade com o banco de dados, com mais de 1 dia de range, se torna quase impossível  retornar algum valor sem dar error 500).

## Tecnologias Utilizadas

- **Frontend:**
  - [Next.js](https://nextjs.org/) - Framework React para renderização do lado do servidor e geração de páginas estáticas.
  - [React](https://reactjs.org/) - Biblioteca para construção de interfaces de usuário.
  - [Tailwind CSS](https://tailwindcss.com/) - Framework de CSS utilitário para estilização.
  - [Axios](https://axios-http.com/) - Cliente HTTP baseado em Promises para o navegador e Node.js.

- **Backend:**
  - **API:** Consome a API do PNCP para obter as informações dos contratos.

## Instalação

### Pré-requisitos

- Node.js instalado (recomendado: versão 14 ou superior)
- npm ou yarn

### Passos para Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   cd nome-do-repositorio
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

   ou

   ```bash
   yarn install
   ```

3. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

   ou

   ```bash
   yarn dev
   ```

4. **Acesse a aplicação:**

   Abra seu navegador e acesse `http://localhost:3000`.

## Uso

1. **Consulta de Contratos:**
   - Insira o CNPJ do órgão público no campo de texto (opcional).
   - Selecione a data inicial e a data final para o período de consulta.
   - Clique no botão "Buscar" para realizar a consulta.
   - Se nenhum CNPJ for informado, a diferença entre a data inicial e a data final deve ser de no máximo 1 dia.


## Estrutura do Projeto

- **/components**: Contém os componentes reutilizáveis da aplicação, como botões, inputs, e listas de contratos.
- **/pages**: Contém as páginas da aplicação, incluindo a página principal de consulta.
- **/services**: Contém o código para comunicação com a API do PNCP.

## Desenvolvimento

### Scripts Disponíveis

- **`npm run dev`**: Inicia o servidor de desenvolvimento.
- **`npm run build`**: Compila o projeto para produção.
- **`npm start`**: Inicia o servidor de produção (após rodar `npm run build`).
- **`npm run lint`**: Verifica o código usando ESLint.

---
