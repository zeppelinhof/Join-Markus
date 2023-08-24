const wrapper = document.querySelector(".wrapper");
selectBtn = wrapper.querySelector(".select-btn");
searchInp = wrapper.querySelector("input");
options = wrapper.querySelector(".options");

let countries = ["Australia", "Israel", "Germany", "USA", "Russia", "Japan", "GB", "Kongo", "Swerige", "VAE", "Bolivia"]

function addCountry(selectedCountry) {
  options.innerHTML = "";
  countries.forEach(country => {
    let li = `<li onclick="updateName(this)" >${country}</li>`;
    options.insertAdjacentHTML("beforeend", li);
  });
}

addCountry();

function updateName(selectedLi) {
  searchInp.value = "";
  addCountry(selectedLi.innerText);
  // wrapper.classList.remove("active");
  selectBtn.firstElementChild.innerText = selectedLi.innerText;
}

searchInp.addEventListener("keyup", () => {
  let arr = [];
  let searchedVal = searchInp.value.toLowerCase();
  arr = countries.filter(data => {
    return data.toLowerCase().startsWith(searchedVal);
  }).map(data => `<li onclick="updateName(this)">${data}</li>`).join("");
  options.innerHTML = arr ? arr : `<p>Name not found</p>`;
});

selectBtn.addEventListener("click", () => {
  wrapper.classList.toggle("active");
})