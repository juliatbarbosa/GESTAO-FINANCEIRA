```markdown
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
<pre><code>```plaintext gestao-financeira-main/ │ ├── backend/ │ ├── conexao/ │ │ └── Conexao.js # Configuração da conexão com o banco de dados │ ├── controller/ │ │ ├── CadastroFinancieroController.js # Controlador para transações financeiras │ │ ├── CategoriaController.js # Controlador para categorias │ │ └── ComponentesController.js # Controlador para componentes auxiliares │ ├── logger/ │ │ ├── Logger.js # Implementação de logging personalizado │ │ └── logs.txt # Arquivo de logs │ ├── model/ │ │ ├── Categorias.js # Modelo de Categoria │ │ ├── Financeiros.js # Modelo de Transação Financeira │ │ ├── Response.js # Modelo de resposta genérica │ │ └── Tipo.js # Modelo de Tipo de Transação │ ├── routes/ │ │ ├── CategoriaRoutes.js # Rotas para categorias │ │ ├── ComponentesRoutes.js # Rotas para componentes auxiliares │ │ └── FinanceiroRoutes.js # Rotas para transações financeiras │ ├── server.js # Aplicação principal do servidor │ ├── package-lock.json │ └── package.json │ ├── frontend/ │ ├── css/ │ │ └── style.css # Estilos CSS │ ├── font/ │ │ ├── Montserrat-Regular.ttf # Fonte regular │ │ └── Montserrat-SemiBold.ttf # Fonte semi-bold │ ├── img/ │ │ ├── close.png # Ícone de fechar │ │ ├── logo.png # Logo da aplicação │ │ └── lupa.png # Ícone de busca │ ├── js/ │ │ ├── framework/ │ │ │ └── moment.min.js # Biblioteca para manipulação de datas │ │ └── pages/ │ │ ├── categorias.html # Página de categorias │ │ └── transacoes.html # Página de transações │ └── index.html # Página inicial │ └── README.md # Documentação do projeto ```</code></pre>
## Padrões de Projeto Utilizados

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

##### Transações Financeiras

```javascript
// Listar transações
function getTransacoes() {
    fetch('http://127.0.0.1:3333/financeiro/financeiro', {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
    })
    .then(resp => resp.json())
    .then(dados => listaTransacoes(dados))
    .catch(err => console.error("Erro ao buscar dados:", err));
}

// Criar uma nova transação
function postTransacao(obj) {
    fetch("http://127.0.0.1:3333/financeiro/financeiro", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(resp => resp.json())
    .then(retorno => toast(retorno.message, retorno.success))
    .catch(err => console.error("Erro ao criar transação:", err));
}
```

#### Benefícios:
- Facilita mudanças na fonte de dados.
- Simplifica testes unitários.
- Promove o princípio de responsabilidade única.

### Service Layer

Um padrão que adiciona uma camada de serviço entre os controladores e os modelos para encapsular regras de negócio complexas.

- **Implementação**: Embora não haja uma camada de serviço explícita em seu projeto atual, as regras de negócio podem ser encontradas nos arquivos de controladores (`backend/controller/`), onde a lógica de validação e manipulação de dados é implementada.

**Benefícios**: Código mais testável, lógica centralizada e flexibilidade.

### DTO (Data Transfer Object)

Utilizado implicitamente através dos métodos de conversão de dados nos modelos e controladores.

- **Implementação**: Nos arquivos de modelo (`backend/model/`), os dados são mapeados e formatados para uso interno ou externo.

**Benefícios**: Desacoplamento, facilidade de integração e simplificação.

### Front Controller

Implementado naturalmente pelo sistema de rotas do Express e organizado através de arquivos de rotas específicos.

- **Implementação**: Registro de rotas no arquivo `server.js` e organização modular em arquivos separados no diretório `backend/routes/`.

**Benefícios**: Gerenciamento centralizado de rotas, segurança e tratamento de erros consistente.

## API REST

A aplicação oferece uma API REST completa para operações CRUD de transações financeiras e categorias.

### Endpoints de Categorias

- **`POST /categoria`**: Cria uma nova categoria.
- **`PUT /categoria`**: Atualiza uma categoria existente.
- **`GET /categoria`**: Lista todas as categorias.

### Endpoints de Componentes Auxiliares

- **`GET /categoria`**: Retorna as categorias disponíveis para uso no frontend.
- **`GET /tipo`**: Retorna os tipos de transações financeiras.

### Endpoints de Transações Financeiras

- **`DELETE /financeiro`**: Exclui uma transação financeira.
- **`POST /financeiro`**: Cria uma nova transação financeira.
- **`PUT /financeiro`**: Atualiza uma transação financeira existente.
- **`GET /financeiro`**: Lista todas as transações financeiras.
- **`GET /financeiroeditar`**: Obtém os detalhes de uma transação específica para edição.

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

## Estrutura de Dados

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
  - **`INFO`**: Registra eventos informativos.
  - **`WARNING`**: Registra avisos.
  - **`ERROR`**: Registra erros críticos.

### Exemplo de Formato de Log
```
[01/10/2023 14:30:00] [INFO] Servidor iniciado com sucesso.
[01/10/2023 14:35:12] [WARNING] Tentativa de acesso a rota inexistente: /categorias/api/invalida.
[01/10/2023 14:40:45] [ERROR] Erro ao conectar ao banco de dados: Connection refused.
```

### Implementação

O logger foi implementado na classe `Logger` (`backend/logger/Logger.js`) com as seguintes funcionalidades:
- **Criação de Arquivo de Log**: Verifica se o arquivo `logs.txt` existe e o cria caso não exista.
- **Registro de Logs**: Adiciona entradas ao arquivo de log de forma assíncrona.
- **Métodos Disponíveis**:
  - `info(message)`: Registra mensagens informativas.
  - `warning(message)`: Registra avisos.
  - `error(message)`: Registra erros.

### Benefícios

- **Centralização**: Todas as mensagens de log são gerenciadas por uma única instância.
- **Persistência**: Os logs são salvos em um arquivo, permitindo auditoria posterior.
- **Flexibilidade**: Suporta diferentes níveis de severidade.
```

---
