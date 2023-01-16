const url = "https://restcountries.com/v3.1/name/";
const search = document.querySelector(".btn");
let input = document.querySelector("input");
let country = document.querySelector(".country-info");

search.addEventListener("click", async (e) => {
  if (input.value != "") {
    try {
      e.preventDefault();
      let response = await fetch(url + input.value);
      let data = await response.json();
      input.value = "";
      let arr = Object.values(data[0].languages);
      let lang = arr.join(", ");

      country.innerHTML = `
    <div class="country-header">
        <img src="${data[0].flags.png}" width="100" class="mt-2" alt="">
        <h1>${data[0].name.common}</h1>
    </div>

<div class="country-data">
    <p class="capital"><b>Capital:</b> ${data[0].capital[0]}</p>
    <p class="continent"><b>Continent:</b> ${data[0].continents[0]}</p>
    <p class="population"><b>Population:</b> ${data[0].population.toLocaleString()}</p>
    <p class="currency"><b>Currency:</b> ${
      Object.values(data[0].currencies)[0].name
    }</p>
    <p class="languages"><b>Common Languages:</b> ${lang}</p>
</div>`;
    } catch {
      country.innerHTML = `<div class="alert alert-danger mt-3" role="alert">
            This country doesn't exist :(
          </div>`;
      setTimeout(() => {
        country.innerHTML = "";
      }, 3000);
    }
  }
});
