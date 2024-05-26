# BUSCA-DEV

Descrição breve sobre o projeto, seus objetivos e o que ele faz.

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:
- Node.js (v14.x ou superior recomendado)
- npm (v7.x ou superior) ou Yarn (v1.22.x ou superior)

Você pode verificar as versões instaladas com os seguintes comandos:
```bash
node -v
npm -v
yarn -v

## Configuração Inicial

Instalação do Projeto
Clone o repositório:
git clone [URL do repositório]
cd [nome-do-projeto]

Instale as dependências do projeto:

npm install
# ou
yarn install

## Executando o Ambiente de Desenvolvimento

Para iniciar o servidor de desenvolvimento, execute:


npm start
# ou
yarn start

Este comando iniciará o servidor local e abrirá o projeto no navegador padrão. Qualquer alteração nos arquivos do projeto será automaticamente recarregada no navegador.

## Build para Produção

Para gerar a versão de produção do projeto, execute:

npm run build
# ou
yarn build

Os arquivos de produção serão armazenados no diretório dist/. Estes arquivos estão prontos para serem hospedados em qualquer servidor web.

## Motivação das Escolhas

Bibliotecas:
RxJS: Utilizado para gerenciar o estado e a comunicação entre componentes de maneira eficaz, através de programação reativa.
SweetAlert2: Optei por SweetAlert2 para melhorar a interface de usuário, proporcionando alertas modais mais elegantes e funcionais em comparação com os alertas padrão do navegador.

## Estrutura do Projeto

O projeto está estruturado da seguinte forma:

src/app: Contém todos os componentes, serviços e modelos utilizados no projeto.
components: Diretório para os componentes da interface de usuário.
services: Diretório para os serviços que gerenciam as chamadas de API e a lógica de negócios.
src/assets: Diretório para imagens, fontes e outros ativos estáticos.
