// Navegação entre páginas
document.querySelectorAll(".sidebar .menu ul li").forEach((item) => {
  item.addEventListener("click", () => {
    // Remove classe 'active' de todos os itens
    document
      .querySelectorAll(".sidebar .menu ul li")
      .forEach((li) => li.classList.remove("active"));
    // Adiciona classe 'active' ao item clicado
    item.classList.add("active");
    // Esconde todas as páginas
    document
      .querySelectorAll(".page")
      .forEach((page) => page.classList.remove("active"));
    // Mostra a página correspondente
    const pageId = item.getAttribute("data-page");
    document.getElementById(pageId).classList.add("active");
    // Atualiza o título da página
    document.getElementById("page-title").textContent = item.textContent.trim();
  });
});

// Gráfico no Dashboard
const ctx = document.getElementById("overview-chart").getContext("2d");
const overviewChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Receitas", "Despesas", "Saldo", "Poupança"],
    datasets: [
      {
        label: "Valores (R$)",
        data: [3000, 1500, 1500, 1000],
        backgroundColor: ["#74c69d", "#ff7f50", "#6c757d", "#8ecae6"],
        borderColor: ["#74c69d", "#ff7f50", "#6c757d", "#8ecae6"],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

// Toggle Sidebar
const toggleSidebarBtn = document.getElementById("toggle-sidebar");
const sidebar = document.getElementById("sidebar");
toggleSidebarBtn.addEventListener("click", () => {
  sidebar.classList.toggle("hidden");
});

// CRUD Functions
function initializeCRUD(tableSelector) {
  const tableBody = document.querySelector(`${tableSelector} tbody`);
  const addButton = document.querySelector(`${tableSelector} .add-item-btn`);
  const formInputs = document.querySelectorAll(`${tableSelector} input`);
  let isEditMode = false;
  let currentEditRow = null;

  // Função para adicionar ou editar uma linha na tabela
  function addItem(data) {
    if (isEditMode && currentEditRow) {
      // Modo de edição: atualiza a linha existente
      Object.keys(data).forEach((key, index) => {
        currentEditRow.cells[index].textContent = data[key];
      });
      isEditMode = false;
      currentEditRow = null;
      addButton.textContent = "Adicionar";
    } else {
      // Modo de adição: cria uma nova linha
      const newRow = tableBody.insertRow();
      Object.values(data).forEach((value) => {
        const cell = newRow.insertCell();
        cell.textContent = value;
      });
      // Célula de ações
      const actionsCell = newRow.insertCell();
      actionsCell.innerHTML = `
        <button class="edit-btn">Editar</button>
        <button class="delete-btn">Excluir</button>
      `;
      // Eventos para os botões de ação
      const editButton = actionsCell.querySelector(".edit-btn");
      const deleteButton = actionsCell.querySelector(".delete-btn");
      editButton.addEventListener("click", () => {
        isEditMode = true;
        currentEditRow = newRow;
        addButton.textContent = "Salvar Alterações";
        formInputs.forEach((input, index) => {
          input.value = newRow.cells[index].textContent;
        });
      });
      deleteButton.addEventListener("click", () => {
        tableBody.removeChild(newRow);
      });
    }
  }

  // Evento do botão "Adicionar"
  addButton.addEventListener("click", (e) => {
    e.preventDefault(); // Impede o envio do formulário
    const data = {};
    formInputs.forEach((input) => {
      data[input.name] = input.value.trim();
    });
    if (Object.values(data).every((value) => value)) {
      addItem(data);
      formInputs.forEach((input) => (input.value = ""));
    } else {
      alert("Por favor, preencha todos os campos corretamente.");
    }
  });
}

// Inicializar CRUD para cada aba
initializeCRUD("#budget .crud-container");
initializeCRUD("#registrations .crud-container");
initializeCRUD("#requests .crud-container");