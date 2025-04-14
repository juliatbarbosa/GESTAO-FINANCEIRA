<!-- README.md -->
<div align="center">

  <!-- Logo – utilize a imagem localizada em frontend/img/logo.png ou ajuste conforme necessário -->
  <img src="frontend/img/logo.png" alt="Logo Gestão Financeira Main" width="200" />

  <h1 style="font-size:3rem; margin-top: 1rem;">Gestão Financeira Main</h1>

  <div style="margin-top: 0.5rem;">
    <span>
      <img src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge&logo=appveyor" alt="License: MIT" />
    </span>
    <span>
      <img src="https://img.shields.io/badge/status-Conclu%C3%ADdo-success?style=for-the-badge" alt="Status: Concluído" />
    </span>
  </div>

  <p style="font-size: 1.25rem; margin-top: 1rem; font-style: italic;">
    Uma aplicação web moderna para o gerenciamento eficiente de finanças pessoais e empresariais.
  </p>

</div>

---

<div align="center">
  <p style="font-size: 1rem; max-width: 700px;">
    Desenvolvida com <strong>Node.js</strong> e <strong>Express</strong>, a aplicação segue o padrão <strong>MVC (Model-View-Controller)</strong> para oferecer uma arquitetura escalável, organizada e de alta performance, elevando a experiência do usuário a um novo patamar.
  </p>
</div>

---

<!-- Cards de Linguagens / Tecnologias -->
<div align="center" style="margin: 2rem 0;">
  <h2>Tecnologias Utilizadas</h2>
  <table>
    <tr>
      <td align="center" style="padding: 1rem;">
        <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
      </td>
      <td align="center" style="padding: 1rem;">
        <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
      </td>
      <td align="center" style="padding: 1rem;">
        <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
      </td>
      <td align="center" style="padding: 1rem;">
        <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
      </td>
      <td align="center" style="padding: 1rem;">
        <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
      </td>
    </tr>
  </table>
</div>

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
- [API, Instalação e Estrutura de Dados](#api-instalação-e-estrutura-de-dados)
- [Exemplos de Dados](#exemplos-de-dados)
- [Logging](#logging)
- [Contato](#contato)

---

## Características

- Interface web responsiva usando **CSS3** e **JavaScript**.
- **Integração com Backend via Fetch** para comunicação com o servidor.
- Gerenciamento de transações financeiras com informações como valor, categoria, data e tipo.
- Categorização de transações para melhor organização.
- Busca e filtragem de transações por categoria ou tipo.
- Logging de operações usando logs personalizados.
- Persistência de dados em banco de dados relacional (**MySQL**).

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
│   │   ├── pages/
│   │   │   ├── categorias.html     # Página de categorias
│   │   │   └── transacoes.html     # Página de transações
│   │   ├── servidor.js             # Servidor principal JS
│   │   ├── servidorcomponentes.js  # Servidor de componentes JS
│   │   └── utils.js                # Arquivo de utilidades JS
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
  Disponibilizam endpoints tanto para API quanto para interface web.

**Benefícios**: Manutenção simplificada, facilidade para testes, reutilização de código e desenvolvimento paralelo por diferentes membros da equipe.

### Singleton

Um padrão criacional que garante que uma classe tenha apenas uma instância e fornece um ponto global de acesso a ela.

- **Implementação**: `backend/logger/Logger.js`.
- **Características**:
  - Centraliza o registro de logs em toda a aplicação.
  - Registra eventos importantes no arquivo `logs.txt`.

**Benefícios**: Economia de recursos, acesso centralizado ao log em toda a aplicação, garantia de consistência nos registros.

### DTO (Data Transfer Object)

Utilizado implicitamente através dos métodos de conversão de dados nos modelos e controladores.

- **Implementação**: Nos arquivos de modelo (`backend/model/`), os dados são mapeados e formatados para uso interno ou externo.  
  Exemplo: Construtores nas classes `Financeiro` e `Categoria`.  
  Nos controladores, os dados são transformados em JSON para respostas da API.

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

## Instalação, Operações CRUD e Estrutura de Dados

```
As operações CRUD são implementadas no frontend usando funções específicas para interagir com os endpoints do backend.
Abaixo estão exemplos das principais operações:
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
---
## 🧩 Instalação

Siga os passos abaixo para rodar a aplicação localmente:

---

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/gestao-financeira-main.git
cd gestao-financeira-main
```

---

### 2. Instale e execute o backend

```bash
cd backend
npm install
npm start
```

---

### 3. Acesse a aplicação no navegador

```bash
Backend:  http://localhost:3333
Frontend: http://localhost:3333
```

---

📌 **Nota:**  
O frontend é servido automaticamente pelo **Express**, portanto você acessa tudo via a mesma porta. Certifique-se de que o servidor backend esteja em execução antes de abrir o navegador.


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

---

## Contato

### Contribuidores

Clique nos ícones abaixo para conhecer os perfis dos nossos contribuintes:

- [![GitHub: juliatbarbosa](https://img.shields.io/badge/GitHub-juliatbarbosa-blue?style=for-the-badge&logo=github)](https://github.com/juliatbarbosa)
- [![GitHub: Tulio220](https://img.shields.io/badge/GitHub-Tulio220-blue?style=for-the-badge&logo=github)](https://github.com/Tulio220)
- [![GitHub: LeonardoProdossimo](https://img.shields.io/badge/GitHub-LeonardoProdossimo-blue?style=for-the-badge&logo=github)](https://github.com/LeonardoProdossimo)

---
