<!-- README.md -->
<div align="center">

# Gestão Financeira Main

![License: MIT](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge&logo=appveyor)  
![Status: Concluído](https://img.shields.io/badge/status-Conclu%C3%ADdo-success?style=for-the-badge)

</div>

---

<div align="center">
  <em>Uma aplicação web moderna para o gerenciamento eficiente de finanças pessoais e empresariais.</em>
</div>

---

Desenvolvida com **Node.js** e **Express**, a aplicação segue o padrão **MVC (Model-View-Controller)** para oferecer uma arquitetura escalável, organizada e de alta performance.

---

## Índice

- [Características](#características)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Padrões de Projeto Utilizados](#padrões-de-projeto-utilizados)
  - [MVC (Model-View-Controller)](#mvc-model-view-controller)
  - [Singleton](#singleton)
  - [Repository Pattern](#repository-pattern)
  - [Service Layer](#service-layer)
  - [DTO (Data Transfer Object)](#dto-data-transfer-object)
  - [Front Controller](#front-controller)
- [API REST, Instalação e Estrutura de Dados](#api-rest-instalação-e-estrutura-de-dados)
- [Exemplos de Dados](#exemplos-de-dados)
- [Logging](#logging)
- [Contato](#contato)

---

## Características

- Interface web responsiva usando **CSS3** e **JavaScript**.
- API REST completa para integração com outras aplicações.
- Gerenciamento de transações financeiras com informações como valor, categoria, data e tipo.
- Categorização de transações para melhor organização.
- Busca e filtragem de transações por categoria ou tipo.
- Logging de operações usando logs personalizados.
- Persistência de dados em banco de dados relacional (**MySQL/PostgreSQL**).

---

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

## Padrões de Projeto Utilizados

### MVC (Model-View-Controller)

Separa a aplicação em três componentes interconectados, garantindo a separação de responsabilidades:

- **Models (Modelos)**:  
  Implementados em `backend/model/Categorias.js`, `backend/model/Financeiros.js`, etc.  
  Representam os dados da aplicação e suas regras de validação.  
  Contêm métodos de conversão como `toJSON()` e `fromJSON()`.  
  Não possuem dependências com outras camadas da aplicação.

- **Views (Visões)**:  
  Implementadas como páginas HTML no diretório `frontend/pages/`.  
  Responsáveis apenas pela apresentação dos dados ao usuário.  
  Utilizam CSS para estilização e JavaScript para interatividade.  
  Separadas por funcionalidade em arquivos específicos.

- **Controllers (Controladores)**:  
  Implementados em `backend/controller/`.  
  Gerenciam o fluxo da aplicação, processando requisições HTTP.  
  Delegam operações de negócio para a camada de serviços.  
  Disponibilizam endpoints tanto para API REST quanto para interface web.

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
  Essas chamadas encapsulam a lógica de comunicação com o backend, permitindo que o frontend interaja com os dados sem precisar conhecer os detalhes de implementação do banco de dados.

#### Exemplo de Implementação de Repositório

As operações CRUD são implementadas no frontend usando funções específicas para interagir com os endpoints da API REST.

#### Características:
- **Abstração Completa da Fonte de Dados**: O frontend não precisa conhecer os detalhes do banco de dados ou da implementação do backend.
- **Métodos CRUD Bem Definidos**: Cada operação (listar, buscar, criar, atualizar, excluir) é implementada como uma função específica no frontend.
- **Tratamento de Erros de Persistência**: Os erros são capturados e tratados no frontend, garantindo que o usuário seja informado sobre problemas durante as operações.

#### Benefícios:
- Facilita mudanças na fonte de dados.
- Simplifica testes unitários.
- Promove o princípio de responsabilidade única.

### Service Layer

Adiciona uma camada de serviço entre os controladores e os modelos para encapsular regras de negócio complexas.

- **Implementação**: Apesar de não existir uma camada de serviço explícita, as regras de negócio podem ser encontradas nos arquivos de controladores (`backend/controller/`).
  - Exemplo: No `CadastroFinanceiroController.js`, o método `post` pode incluir validações e lógica específica.

#### Características:
- Validações e regras de negócio intermediárias.
- Registro de operações para auditoria.
- Separação clara de responsabilidades.

#### Benefícios:
- Código mais testável.
- Lógica centralizada.
- Maior flexibilidade na evolução da aplicação.

### DTO (Data Transfer Object)

Utilizado implicitamente através dos métodos de conversão de dados nos modelos e controladores.

- **Implementação**: Nos arquivos de modelo (`backend/model/`), os dados são mapeados e formatados para uso interno ou externo.
  - Exemplo: Construtores nas classes `Financeiro` e `Categoria`.
  - Nos controladores, os dados são transformados em JSON para respostas da API.

#### Características:
- Conversão padronizada de dados.
- Serialização/Deserialização para JSON.

#### Benefícios:
- Desacoplamento da representação interna.
- Facilidade de integração entre as camadas.
- Simplificação no fluxo dos dados.

### Front Controller

Implementado através do sistema de rotas do Express, centralizando todas as requisições.

- **Implementação**: Registro de rotas no `server.js` e organização modular no diretório `backend/routes/`.
  - **`/categorias`**: Rotas para criação, listagem e atualização de categorias.
  - **`/financeiro`**: Rotas para transações financeiras.
  - **`/componente`**: Rotas auxiliares para fornecer dados dinâmicos ao frontend.

#### Características:
- Centralização de requisições.
- Modularidade para facilitar manutenção.
- Tratamento de erros global com middleware.
- Logging de requisições para monitoramento.

#### Benefícios:
- Gerenciamento centralizado de rotas.
- Segurança e consistência no tratamento de erros.
- Fácil integração com o frontend.

---

## API REST, Instalação e Estrutura de Dados

```
## API REST

A aplicação oferece uma API REST completa para operações CRUD de transações financeiras e categorias. Abaixo, os endpoints disponíveis:

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
- Esses endpoints preenchem componentes dinâmicos (dropdowns, seletores, etc.) no frontend.

---

### Endpoints de Transações Financeiras

- **`DELETE /financeiro`**: Exclui uma transação financeira.
- **`POST /financeiro`**: Cria uma nova transação financeira.
- **`PUT /financeiro`**: Atualiza uma transação financeira existente.
- **`GET /financeiro`**: Lista todas as transações financeiras.
- **`GET /financeiroeditar`**: Obtém os detalhes de uma transação para edição.

#### Observações:
- O endpoint `GET /financeiro` pode incluir filtros via query params.
- O endpoint `GET /financeiroeditar` é usado para recuperar dados de uma transação específica.

---

### Benefícios da Estrutura de Rotas

- **Organização Clara**: As rotas estão separadas por funcionalidade.
- **Reutilização de Código**: Controladores específicos encapsulam a lógica de negócio.
- **Facilidade de Integração**: Endpoints simples e consistentes para interação com o frontend ou outras aplicações.

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
- O frontend é servido automaticamente pelo Express através do diretório `frontend`.
- Certifique-se de que o servidor backend esteja em execução.

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
```

---

## Logging

A aplicação utiliza um sistema de logging personalizado implementado no diretório `backend/logger/`. O logger foi desenvolvido seguindo o padrão **Singleton** e armazena os logs no arquivo `logs.txt`.

### Características do Logger

- **Padrão Singleton**: Apenas uma instância do logger é criada.
- **Níveis de Log**:
  - **`INFO`**: Eventos informativos, como inicialização bem-sucedida.
  - **`WARNING`**: Avisos que não interrompem o fluxo, mas apontam possíveis problemas.
  - **`ERROR`**: Erros críticos que afetam o funcionamento da aplicação.
- **Persistência de Logs**: Registros salvos no arquivo `logs.txt`.
- **Formato dos Logs**: Cada entrada inclui data, hora e nível de severidade.

### Exemplo de Formato de Log
```
[01/10/2023 14:30:00] [INFO] Servidor iniciado com sucesso.
[01/10/2023 14:35:12] [WARNING] Tentativa de acesso a rota inexistente: /categorias/api/invalida.
[01/10/2023 14:40:45] [ERROR] Erro ao conectar ao banco de dados: Connection refused.
```

### Implementação

O logger está implementado na classe `Logger` (`backend/logger/Logger.js`) com as seguintes funcionalidades:

- **Criação de Arquivo de Log**: Cria `logs.txt` se não existir.
- **Registro de Logs**: Métodos assíncronos para evitar bloqueios durante a escrita:
  - `info(message)`
  - `warning(message)`
  - `error(message)`
- **Recuperação de Logs**: Método `getLogs()` para obter todos os registros.

### Benefícios

- **Centralização**: Uma única instância gerencia todos os logs.
- **Persistência**: Logs são salvos para auditoria.
- **Flexibilidade**: Suporte a múltiplos níveis de severidade, facilitando o monitoramento da aplicação.
```

---

## Contato

### Contribuidores

Clique nos ícones abaixo para conhecer os perfis dos nossos contribuintes:

- [![GitHub: juliatbarbosa](https://img.shields.io/badge/GitHub-juliatbarbosa-blue?style=for-the-badge&logo=github)](https://github.com/juliatbarbosa)
- [![GitHub: Tulio220](https://img.shields.io/badge/GitHub-Tulio220-blue?style=for-the-badge&logo=github)](https://github.com/Tulio220)
- [![GitHub: LeonardoProdossimo](https://img.shields.io/badge/GitHub-LeonardoProdossimo-blue?style=for-the-badge&logo=github)](https://github.com/LeonardoProdossimo)

---
