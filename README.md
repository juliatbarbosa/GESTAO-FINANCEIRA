# Gestão Financeira Main

Uma aplicação web para gerenciamento de finanças pessoais e empresariais, desenvolvida com Node.js e Express seguindo o padrão MVC (Model-View-Controller).

## Características

- Interface web responsiva usando CSS3 e JavaScript.
- API REST completa para integração com outras aplicações.
- Gerenciamento de transações financeiras com informações como valor, categoria, data e tipo.
- Categorização de transações para melhor organização.
- Busca e filtragem de transações por categoria ou tipo.
- Logging de operações usando logs personalizados.
- Persistência de dados em banco de dados relacional (MySQL/PostgreSQL).

## Estrutura do Projeto

```
gestao-financeira-main/
│
├── backend/
│   ├── conexao/
│   │   └── Conexao.js              # Configuração da conexão com o banco de dados
│   ├── controller/
│   │   ├── CadastroFinancieroController.js  # Controlador para transações financeiras
│   │   ├── CategoriaController.js           # Controlador para categorias
│   │   └── ComponentesController.js         # Controlador para componentes auxiliares
│   ├── logger/
│   │   ├── Logger.js               # Implementação de logging personalizado
│   │   └── logs.txt                # Arquivo de logs
│   ├── model/
│   │   ├── Categorias.js           # Modelo de Categoria
│   │   ├── Financeiros.js          # Modelo de Transação Financeira
│   │   ├── Response.js             # Modelo de resposta genérica
│   │   └── Tipo.js                 # Modelo de Tipo de Transação
│   ├── routes/
│   │   ├── CategoriaRoutes.js      # Rotas para categorias
│   │   ├── ComponentesRoutes.js    # Rotas para componentes auxiliares
│   │   └── FinanceiroRoutes.js     # Rotas para transações financeiras
│   ├── server.js                   # Aplicação principal do servidor
│   ├── package-lock.json
│   └── package.json
│
├── frontend/
│   ├── css/
│   │   └── style.css               # Estilos CSS
│   ├── font/
│   │   ├── Montserrat-Regular.ttf  # Fonte regular
│   │   └── Montserrat-SemiBold.ttf # Fonte semi-bold
│   ├── img/
│   │   ├── close.png               # Ícone de fechar
│   │   ├── logo.png                # Logo da aplicação
│   │   └── lupa.png                # Ícone de busca
│   ├── js/
│   │   ├── framework/
│   │   │   └── moment.min.js       # Biblioteca para manipulação de datas
│   │   └── pages/
│   │       ├── categorias.html     # Página de categorias
│   │       └── transacoes.html     # Página de transações
│   └── index.html                  # Página inicial
│
└── README.md                       # Documentação do projeto
```

---

### Parte 2: Padrões de Projeto Utilizados

```
## Padrões de Projeto Utilizados

O projeto implementa vários padrões de design para promover organização, manutenibilidade e extensibilidade do código.

### MVC (Model-View-Controller)
Separa a aplicação em três componentes interconectados, garantindo a separação de responsabilidades:

- **Models (Modelos)**: 
  - Implementados em `backend/model/Categorias.js`, `backend/model/Financeiros.js`, etc.
  - Representam os dados da aplicação e suas regras de validação.
  - Contêm métodos de conversão como `toJSON()` e `fromJSON()`.
  - Não possuem dependências com outras camadas da aplicação.

- **Views (Visões)**: 
  - Implementadas como páginas HTML no diretório `frontend/pages/`.
  - Responsáveis apenas pela apresentação dos dados ao usuário.
  - Utilizam CSS para estilização e JavaScript para interatividade.
  - Separadas por funcionalidade em arquivos específicos.

- **Controllers (Controladores)**: 
  - Implementados em `backend/controller/`.
  - Gerenciam o fluxo da aplicação, processando requisições HTTP.
  - Delegam operações de negócio para a camada de serviços.
  - Disponibilizam endpoints tanto para API REST quanto para interface web.

**Benefícios**: Manutenção simplificada, facilidade para testes, reutilização de código e desenvolvimento paralelo por diferentes membros da equipe.

### Singleton
Um padrão criacional que garante que uma classe tenha apenas uma instância e fornece um ponto global de acesso a ela.

- **Implementação**: `backend/logger/Logger.js`.
- **Características**:
  - Centraliza o registro de logs em toda a aplicação.
  - Registra eventos importantes no arquivo `logs.txt`.

**Benefícios**: Economia de recursos, acesso centralizado ao log em toda a aplicação, garantia de consistência nos registros.

### Repository Pattern

Um padrão estrutural que isola a camada de domínio da lógica de acesso a dados.

- **Implementação**: No frontend, as operações de acesso a dados são realizadas através de chamadas HTTP (`fetch`) para os endpoints da API REST.
  - Essas chamadas encapsulam a lógica de comunicação com o backend, permitindo que o frontend interaja com os dados sem precisar conhecer os detalhes de implementação do banco de dados.

#### Exemplo de Implementação de Repositório
As operações CRUD são implementadas no frontend usando funções específicas para interagir com os endpoints da API REST. Abaixo estão exemplos das principais operações:

#### Características:
- **Abstração Completa da Fonte de Dados**: O frontend não precisa conhecer os detalhes do banco de dados ou da implementação do backend. Ele interage apenas com os endpoints da API REST.
- **Métodos CRUD Bem Definidos**: Cada operação (listar, buscar, criar, atualizar, excluir) é implementada como uma função específica no frontend, encapsulando a lógica de comunicação com o backend.
- **Tratamento de Erros de Persistência**: Os erros são capturados e tratados no frontend, garantindo que o usuário seja informado sobre problemas durante as operações.

#### Benefícios:
- **Facilita Mudanças na Fonte de Dados**: Caso a API REST seja alterada ou substituída, basta ajustar as funções de repositório no frontend, sem impactar outras partes do código.
- **Simplifica Testes Unitários**: As funções de repositório podem ser simuladas (mocked) durante os testes, permitindo verificar o comportamento do frontend sem depender do backend.
- **Promove o Princípio de Responsabilidade Única**: A lógica de acesso a dados fica isolada nas funções de repositório, enquanto as regras de negócio permanecem nos controladores ou serviços.

### Service Layer

Um padrão que adiciona uma camada de serviço entre os controladores e os modelos para encapsular regras de negócio complexas.

- **Implementação**: Embora não haja uma camada de serviço explícita em seu projeto atual, as regras de negócio podem ser encontradas nos arquivos de controladores (`backend/controller/`), onde a lógica de validação e manipulação de dados é implementada.
  - Exemplo: No arquivo `CadastroFinanceiroController.js`, o método `post` pode conter validações e lógica específica para criar uma nova transação financeira.

#### Características:
- **Validações e Regras de Negócio**: Os controladores atuam como uma camada intermediária, aplicando validações e processando os dados antes de interagir com os modelos.
- **Registro de Operações**: As operações importantes são registradas no sistema de logs (`logger`) para auditoria e monitoramento.
- **Separação de Responsabilidades**: A lógica de negócio é mantida separada da camada de rotas, garantindo que os controladores fiquem limpos e focados apenas no gerenciamento de requisições HTTP.

#### Benefícios:
- **Código Mais Testável**: A separação de responsabilidades facilita a escrita de testes unitários para as regras de negócio.
- **Lógica Centralizada**: As regras de negócio ficam centralizadas nos controladores, evitando duplicação de código.
- **Flexibilidade**: Facilita a evolução da aplicação, permitindo que novas regras sejam adicionadas sem impactar outras partes do sistema.

---

### DTO (Data Transfer Object)

Utilizado implicitamente através dos métodos de conversão de dados nos modelos e controladores.

- **Implementação**: Nos arquivos de modelo (`backend/model/`), os dados são mapeados e formatados para uso interno ou externo. Por exemplo:
  - O construtor das classes `Financeiro` e `Categoria` converte os dados recebidos em objetos JavaScript utilizáveis pela aplicação.
  - Nos controladores, os dados são transformados em JSON para serem enviados como resposta da API.

#### Características:
- **Conversão de Dados**: Os dados recebidos via requisições HTTP ou recuperados do banco de dados são convertidos em um formato padronizado para uso interno.
- **Serialização/Deserialização**: Os dados são serializados para JSON ao serem enviados como resposta da API e deserializados ao serem recebidos como entrada.

#### Benefícios:
- **Desacoplamento**: Separa a representação interna dos dados da sua exposição externa, facilitando a evolução da API sem impactar o restante da aplicação.
- **Facilidade de Integração**: O uso de DTOs garante que os dados sejam transmitidos de forma consistente entre as camadas da aplicação.
- **Simplificação**: Reduz a complexidade ao fornecer uma interface clara para a transferência de dados entre diferentes partes do sistema.

### Front Controller

Implementado naturalmente pelo sistema de rotas do Express e organizado através de arquivos de rotas específicos.

- **Implementação**: Registro de rotas no arquivo `server.js` e organização modular em arquivos separados no diretório `backend/routes/`.
  - **`/categorias`**: Rotas relacionadas a categorias (ex.: criação, listagem e atualização).
  - **`/financeiro`**: Rotas relacionadas a transações financeiras (ex.: criação, listagem, edição e exclusão).
  - **`/componente`**: Rotas auxiliares para fornecer dados dinâmicos ao frontend (ex.: categorias e tipos de transações).

#### Características:
- **Centralização**: Todas as requisições HTTP são processadas pelo Express, garantindo um ponto único de entrada.
- **Modularidade**: As rotas estão organizadas por funcionalidade em arquivos separados (`CategoriaRoutes.js`, `FinanceiroRoutes.js`, `ComponentesRoutes.js`), facilitando a manutenção e escalabilidade.
- **Tratamento de Erros Consistente**: Um middleware global captura e trata erros inesperados, registrando-os no sistema de logs e retornando uma resposta padronizada ao cliente.
- **Middleware de Logging**: Todas as requisições são registradas no sistema de logs, facilitando o monitoramento e auditoria.

#### Benefícios:
- **Gerenciamento Centralizado de Rotas**: A organização modular permite que novas funcionalidades sejam adicionadas sem impactar o restante da aplicação.
- **Segurança e Consistência**: O tratamento centralizado de erros garante que problemas sejam registrados e comunicados de forma padronizada.
- **Facilidade de Integração**: A estrutura clara das rotas facilita a integração com o frontend e outras aplicações.

---

### Parte 3: API REST, Instalação e Estrutura de Dados

```
## API REST

A aplicação oferece uma API REST completa para operações CRUD de transações financeiras e categorias. Abaixo estão detalhados os endpoints disponíveis, organizados por funcionalidade.

### Endpoints de Categorias

- **`POST /categoria`**: Cria uma nova categoria.
- **`PUT /categoria`**: Atualiza uma categoria existente.
- **`GET /categoria`**: Lista todas as categorias.

#### Observações:
- O endpoint `GET /categoria` retorna todas as categorias cadastradas.
- Os endpoints `POST` e `PUT` esperam um corpo JSON com os dados da categoria.

---

### Endpoints de Componentes Auxiliares

- **`GET /categoria`**: Retorna as categorias disponíveis para uso no frontend.
- **`GET /tipo`**: Retorna os tipos de transações financeiras (ex.: receita, despesa).

#### Observações:
- Esses endpoints são usados para preencher componentes dinâmicos no frontend, como dropdowns ou seletores.

---

### Endpoints de Transações Financeiras

- **`DELETE /financeiro`**: Exclui uma transação financeira.
- **`POST /financeiro`**: Cria uma nova transação financeira.
- **`PUT /financeiro`**: Atualiza uma transação financeira existente.
- **`GET /financeiro`**: Lista todas as transações financeiras.
- **`GET /financeiroeditar`**: Obtém os detalhes de uma transação específica para edição.

#### Observações:
- O endpoint `GET /financeiro` pode incluir filtros via query params (ex.: por categoria ou tipo).
- O endpoint `GET /financeiroeditar` é usado para recuperar os dados de uma transação específica, geralmente para edição no frontend.

---

### Benefícios da Estrutura de Rotas

- **Organização Clara**: As rotas estão organizadas por funcionalidade (`categorias`, `componentes`, `financeiros`), facilitando a manutenção e extensão.
- **Reutilização de Código**: Controladores específicos (`categoriaController`, `componentesController`, `financeiroController`) encapsulam a lógica de negócio, promovendo reutilização e separação de responsabilidades.
- **Facilidade de Integração**: A API REST oferece endpoints simples e consistentes, facilitando a integração com o frontend ou outras aplicações.

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/gestao-financeira-main.git
cd gestao-financeira-main
```

2. Execute o backend:
```bash
cd backend
npm install
npm start
```

3. Acesse a aplicação em seu navegador:
```
Backend: http://localhost:3333
Frontend: http://localhost:3333
```

#### Observações:
- O backend está configurado para rodar na porta **3333**.
- O frontend é servido automaticamente pelo Express através do diretório `frontend`. Isso significa que você pode acessar a interface web diretamente pela mesma URL do backend (`http://localhost:3333`).
- Certifique-se de que o servidor backend esteja em execução antes de acessar a aplicação no navegador.

---
### Transação Financeira
```json
{
  "idfinanceiro": 1,
  "descricao": "Pagamento mensal",
  "data": "2023-10-01",
  "idcategoria": 2,
  "tipo": "receita",
  "valor": 1500.00,
  "dataalteracao": "2023-10-01T14:30:00Z"
}
```

### Categoria
```json
{
  "idcategoria": 2,
  "descricao": "Salário",
  "cor": "#4CAF50",
  "ativo": true
}
```

## Logging

A aplicação utiliza um sistema de logging personalizado implementado no diretório `backend/logger/`. O logger foi desenvolvido seguindo o padrão **Singleton**, garantindo que apenas uma instância seja criada e utilizada em toda a aplicação. Os logs são salvos no arquivo `logs.txt` e podem ser configurados para diferentes níveis de severidade (`INFO`, `WARNING`, `ERROR`).

### Características do Logger

- **Padrão Singleton**: Garante que apenas uma instância do logger seja criada durante a execução da aplicação.
- **Níveis de Log**:
  - **`INFO`**: Registra eventos informativos, como inicialização de serviços ou operações bem-sucedidas.
  - **`WARNING`**: Registra avisos que não interrompem o fluxo da aplicação, mas podem indicar problemas potenciais.
  - **`ERROR`**: Registra erros críticos que afetam o funcionamento da aplicação.
- **Persistência de Logs**: Todos os registros são salvos no arquivo `logs.txt` localizado no diretório `backend/logger/`.
- **Formato dos Logs**: Cada entrada é formatada com data, hora e nível de severidade, facilitando a leitura e auditoria.

### Exemplo de Formato de Log
```
[01/10/2023 14:30:00] [INFO] Servidor iniciado com sucesso.
[01/10/2023 14:35:12] [WARNING] Tentativa de acesso a rota inexistente: /categorias/api/invalida.
[01/10/2023 14:40:45] [ERROR] Erro ao conectar ao banco de dados: Connection refused.
```

### Implementação

O logger foi implementado na classe `Logger` (`backend/logger/Logger.js`) com as seguintes funcionalidades:

- **Criação de Arquivo de Log**: Verifica se o arquivo `logs.txt` existe e o cria caso não exista.
- **Registro de Logs**: Adiciona entradas ao arquivo de log de forma assíncrona, garantindo que a aplicação não seja bloqueada durante a escrita.
- **Métodos Disponíveis**:
  - `info(message)`: Registra mensagens informativas.
  - `warning(message)`: Registra avisos.
  - `error(message)`: Registra erros.
- **Recuperação de Logs**: Permite recuperar todos os logs registrados em memória através do método `getLogs()`.

### Benefícios

- **Centralização**: Todas as mensagens de log são gerenciadas por uma única instância, facilitando o acompanhamento de eventos.
- **Persistência**: Os logs são salvos em um arquivo, permitindo auditoria e análise posterior.
- **Flexibilidade**: Suporta diferentes níveis de severidade, adaptando-se às necessidades de monitoramento da aplicação.
