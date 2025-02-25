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
