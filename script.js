const city = document.querySelector(".city");
const date = document.querySelector(".date");
const containerImg = document.querySelector(".container-img");
const containerTemp = document.querySelector(".container-temp");
const tempNumber = document.querySelector(".txtnum");
const tempc = document.querySelector(".txtc");
const weather = document.querySelector(".weather");
const highLow = document.querySelector(".high-low");
const searchInput = document.querySelector("#txtinp");
const searchButton = document.querySelector("#inputp");
const section = document.querySelector(".txtsection");
const footer = document.querySelector(".txtfooter");
const txterror = document.querySelector(".txterror");
const loader = document.querySelector(".loader");
contente;

const api = {
  key: "272f221fb07fce7e948e9d68d1a0f99b",
  base: "http://api.openweathermap.org/data/2.5/",
  lang: "pt_br",
  units: "metric",
};
searchButton.addEventListener("click", () => {
  if (searchInput.value == "") {
    txterror.innerHTML = "por favor, digite um local.";
    txterror.hidden = false;
    setTimeout(() => {
      txterror.hidden = true;
      txterror.innerHTML = "";
    }, 3000);
    return;
  }
  SearchResults(searchInput.value);
  loader.hidden = false;
  if (footer.hidden == false) {
    footer.hidden = true;
    section.hidden = true;
  }
});

function SearchResults(city) {
  fetch(
    `${api.base}weather?q=${city}&lang=${api.lang}&units=${api.units}&appid=${api.key}`
  )
    .then((res) => {
      return res.json();
    })
    .then((response) => {
      if (response.cod == "404") {
        throw new Error(`${searchInput.value} não foi encontrado.`);
      } else {
        DisplayResult(response);
      }
    })
    .catch((er) => {
      txterror.hidden = false;
      txterror.innerHTML = er;
      loader.hidden = true;
      setTimeout(() => {
        txterror.hidden = true;
        txterror.innerHTML = "";
      }, 4000);
    });
}
function DisplayResult(info) {
  searchInput.value = null;
  section.hidden = false;
  footer.hidden = false;
  loader.hidden = true;

  console.log(info);

  city.innerHTML = `${info.name}, ${info.sys.country}`;
  tempNumber.innerHTML = `${Math.floor(info.main.temp)}`;
  highLow.innerHTML = `${Math.floor(info.main.temp_min)}°/${Math.floor(
    info.main.temp_max
  )}°`;
  weather.innerHTML = `${info.weather[0].description}`;
  let iconName = info.weather[0].icon;
  containerImg.innerHTML = `<img src="./img/${iconName}.png">`;

  var get = new Date();
  var DayString = get.getDay();
  var DayNum = get.getDate();
  var month = get.getMonth();
  var year = get.getFullYear();
  month += 1;

  switch (DayString) {
    case 0:
      date.innerHTML = `Domingo `;
      break;
    case 1:
      date.innerHTML = "Segunda ";
      break;
    case 2:
      date.innerHTML = "Terça ";
      break;
    case 3:
      date.innerHTML = "Quarta ";
      break;
    case 4:
      date.innerHTML = "Quinta ";
      break;
    case 5:
      date.innerHTML = "Sexta ";
      break;
    case 6:
      date.innerHTML = "Sábado ";
      break;
  }
  date.innerHTML += `${DayNum}/`;
  date.innerHTML += `${month}/`;
  date.innerHTML += `${year}`;
}
