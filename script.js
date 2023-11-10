const income = document.getElementById("gelir");
const addBtn = document.getElementById("submit");
const geliriniz = document.getElementById("geliriniz");
const gideriniz = document.getElementById("gideriniz");
const kalan = document.getElementById("kalan");
const harcama = document.getElementById("harcama");
const harcamaMiktar = document.getElementById("harcamaMiktar");
const tarihInput = document.getElementById("tarihInput");
const saveBtn = document.getElementById("saveBtn");
const miktar = document.querySelector(".miktar");
const tbody = document.querySelector(".tb1 tbody");
const tb2 = document.querySelector(".tb2 th");

let totalGider;
let gelirToplam = [];
let gider = [];

const bubling = () => {
  const main = document.querySelector("main");

  main.addEventListener("click", (e) => {
    const tb1 = document.querySelector(".tb1 tbody");
    let tr = document.createElement("tr");
    if (e.target.id === "saveBtn") {
      if (!geliriniz.textContent || geliriniz.textContent == 0) {
        e.preventDefault();
        alert("Please enter income");
        harcama.value = "";
        harcamaMiktar.value = "";
      } else if (!harcamaMiktar.value) {
        alert("harcama miktar");
      } else if (!harcama.value) {
        alert("harcama alani bos olamaz");
      } else {
        e.preventDefault();
        tr.innerHTML = `
        <td>
        ${harcama.value}
        </td>
        <td>
        ${tarihInput.value}
        </td>
        <td class="miktar">
        ${harcamaMiktar.value}
        </td> 
        <td>
        <i id="delbtn" class="fa-solid fa-trash-can"></i> 
        </td>     
        `;
        tb1.appendChild(tr);

        gider.push(Number(harcamaMiktar.value));
        totalGider = gider.reduce((x, y) => x + y, 0);
        gideriniz.textContent = totalGider;
        kalan.textContent = geliriniz.textContent - gideriniz.textContent;
        harcama.value = "";
        harcamaMiktar.value = "";
        // localStorage.setItem("table", tbody.innerHTML);
        // localStorage.setItem("tb2", tb2.innerHTML);
      }
    } else if (e.target.id === "submit") {
      console.log(gelirToplam);
      e.preventDefault();
      if (!income.value.trim()) {
        swal();
      } else {
        gelirToplam.push(Number(income.value));
        let total = gelirToplam.reduce((x, y) => x + y, 0);
        geliriniz.textContent = total;
        kalan.textContent = geliriniz.textContent - gideriniz.textContent;
        income.value = "";
      }
    } else if (e.target.id === "delbtn") {
      e.target.closest("tr").remove();
      const silinenMiktar = e.target.closest("tr").querySelector(".miktar");
      totalGider -= silinenMiktar.textContent;
      gideriniz.textContent = totalGider;
      kalan.textContent = geliriniz.textContent - gideriniz.textContent;
    } else if (e.target.id === "clearAll") {
      const removeTb2 = document.querySelector(".tb1 tbody");
      removeTb2.remove();
      geliriniz.textContent = "0";
      gideriniz.textContent = "0";
      kalan.textContent = "0";
    }
  });
};
bubling();

income.addEventListener("keyup", () => {
  income.value = income.value.replace(/e/gi, "");
});

window.addEventListener("load", () => {
  const tarihInput = document.getElementById("tarihInput");
  tarihInput.valueAsDate = new Date();

  // const savedLocal = localStorage.getItem("table");
  // if (savedLocal) {
  //   tbody.innerHTML = savedLocal;
  // }

  // const table2 = localStorage.getItem("tb2");

  // if (table2) {
  //   tb2.innerHTML = table2;
  // }
});

const swal = () => {
  const notyf = new Notyf();
  notyf.error({
    duration: 1000,
    position: {
      x: "center",
      y: "top",
    },
    message: "The input field cannot be empty. Enter an income",
    duration: 9000,
    icon: false,
    background: "#FFC106",
  });
};

const sweetSwal = () => {
  Swal.fire({
    position: "top",
    icon: "warning",
    title: "Please enter income.",
    showConfirmButton: false,
    timer: 1500,
  });
};
