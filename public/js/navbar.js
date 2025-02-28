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