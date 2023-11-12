// --------------variables-----------------
const income = document.getElementById("gelir");
const addBtn = document.getElementById("submit");
const geliriniz = document.getElementById("geliriniz");
const gideriniz = document.getElementById("gideriniz");
const kalan = document.getElementById("kalan");
const harcama = document.getElementById("harcama");
const harcamaMiktar = document.getElementById("harcamaMiktar");
const tarihInput = document.getElementById("tarihInput");
const saveBtn = document.getElementById("saveBtn");
const tbody = document.querySelector(".tb1 tbody");
// --------------variables-----------------

let gelirToplam = [];
let gider = [];

// load
window.addEventListener("load", () => {
  tarihInput.valueAsDate = new Date();

  const tableStyle = localStorage.getItem("tableStyle");
  if (tableStyle) {
    applyTableStyle(tableStyle);
  }

  const savedTable = localStorage.getItem("table");
  if (savedTable) {
    tbody.innerHTML = savedTable;
  }

  const savedIncome = localStorage.getItem("gelir");
  if (savedIncome) {
    gelirToplam = JSON.parse(savedIncome);
    geliriniz.textContent = gelirToplam.reduce((x, y) => x + y, 0);
  } else {
    geliriniz.textContent = "0";
  }

  const savedExpenses = localStorage.getItem("gider");
  if (savedExpenses) {
    gider = JSON.parse(savedExpenses);
    gideriniz.textContent = gider.reduce((x, y) => x + y, 0);
  } else {
    gideriniz.textContent = "0";
  }

  const savedBalance = localStorage.getItem("kalan");
  if (savedBalance) {
    kalan.textContent = JSON.parse(savedBalance);
  } else {
    updateBalance();
  }
});

// updateBalance
function updateBalance() {
  const totalIncome = gelirToplam.reduce((sum, value) => sum + value, 0);
  const totalExpenses = gider.reduce((sum, value) => sum + value, 0);

  const balance = totalIncome - totalExpenses;
  kalan.textContent = balance;

  localStorage.setItem("kalan", JSON.stringify(balance));
}

const main = document.querySelector("main");

main.addEventListener("click", (e) => {
  if (e.target.id === "submit") {
    if (!income.value.trim()) {
      const notyf = new Notyf();
      notyf.error({
        message: "Income cannot be empty.",
        duration: 2000,
        icon: false,
        position: {
          x: "center",
          y: "top",
        },
      });
    } else {
      e.preventDefault();
      gelirToplam.push(Number(income.value));
      geliriniz.textContent = gelirToplam.reduce((x, y) => x + y, 0);
      updateBalance();
      localStorage.setItem("gelir", JSON.stringify(gelirToplam));
      income.value = "";
    }
  } else if (e.target.id === "saveBtn") {
    if (!harcamaMiktar.value || !harcama.value) {
      e.preventDefault();
      const notyf = new Notyf();
      notyf.error({
        message: "Please enter the amount and description of your expenditure.",
        duration: 2000,
        icon: false,
        position: {
          x: "center",
          y: "top",
        },
      });
    } else if (gelirToplam.length === 0) {
      e.preventDefault();
      const notyf = new Notyf();
      notyf.error({
        message: "Firstly enter your income",
        duration: 2000,
        icon: false,
        position: {
          x: "center",
          y: "top",
        },
      });
    } else {
      e.preventDefault();
      let tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${harcama.value}</td>
        <td>${tarihInput.value}</td>
        <td class="miktar">${harcamaMiktar.value}</td> 
        <td><i id="delbtn" class="fa-solid fa-trash-can"></i></td>`;
      tbody.appendChild(tr);
      gider.push(Number(harcamaMiktar.value));
      gideriniz.textContent = gider.reduce((x, y) => x + y, 0);
      updateBalance();
      localStorage.setItem("table", tbody.innerHTML);
      localStorage.setItem("gider", JSON.stringify(gider));
      harcama.value = "";
      harcamaMiktar.value = "";
    }
  } else if (e.target.id === "delbtn") {
    const tr = e.target.closest("tr");
    const miktar = Number(tr.querySelector(".miktar").textContent);
    tr.remove();
    const index = gider.indexOf(miktar);
    if (index > -1) {
      gider.splice(index, 1);
    }
    gideriniz.textContent = gider.reduce((x, y) => x + y, 0);
    updateBalance();
    localStorage.setItem("table", tbody.innerHTML);
    localStorage.setItem("gider", JSON.stringify(gider));
  } else if (e.target.id === "clearAll") {
    const removeTb2 = document.querySelector(".tb1 tbody");
    removeTb2.remove();
    gelirToplam = [];
    gider = [];
    geliriniz.textContent = "0";
    gideriniz.textContent = "0";
    kalan.textContent = "0";
    localStorage.removeItem("table");
    localStorage.removeItem("gelir");
    localStorage.removeItem("gider");
    localStorage.removeItem("kalan");
    updateBalance();
  }
});

income.addEventListener("keyup", () => {
  income.value = income.value.replace(/e/gi, "");
});

harcamaMiktar.addEventListener("keyup", () => {
  harcamaMiktar.value = harcamaMiktar.value.replace(/e/gi, "");
});

window.addEventListener("resize", function () {
  const screenWidth = window.innerWidth;
  const style = screenWidth <= 400 ? "small" : "large";
  applyTableStyle(style);
});

function applyTableStyle(style) {
  const table2 = document.querySelector(".tb2");
  if (table2) {
    const tbody2 = table2.querySelector("tbody");

    if (style === "small") {
      table2.setAttribute(
        "class",
        "table tb2 table-bordered table-primary table-hover table-striped mt-4 text-center  ms-auto"
      );
      tbody2.setAttribute("class", "text-center");
    } else {
      table2.setAttribute(
        "class",
        "table tb2 table-bordered table-primary table-hover table-striped mt-4 w-50 text-center  ms-auto"
      );
      tbody2.setAttribute("class", "text-end");
    }

    localStorage.setItem("tableStyle", style);
  }
}
