document.addEventListener("DOMContentLoaded", function () {
  // Inicialização do sistema de gestão financeira
  initSidebar();
  initNavigation();
  initCharts();
  initTransactionForms();
  initBudgetActions();
  initSavingsManagement();
  initGoalsManagement();
  initReportsGeneration();
  initSettingsPage();
  initModals();

  // Mostrar mensagem de boas-vindas com SweetAlert2
  Swal.fire({
    title: "Bem-vindo ao FinançasPro",
    text: "Seu sistema completo de gestão financeira pessoal",
    icon: "info",
    confirmButtonText: "Começar",
    confirmButtonColor: "#3a86ff",
    timer: 3000,
    timerProgressBar: true,
  });

  // Função para inicializar a barra lateral
  function initSidebar() {
    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("toggle-sidebar");

    if (toggleBtn) {
      toggleBtn.addEventListener("click", function () {
        sidebar.classList.toggle("collapsed");
      });
    }
  }

  // Navegação entre páginas
  function initNavigation() {
    const menuItems = document.querySelectorAll(".menu-item");
    const pages = document.querySelectorAll(".page");
    const pageTitle = document.getElementById("page-title");

    menuItems.forEach((item) => {
      item.addEventListener("click", function (e) {
        e.preventDefault();

        // Remove a classe active de todos os itens
        menuItems.forEach((i) => i.classList.remove("active"));

        // Adiciona a classe active ao item clicado
        this.classList.add("active");

        // Atualiza o título da página
        const pageLabel = this.querySelector("span").textContent;
        pageTitle.textContent = pageLabel;

        // Mostra a página correspondente
        const targetPageId = this.getAttribute("data-page");
        pages.forEach((page) => {
          if (page.id === targetPageId) {
            page.classList.add("active");
          } else {
            page.classList.remove("active");
          }
        });
      });
    });
  }

  // Inicialização dos gráficos
  function initCharts() {
    // Gráfico de visão geral
    initOverviewChart();
    initEvolutionChart();
    initExpensesChart();
    initSavingsChart();
    initReportCharts();
  }

  function initOverviewChart() {
    const ctx = document.getElementById("overview-chart");
    if (!ctx) return;

    const overviewChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Receitas", "Despesas", "Saldo", "Poupança"],
        datasets: [
          {
            label: "Valores (R$)",
            data: [3620, 1620, 2000, 500],
            backgroundColor: [
              "rgba(74, 222, 128, 0.8)",
              "rgba(248, 113, 113, 0.8)",
              "rgba(96, 165, 250, 0.8)",
              "rgba(251, 191, 36, 0.8)",
            ],
            borderColor: [
              "rgb(74, 222, 128)",
              "rgb(248, 113, 113)",
              "rgb(96, 165, 250)",
              "rgb(251, 191, 36)",
            ],
            borderWidth: 1,
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            titleColor: "#1e293b",
            bodyColor: "#64748b",
            borderWidth: 1,
            borderColor: "rgba(0, 0, 0, 0.1)",
            displayColors: true,
            padding: 10,
            callbacks: {
              label: function (context) {
                const value = context.parsed.y;
                return `R$ ${value.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: true,
              color: "rgba(0, 0, 0, 0.05)",
            },
            ticks: {
              callback: function (value) {
                return `R$ ${value}`;
              },
              color: "#64748b",
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "#64748b",
            },
          },
        },
      },
    });
  }

  function initEvolutionChart() {
    const ctx = document.getElementById("evolution-chart");
    if (!ctx) return;

    const evolutionChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
        datasets: [
          {
            label: "Receitas",
            data: [3200, 3300, 3400, 3500, 3600, 3620],
            borderColor: "rgb(74, 222, 128)",
            backgroundColor: "rgba(74, 222, 128, 0.1)",
            tension: 0.4,
            fill: false,
          },
          {
            label: "Despesas",
            data: [1800, 1700, 1900, 1600, 1700, 1620],
            borderColor: "rgb(248, 113, 113)",
            backgroundColor: "rgba(248, 113, 113, 0.1)",
            tension: 0.4,
            fill: false,
          },
          {
            label: "Saldo",
            data: [1400, 1600, 1500, 1900, 1900, 2000],
            borderColor: "rgb(96, 165, 250)",
            backgroundColor: "rgba(96, 165, 250, 0.1)",
            tension: 0.4,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            titleColor: "#1e293b",
            bodyColor: "#64748b",
            borderWidth: 1,
            borderColor: "rgba(0, 0, 0, 0.1)",
            callbacks: {
              label: function (context) {
                const value = context.parsed.y;
                return `${context.dataset.label}: R$ ${value.toLocaleString(
                  "pt-BR",
                  { minimumFractionDigits: 2 }
                )}`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: true,
              color: "rgba(0, 0, 0, 0.05)",
            },
            ticks: {
              callback: function (value) {
                return `R$ ${value}`;
              },
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }

  function initExpensesChart() {
    const ctx = document.getElementById("expenses-chart");
    if (!ctx) return;

    const expensesChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: [
          "Moradia",
          "Alimentação",
          "Transporte",
          "Saúde",
          "Lazer",
          "Outros",
        ],
        datasets: [
          {
            data: [800, 300, 150, 120, 40, 210],
            backgroundColor: [
              "rgba(96, 165, 250, 0.8)",
              "rgba(74, 222, 128, 0.8)",
              "rgba(251, 191, 36, 0.8)",
              "rgba(240, 171, 252, 0.8)",
              "rgba(248, 113, 113, 0.8)",
              "rgba(148, 163, 184, 0.8)",
            ],
            borderColor: [
              "rgb(96, 165, 250)",
              "rgb(74, 222, 128)",
              "rgb(251, 191, 36)",
              "rgb(240, 171, 252)",
              "rgb(248, 113, 113)",
              "rgb(148, 163, 184)",
            ],
            borderWidth: 1,
            borderRadius: 4,
            hoverOffset: 15,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "65%",
        plugins: {
          legend: {
            position: "right",
            labels: {
              padding: 20,
              boxWidth: 12,
              boxHeight: 12,
              color: "#64748b",
              font: {
                size: 12,
              },
            },
          },
          tooltip: {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            titleColor: "#1e293b",
            bodyColor: "#64748b",
            borderWidth: 1,
            borderColor: "rgba(0, 0, 0, 0.1)",
            callbacks: {
              label: function (context) {
                const value = context.parsed;
                const sum = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = Math.round((value / sum) * 100);
                return `${context.label}: R$ ${value.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })} (${percentage}%)`;
              },
            },
          },
        },
      },
    });
  }

  function initSavingsChart() {
    const ctx = document.getElementById("savings-chart");
    if (!ctx) return;

    const savingsChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
        datasets: [
          {
            label: "Saldo da Poupança",
            data: [10000, 10500, 11000, 11500, 12000, 12500],
            borderColor: "rgb(96, 165, 250)",
            backgroundColor: "rgba(96, 165, 250, 0.1)",
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            titleColor: "#1e293b",
            bodyColor: "#64748b",
            borderWidth: 1,
            borderColor: "rgba(0, 0, 0, 0.1)",
            callbacks: {
              label: function (context) {
                const value = context.parsed.y;
                return `Saldo: R$ ${value.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            grid: {
              display: true,
              color: "rgba(0, 0, 0, 0.05)",
            },
            ticks: {
              callback: function (value) {
                return `R$ ${value}`;
              },
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }

  function initReportCharts() {
    const ctx1 = document.getElementById("report-evolution-chart");
    const ctx2 = document.getElementById("report-expenses-chart");

    if (ctx1) {
      const reportEvolutionChart = new Chart(ctx1, {
        type: "line",
        data: {
          labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
          datasets: [
            {
              label: "Receitas",
              data: [3200, 3300, 3400, 3500, 3600, 3620],
              borderColor: "rgb(74, 222, 128)",
              backgroundColor: "rgba(74, 222, 128, 0.1)",
              tension: 0.4,
              fill: false,
            },
            {
              label: "Despesas",
              data: [1800, 1700, 1900, 1600, 1700, 1620],
              borderColor: "rgb(248, 113, 113)",
              backgroundColor: "rgba(248, 113, 113, 0.1)",
              tension: 0.4,
              fill: false,
            },
            {
              label: "Saldo",
              data: [1400, 1600, 1500, 1900, 1900, 2000],
              borderColor: "rgb(96, 165, 250)",
              backgroundColor: "rgba(96, 165, 250, 0.1)",
              tension: 0.4,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              titleColor: "#1e293b",
              bodyColor: "#64748b",
              borderWidth: 1,
              borderColor: "rgba(0, 0, 0, 0.1)",
              callbacks: {
                label: function (context) {
                  const value = context.parsed.y;
                  return `${context.dataset.label}: R$ ${value.toLocaleString(
                    "pt-BR",
                    { minimumFractionDigits: 2 }
                  )}`;
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                display: true,
                color: "rgba(0, 0, 0, 0.05)",
              },
              ticks: {
                callback: function (value) {
                  return `R$ ${value}`;
                },
              },
            },
          },
        },
      });
    }

    if (ctx2) {
      const reportExpensesChart = new Chart(ctx2, {
        type: "pie",
        data: {
          labels: [
            "Moradia",
            "Alimentação",
            "Transporte",
            "Saúde",
            "Lazer",
            "Outros",
          ],
          datasets: [
            {
              data: [800, 300, 150, 120, 40, 210],
              backgroundColor: [
                "rgba(96, 165, 250, 0.8)",
                "rgba(74, 222, 128, 0.8)",
                "rgba(251, 191, 36, 0.8)",
                "rgba(240, 171, 252, 0.8)",
                "rgba(248, 113, 113, 0.8)",
                "rgba(148, 163, 184, 0.8)",
              ],
              borderColor: [
                "rgb(96, 165, 250)",
                "rgb(74, 222, 128)",
                "rgb(251, 191, 36)",
                "rgb(240, 171, 252)",
                "rgb(248, 113, 113)",
                "rgb(148, 163, 184)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right",
              labels: {
                padding: 20,
                boxWidth: 12,
                boxHeight: 12,
                color: "#64748b",
                font: {
                  size: 12,
                },
              },
            },
            tooltip: {
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              titleColor: "#1e293b",
              bodyColor: "#64748b",
              borderWidth: 1,
              borderColor: "rgba(0, 0, 0, 0.1)",
              callbacks: {
                label: function (context) {
                  const value = context.parsed;
                  const sum = context.dataset.data.reduce((a, b) => a + b, 0);
                  const percentage = Math.round((value / sum) * 100);
                  return `${context.label}: R$ ${value.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })} (${percentage}%)`;
                },
              },
            },
          },
        },
      });
    }
  }

  // Inicialização dos formulários de transações
  function initTransactionForms() {
    // Configurar botão de adicionar receita
    const addReceitaBtn = document.getElementById("add-receita-btn");
    if (addReceitaBtn) {
      addReceitaBtn.addEventListener("click", function () {
        openTransactionModal("receita");
      });
    }

    // Configurar botão de adicionar despesa
    const addDespesaBtn = document.getElementById("add-despesa-btn");
    if (addDespesaBtn) {
      addDespesaBtn.addEventListener("click", function () {
        openTransactionModal("despesa");
      });
    }

    // Configurar botão de adicionar movimentação de poupança
    const addPoupancaBtn = document.getElementById("add-poupanca-btn");
    if (addPoupancaBtn) {
      addPoupancaBtn.addEventListener("click", function () {
        openTransactionModal("transferencia");
      });
    }

    // Submissão do formulário de transação
    const transactionForm = document.getElementById("transaction-form");
    if (transactionForm) {
      transactionForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const tipo = document.getElementById("transaction-type").value;
        const data = document.getElementById("transaction-date").value;
        const descricao = document.getElementById(
          "transaction-description"
        ).value;
        const valor = parseFloat(
          document.getElementById("transaction-amount").value
        );
        const categoria = document.getElementById("transaction-category").value;

        // Mostrar loading
        Swal.fire({
          title: "Processando...",
          html: "Registrando sua transação",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        // Simular processamento assíncrono
        setTimeout(() => {
          // Processar os dados
          console.log("Transação adicionada:", {
            tipo,
            data,
            descricao,
            valor,
            categoria,
          });

          // Fechar o modal
          closeModal("transaction-modal");

          // Mostrar mensagem de sucesso com ícone
          Swal.fire({
            title: "Sucesso!",
            text: "Transação adicionada com sucesso!",
            icon: "success",
            confirmButtonColor: "#3a86ff",
          });
        }, 800);
      });
    }

    // Alterar campos visíveis com base no tipo de transação
    const transactionType = document.getElementById("transaction-type");
    if (transactionType) {
      transactionType.addEventListener("change", function () {
        const destinoGroup = document.getElementById("conta-destino-group");

        if (this.value === "transferencia") {
          destinoGroup.style.display = "block";
        } else {
          destinoGroup.style.display = "none";
        }

        // Atualizar categorias disponíveis com base no tipo
        updateTransactionCategories(this.value);
      });
    }
  }

  function openTransactionModal(tipo) {
    const modal = document.getElementById("transaction-modal");
    const tipoSelect = document.getElementById("transaction-type");
    const modalTitle = document.getElementById("transaction-modal-title");

    // Configurar o título do modal
    if (tipo === "receita") {
      modalTitle.textContent = "Nova Receita";
    } else if (tipo === "despesa") {
      modalTitle.textContent = "Nova Despesa";
    } else {
      modalTitle.textContent = "Nova Transferência";
    }

    // Pré-selecionar o tipo
    tipoSelect.value = tipo;

    // Atualizar categorias disponíveis
    updateTransactionCategories(tipo);

    // Mostrar/esconder o campo de conta destino
    const destinoGroup = document.getElementById("conta-destino-group");
    if (tipo === "transferencia") {
      destinoGroup.style.display = "block";
    } else {
      destinoGroup.style.display = "none";
    }

    // Pré-preencher data atual
    const dataInput = document.getElementById("transaction-date");
    const today = new Date().toISOString().split("T")[0];
    dataInput.value = today;

    // Abrir o modal
    modal.classList.add("active");
  }

  function updateTransactionCategories(tipo) {
    const categoriaSelect = document.getElementById("transaction-category");

    // Limpar opções existentes
    categoriaSelect.innerHTML =
      '<option value="">Selecione uma categoria</option>';

    // Adicionar categorias com base no tipo
    if (tipo === "receita") {
      const categorias = ["Salário", "Freelance", "Investimentos", "Outros"];
      categorias.forEach((cat) => {
        const option = document.createElement("option");
        option.value = cat.toLowerCase();
        option.textContent = cat;
        categoriaSelect.appendChild(option);
      });
    } else if (tipo === "despesa") {
      const categorias = [
        "Alimentação",
        "Moradia",
        "Transporte",
        "Saúde",
        "Lazer",
        "Educação",
        "Outros",
      ];
      categorias.forEach((cat) => {
        const option = document.createElement("option");
        option.value = cat.toLowerCase();
        option.textContent = cat;
        categoriaSelect.appendChild(option);
      });
    } else {
      const categorias = ["Depósito", "Retirada", "Investimento"];
      categorias.forEach((cat) => {
        const option = document.createElement("option");
        option.value = cat.toLowerCase();
        option.textContent = cat;
        categoriaSelect.appendChild(option);
      });
    }
  }

  // Inicialização da seção de orçamentos
  function initBudgetActions() {
    const budgetTableBody = document.getElementById("budget-table-body");
    const budgetForm = document.getElementById("budget-form");
    const addBudgetBtn = document.getElementById("add-budget-btn");
    const budgetModal = document.getElementById("budget-modal");
    const modalTitle = document.getElementById("budget-modal-title");

    let editingRowIndex = null;

    if (addBudgetBtn) {
      addBudgetBtn.addEventListener("click", function () {
        modalTitle.textContent = "Adicionar Orçamento";
        budgetForm.reset();
        editingRowIndex = null;

        // Preencher categorias disponíveis
        const categorySelect = document.getElementById("budget-category");
        categorySelect.innerHTML =
          '<option value="">Selecione uma categoria</option>';

        const categorias = [
          "Alimentação",
          "Moradia",
          "Transporte",
          "Saúde",
          "Lazer",
          "Educação",
          "Outros",
        ];
        categorias.forEach((cat) => {
          const option = document.createElement("option");
          option.value = cat.toLowerCase();
          option.textContent = cat;
          categorySelect.appendChild(option);
        });

        budgetModal.classList.add("active");
      });
    }

    if (budgetTableBody) {
      // Eventos de edição e exclusão
      budgetTableBody.addEventListener("click", function (e) {
        const target = e.target.closest("button");

        if (!target) return;

        const row = target.closest("tr");
        const rowIndex = Array.from(budgetTableBody.children).indexOf(row);

        if (target.classList.contains("btn-edit")) {
          editBudgetItem(row, rowIndex);
        } else if (target.classList.contains("btn-delete")) {
          deleteBudgetItem(row);
        }
      });
    }

    // Editar orçamento
    function editBudgetItem(row, index) {
      const cells = row.cells;
      const categoria = cells[0].textContent;
      const limite = parseFloat(
        cells[1].textContent
          .replace("R$ ", "")
          .replace(".", "")
          .replace(",", ".")
      );

      document.getElementById("budget-category").value =
        categoria.toLowerCase();
      document.getElementById("budget-limit").value = limite;

      modalTitle.textContent = "Editar Orçamento";
      editingRowIndex = index;
      budgetModal.classList.add("active");
    }

    // Excluir orçamento
    function deleteBudgetItem(row) {
      Swal.fire({
        title: "Tem certeza?",
        text: "Esta ação não poderá ser revertida!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3a86ff",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, excluir!",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          budgetTableBody.removeChild(row);

          Swal.fire({
            title: "Excluído!",
            text: "O orçamento foi excluído com sucesso.",
            icon: "success",
            confirmButtonColor: "#3a86ff",
          });
        }
      });
    }

    if (budgetForm) {
      // Adicionar ou atualizar orçamento
      budgetForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const categoria =
          document.getElementById("budget-category").options[
            document.getElementById("budget-category").selectedIndex
          ].text;
        const limite = parseFloat(
          document.getElementById("budget-limit").value
        );

        // Mostrar loading
        Swal.fire({
          title: "Processando...",
          html: "Salvando informações do orçamento",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        // Simular processamento assíncrono
        setTimeout(() => {
          // Simulação de dados
          const gasto = Math.round(limite * Math.random() * 0.8 * 100) / 100;
          const restante = limite - gasto;
          const percentual = (gasto / limite) * 100;

          let progressClass = "";

          if (percentual > 90) {
            progressClass = "danger";
          } else if (percentual > 70) {
            progressClass = "warning";
          }

          const rowHtml = `
            <td>${categoria}</td>
            <td>R$ ${limite.toFixed(2).replace(".", ",")}</td>
            <td>R$ ${gasto.toFixed(2).replace(".", ",")}</td>
            <td>R$ ${restante.toFixed(2).replace(".", ",")}</td>
            <td>
              <div class="progress-bar">
                <div class="progress-fill ${progressClass}" style="width: ${percentual}%"></div>
              </div>
            </td>
            <td>
              <div class="action-buttons">
                <button class="btn-icon btn-edit"><i>✏️</i></button>
                <button class="btn-icon btn-delete"><i>🗑️</i></button>
              </div>
            </td>
          `;

          if (editingRowIndex !== null) {
            // Atualizando item existente
            budgetTableBody.children[editingRowIndex].innerHTML = rowHtml;
          } else {
            // Adicionando novo item
            const newRow = budgetTableBody.insertRow();
            newRow.innerHTML = rowHtml;
          }

          budgetModal.classList.remove("active");

          // Mostrar mensagem de sucesso
          Swal.fire({
            title: "Sucesso!",
            text:
              editingRowIndex !== null
                ? "Orçamento atualizado com sucesso!"
                : "Orçamento adicionado com sucesso!",
            icon: "success",
            confirmButtonColor: "#3a86ff",
          });
        }, 800);
      });
    }
  }

  // Inicialização da gestão de poupança
  function initSavingsManagement() {
    // Implementação básica como exemplo
    // A funcionalidade completa dependeria de um backend/banco de dados
  }

  // Inicialização da gestão de metas
  function initGoalsManagement() {
    const addMetaBtn = document.getElementById("add-meta-btn");
    const metaForm = document.getElementById("meta-form");
    const metaModal = document.getElementById("meta-modal");
    const addMetaCard = document.querySelector(".add-meta");

    if (addMetaBtn) {
      addMetaBtn.addEventListener("click", openMetaModal);
    }

    if (addMetaCard) {
      addMetaCard.addEventListener("click", openMetaModal);
    }

    function openMetaModal() {
      const modalTitle = document.getElementById("meta-modal-title");
      modalTitle.textContent = "Nova Meta";
      metaForm.reset();

      // Pré-preencher data limite com 6 meses a partir de hoje
      const dataInput = document.getElementById("meta-date");
      const future = new Date();
      future.setMonth(future.getMonth() + 6);
      dataInput.value = future.toISOString().split("T")[0];

      // Abrir o modal
      metaModal.classList.add("active");
    }

    if (metaForm) {
      metaForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const nome = document.getElementById("meta-name").value;
        const descricao = document.getElementById("meta-description").value;
        const valorAlvo = parseFloat(
          document.getElementById("meta-target").value
        );
        const valorAtual = parseFloat(
          document.getElementById("meta-current").value
        );
        const prazo = document.getElementById("meta-date").value;

        // Mostrar loading
        Swal.fire({
          title: "Processando...",
          html: "Salvando sua meta financeira",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        // Simular processamento assíncrono
        setTimeout(() => {
          metaModal.classList.remove("active");

          Swal.fire({
            title: "Meta Criada!",
            text: `Sua meta "${nome}" foi criada com sucesso!`,
            icon: "success",
            confirmButtonColor: "#3a86ff",
          });
        }, 800);
      });
    }

    // Implementar eventos para botões de edição e exclusão nas metas existentes
    const metasGrid = document.querySelector(".metas-grid");
    if (metasGrid) {
      metasGrid.addEventListener("click", function (e) {
        const editBtn = e.target.closest(".btn-edit");
        const deleteBtn = e.target.closest(".btn-delete");

        if (editBtn) {
          const metaCard = editBtn.closest(".meta-card");
          const titulo = metaCard.querySelector("h3").textContent;

          Swal.fire({
            title: "Editar Meta",
            text: `Pronto para editar: ${titulo}`,
            icon: "info",
            confirmButtonColor: "#3a86ff",
          });
        } else if (deleteBtn) {
          const metaCard = deleteBtn.closest(".meta-card");
          const titulo = metaCard.querySelector("h3").textContent;

          Swal.fire({
            title: "Tem certeza?",
            text: `Deseja excluir a meta "${titulo}"?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3a86ff",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Cancelar",
          }).then((result) => {
            if (result.isConfirmed) {
              metaCard.remove();

              Swal.fire({
                title: "Excluído!",
                text: "A meta foi excluída com sucesso.",
                icon: "success",
                confirmButtonColor: "#3a86ff",
              });
            }
          });
        }
      });
    }
  }

  // Inicialização da geração de relatórios
  function initReportsGeneration() {
    const generateReportBtn = document.getElementById("generate-report");
    const exportPdfBtn = document.getElementById("export-pdf");
    const relatorioDateRange = document.getElementById("date-range-container");
    const relatorioPeriod = document.getElementById("relatorio-period");

    if (relatorioPeriod) {
      relatorioPeriod.addEventListener("change", function () {
        if (this.value === "personalizado") {
          relatorioDateRange.style.display = "flex";
        } else {
          relatorioDateRange.style.display = "none";
        }
      });
    }

    if (generateReportBtn) {
      generateReportBtn.addEventListener("click", function () {
        // Mostrar loading
        Swal.fire({
          title: "Gerando Relatório...",
          html: "Processando seus dados financeiros",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        // Simular processamento assíncrono
        setTimeout(() => {
          Swal.fire({
            title: "Relatório Pronto!",
            text: "Seu relatório financeiro foi gerado com sucesso!",
            icon: "success",
            confirmButtonColor: "#3a86ff",
          });
        }, 1500);
      });
    }

    if (exportPdfBtn) {
      exportPdfBtn.addEventListener("click", function () {
        exportReportToPDF();
      });
    }
  }

  // Função para exportar relatório em PDF
  function exportReportToPDF() {
    // Mostrar loading
    Swal.fire({
      title: "Preparando PDF...",
      html: "Gerando seu relatório financeiro em PDF",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // Simular processamento assíncrono
    setTimeout(() => {
      // Se a biblioteca jsPDF estiver disponível
      if (
        typeof window.jspdf !== "undefined" &&
        typeof window.jspdf.jsPDF !== "undefined"
      ) {
        // Criar um novo documento PDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Título do relatório
        doc.setFontSize(18);
        doc.text("FinançasPro - Relatório Financeiro", 105, 15, {
          align: "center",
        });

        // Período
        const periodo = document.getElementById("relatorio-period").value;
        let periodoTexto = "Este mês";

        if (periodo === "trimestre") periodoTexto = "Este trimestre";
        else if (periodo === "ano") periodoTexto = "Este ano";
        else if (periodo === "personalizado") {
          const dataInicio = document.getElementById("date-start").value;
          const dataFim = document.getElementById("date-end").value;
          periodoTexto = `${dataInicio} até ${dataFim}`;
        }

        doc.setFontSize(12);
        doc.text(`Período: ${periodoTexto}`, 105, 25, { align: "center" });
        doc.text(
          `Data de geração: ${new Date().toLocaleDateString("pt-BR")}`,
          105,
          30,
          { align: "center" }
        );

        // Linha separadora
        doc.setLineWidth(0.5);
        doc.line(20, 35, 190, 35);

        // Resumo financeiro
        doc.setFontSize(14);
        doc.text("Resumo Financeiro", 20, 45);

        // Tabela de resumo
        const resumoData = [
          ["Receitas", "R$ 3.620,00"],
          ["Despesas", "R$ 1.620,00"],
          ["Saldo", "R$ 2.000,00"],
          ["Taxa de Economia", "55,2%"],
          ["Maior Despesa", "Moradia (R$ 800,00)"],
        ];

        doc.autoTable({
          startY: 50,
          head: [["Item", "Valor"]],
          body: resumoData,
          theme: "grid",
          headStyles: {
            fillColor: [58, 134, 255],
            textColor: [255, 255, 255],
            fontStyle: "bold",
          },
          styles: {
            fontSize: 10,
          },
        });

        // Tabela de transações
        doc.setFontSize(14);
        doc.text("Transações", 20, doc.lastAutoTable.finalY + 15);

        const transacoesData = [
          ["15/06/2023", "Salário", "Receita", "R$ 3.000,00"],
          ["10/06/2023", "Supermercado", "Alimentação", "R$ 300,00"],
          ["05/06/2023", "Aluguel", "Moradia", "R$ 800,00"],
          [
            "01/06/2023",
            "Transferência para poupança",
            "Poupança",
            "R$ 500,00",
          ],
        ];

        doc.autoTable({
          startY: doc.lastAutoTable.finalY + 20,
          head: [["Data", "Descrição", "Categoria", "Valor"]],
          body: transacoesData,
          theme: "striped",
          headStyles: {
            fillColor: [58, 134, 255],
            textColor: [255, 255, 255],
            fontStyle: "bold",
          },
          styles: {
            fontSize: 10,
          },
        });

        // Insights
        doc.setFontSize(14);
        doc.text("Insights", 20, doc.lastAutoTable.finalY + 15);

        const insights = [
          "Suas receitas aumentaram 5% em relação ao mês anterior.",
          "Você está próximo de atingir o limite orçado para Transporte (83%).",
          "Você economizou 55,2% da sua renda este mês, acima da meta de 30%.",
        ];

        let yPos = doc.lastAutoTable.finalY + 20;
        doc.setFontSize(10);

        insights.forEach((insight, index) => {
          doc.text(`${index + 1}. ${insight}`, 20, yPos);
          yPos += 7;
        });

        // Rodapé
        const pageCount = doc.internal.getNumberOfPages();
        doc.setFontSize(8);
        for (let i = 1; i <= pageCount; i++) {
          doc.setPage(i);
          doc.text(
            "FinançasPro - Relatório gerado em " +
              new Date().toLocaleDateString("pt-BR"),
            105,
            287,
            { align: "center" }
          );
          doc.text("Página " + i + " de " + pageCount, 105, 292, {
            align: "center",
          });
        }

        // Salvar o PDF
        doc.save("relatorio-financeiro.pdf");

        // Mostrar mensagem de sucesso
        Swal.fire({
          title: "PDF Gerado!",
          text: "Seu relatório em PDF foi gerado com sucesso!",
          icon: "success",
          confirmButtonColor: "#3a86ff",
        });
      } else {
        Swal.fire({
          title: "Erro!",
          text: "Não foi possível gerar o PDF. Biblioteca jsPDF não encontrada.",
          icon: "error",
          confirmButtonColor: "#3a86ff",
        });
      }
    }, 1500);
  }

  // Inicialização da página de configurações
  function initSettingsPage() {
    const saveSettingsBtn = document.getElementById("save-settings");
    const resetDataBtn = document.getElementById("reset-data");
    const backupDataBtn = document.getElementById("backup-data");
    const importDataBtn = document.getElementById("import-data");
    const exportDataBtn = document.getElementById("export-data");

    // Adicionar categoria de receita
    const addReceitaCategoryBtn = document.getElementById(
      "add-receita-category"
    );
    if (addReceitaCategoryBtn) {
      addReceitaCategoryBtn.addEventListener("click", function () {
        openCategoryModal("receita");
      });
    }

    // Adicionar categoria de despesa
    const addDespesaCategoryBtn = document.getElementById(
      "add-despesa-category"
    );
    if (addDespesaCategoryBtn) {
      addDespesaCategoryBtn.addEventListener("click", function () {
        openCategoryModal("despesa");
      });
    }

    // Salvar configurações
    if (saveSettingsBtn) {
      saveSettingsBtn.addEventListener("click", function () {
        // Mostrar loading
        Swal.fire({
          title: "Salvando...",
          html: "Aplicando suas configurações",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        // Simular processamento assíncrono
        setTimeout(() => {
          Swal.fire({
            title: "Configurações Salvas!",
            text: "Suas configurações foram salvas com sucesso!",
            icon: "success",
            confirmButtonColor: "#3a86ff",
          });
        }, 800);
      });
    }

    // Resetar dados
    if (resetDataBtn) {
      resetDataBtn.addEventListener("click", function () {
        Swal.fire({
          title: "Atenção!",
          text: "Tem certeza que deseja resetar todos os dados? Esta ação não pode ser desfeita.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3a86ff",
          confirmButtonText: "Sim, resetar tudo!",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            // Mostrar loading
            Swal.fire({
              title: "Processando...",
              html: "Resetando todos os dados",
              allowOutsideClick: false,
              didOpen: () => {
                Swal.showLoading();
              },
            });

            // Simular processamento assíncrono
            setTimeout(() => {
              Swal.fire({
                title: "Concluído!",
                text: "Todos os dados foram resetados com sucesso.",
                icon: "success",
                confirmButtonColor: "#3a86ff",
              });
            }, 1500);
          }
        });
      });
    }

    // Backup de dados
    if (backupDataBtn) {
      backupDataBtn.addEventListener("click", function () {
        // Mostrar loading
        Swal.fire({
          title: "Processando...",
          html: "Criando backup dos seus dados",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        // Simular processamento assíncrono
        setTimeout(() => {
          Swal.fire({
            title: "Backup Realizado!",
            text: "Backup dos seus dados criado com sucesso!",
            icon: "success",
            confirmButtonColor: "#3a86ff",
          });
        }, 1200);
      });
    }

    // Importar dados
    if (importDataBtn) {
      importDataBtn.addEventListener("click", function () {
        Swal.fire({
          title: "Funcionalidade em Desenvolvimento",
          text: "A importação de dados estará disponível em breve.",
          icon: "info",
          confirmButtonColor: "#3a86ff",
        });
      });
    }

    // Exportar dados
    if (exportDataBtn) {
      exportDataBtn.addEventListener("click", function () {
        // Mostrar loading
        Swal.fire({
          title: "Processando...",
          html: "Preparando seus dados para exportação",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        // Simular processamento assíncrono
        setTimeout(() => {
          const dummyData = {
            configuracoes: {
              nome: "Meu Controle",
              email: "controle@financas.com",
              moeda: "BRL",
              tema: "light",
            },
            categorias: {
              receitas: ["Salário", "Freelance", "Investimentos"],
              despesas: [
                "Alimentação",
                "Moradia",
                "Transporte",
                "Saúde",
                "Lazer",
                "Educação",
              ],
            },
            transacoes: [
              {
                tipo: "receita",
                data: "2023-06-15",
                descricao: "Salário",
                valor: 3000,
                categoria: "Salário",
              },
              {
                tipo: "despesa",
                data: "2023-06-10",
                descricao: "Supermercado",
                valor: 300,
                categoria: "Alimentação",
              },
            ],
          };

          const dataStr =
            "data:text/json;charset=utf-8," +
            encodeURIComponent(JSON.stringify(dummyData, null, 2));
          const downloadAnchorNode = document.createElement("a");
          downloadAnchorNode.setAttribute("href", dataStr);
          downloadAnchorNode.setAttribute(
            "download",
            "financas-pro-export.json"
          );
          document.body.appendChild(downloadAnchorNode);
          downloadAnchorNode.click();
          downloadAnchorNode.remove();

          Swal.fire({
            title: "Exportação Concluída!",
            text: "Seus dados foram exportados com sucesso!",
            icon: "success",
            confirmButtonColor: "#3a86ff",
          });
        }, 1000);
      });
    }

    // Eventos para categorias existentes
    const categoriasLists = document.querySelectorAll(".categories-list");
    if (categoriasLists.length > 0) {
      categoriasLists.forEach((list) => {
        list.addEventListener("click", function (e) {
          const editBtn = e.target.closest(".btn-edit");
          const deleteBtn = e.target.closest(".btn-delete");

          if (!editBtn && !deleteBtn) return;

          const listItem = (editBtn || deleteBtn).closest("li");
          const categoriaName = listItem.querySelector("span").textContent;

          if (editBtn) {
            Swal.fire({
              title: "Editar Categoria",
              input: "text",
              inputLabel: "Nome da categoria",
              inputValue: categoriaName,
              showCancelButton: true,
              confirmButtonText: "Salvar",
              cancelButtonText: "Cancelar",
              confirmButtonColor: "#3a86ff",
              inputValidator: (value) => {
                if (!value) {
                  return "Por favor, digite um nome para a categoria!";
                }
              },
            }).then((result) => {
              if (result.isConfirmed) {
                listItem.querySelector("span").textContent = result.value;

                Swal.fire({
                  title: "Categoria Atualizada!",
                  text: "A categoria foi atualizada com sucesso.",
                  icon: "success",
                  confirmButtonColor: "#3a86ff",
                });
              }
            });
          } else if (deleteBtn) {
            Swal.fire({
              title: "Tem certeza?",
              text: `Deseja excluir a categoria "${categoriaName}"?`,
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#d33",
              cancelButtonColor: "#3a86ff",
              confirmButtonText: "Sim, excluir!",
              cancelButtonText: "Cancelar",
            }).then((result) => {
              if (result.isConfirmed) {
                listItem.remove();

                Swal.fire({
                  title: "Excluído!",
                  text: "A categoria foi excluída com sucesso.",
                  icon: "success",
                  confirmButtonColor: "#3a86ff",
                });
              }
            });
          }
        });
      });
    }
  }

  function openCategoryModal(tipo) {
    const modal = document.getElementById("category-modal");
    const tipoSelect = document.getElementById("category-type");
    const modalTitle = document.getElementById("category-modal-title");

    // Configurar o título do modal
    modalTitle.textContent = "Nova Categoria";

    // Pré-selecionar o tipo
    tipoSelect.value = tipo;

    // Abrir o modal
    modal.classList.add("active");
  }

  // Formulário de categoria
  const categoryForm = document.getElementById("category-form");
  if (categoryForm) {
    categoryForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const tipo = document.getElementById("category-type").value;
      const nome = document.getElementById("category-name").value;

      if (!nome.trim()) {
        Swal.fire({
          title: "Atenção!",
          text: "Por favor, digite um nome para a categoria.",
          icon: "warning",
          confirmButtonColor: "#3a86ff",
        });
        return;
      }

      // Mostrar loading
      Swal.fire({
        title: "Processando...",
        html: "Salvando nova categoria",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Simular processamento assíncrono
      setTimeout(() => {
        // Adicionar a nova categoria à lista correspondente
        const listId =
          tipo === "receita" ? "receita-categories" : "despesa-categories";
        const list = document.getElementById(listId);

        if (list) {
          const newItem = document.createElement("li");
          newItem.innerHTML = `
            <span>${nome}</span>
            <div class="category-actions">
              <button class="btn-icon btn-edit"><i>✏️</i></button>
              <button class="btn-icon btn-delete"><i>🗑️</i></button>
            </div>
          `;

          list.appendChild(newItem);
        }

        // Fechar o modal
        closeModal("category-modal");

        Swal.fire({
          title: "Categoria Adicionada!",
          text: "A nova categoria foi adicionada com sucesso!",
          icon: "success",
          confirmButtonColor: "#3a86ff",
        });
      }, 800);
    });
  }

  // Gerenciamento de modais
  function initModals() {
    // Botões para fechar modais
    const closeButtons = document.querySelectorAll(
      ".modal-close, .modal-cancel"
    );
    closeButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const modal = this.closest(".modal");
        modal.classList.remove("active");
      });
    });

    // Fechar ao clicar fora do modal
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => {
      modal.addEventListener("click", function (e) {
        if (e.target === this) {
          this.classList.remove("active");
        }
      });
    });
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove("active");
    }
  }

  // Funções auxiliares para formatação
  function formatCurrency(value) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR").format(date);
  }

  // Alternância de tema (para implementação futura)
  const themeSelector = document.getElementById("user-theme");
  if (themeSelector) {
    themeSelector.addEventListener("change", function () {
      const theme = this.value;
      if (theme === "dark") {
        document.body.classList.add("dark");

        Swal.fire({
          title: "Tema Alterado",
          text: "Tema escuro aplicado com sucesso!",
          icon: "success",
          confirmButtonColor: "#3a86ff",
          background: "#1e293b",
          color: "#fff",
        });
      } else {
        document.body.classList.remove("dark");

        Swal.fire({
          title: "Tema Alterado",
          text: "Tema claro aplicado com sucesso!",
          icon: "success",
          confirmButtonColor: "#3a86ff",
        });
      }
    });
  }
});
