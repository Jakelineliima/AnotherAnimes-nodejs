const escondeDropdown = (event) => {
  const dropdown_navbar = document.querySelector(".dropdown_navbar");
  dropdown_navbar.style.display = dropdown_navbar.style.display === "flex" ? "none" : "flex";
  event.stopPropagation();
}

document.addEventListener("click", (event) => {
  const dropdown_navbar = document.querySelector(".dropdown_navbar");
  if (dropdown_navbar.style.display === "flex" && event.target !== dropdown_navbar) {
    dropdown_navbar.style.display = "none";
   }
});

document.querySelector(".dropdown_navbar").addEventListener("click", (event) => {
  event.stopPropagation();
});

// Dropdown Menu Mobile
const dropdownMobile = (event) => {
  const dropdown_navbar_mobile = document.querySelector(".dropdown_navbar_mobile");
  dropdown_navbar_mobile.style.display = dropdown_navbar_mobile.style.display === "flex" ? "none" : "flex";
  event.stopPropagation();
}

document.addEventListener("click", (event) => {
  const dropdown_navbar_mobile = document.querySelector(".dropdown_navbar_mobile");
  if (dropdown_navbar_mobile.style.display === "flex" && event.target !== dropdown_navbar_mobile) {
    dropdown_navbar_mobile.style.display = "none";
   }
});

document.querySelector(".dropdown_navbar_mobile").addEventListener("click", (event) => {
  event.stopPropagation();
});


// Fechar Menu mobile

const fecharMenuMobile = (event) => {
  document.querySelector(".dropdown_navbar_mobile").addEventListener("click", (event) => {
    event.stopPropagation();
  });
}