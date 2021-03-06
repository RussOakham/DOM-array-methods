const main = document.getElementById("main");
const addUserBtn = document.getElementById("add_user");
const doubleBtn = document.getElementById("double_money");
const showMillionairesBtn = document.getElementById("show_millionaires");
const sortBtn = document.getElementById("sort");
const calcWealthBtn = document.getElementById("calculate_wealth");

// Initialize Array
let data = [];

// fetch random user and add money
async function getRandomUser() {
  const response = await fetch("https://randomuser.me/api");
  const responseData = await response.json();

  const user = responseData.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

// Double everyone's money
function doubleMoney() {
  data = data.map((user) => {
    return {
      ...user,
      money: user.money * 2,
    };
  });

  updateDOM();
}

// Sort everyone by Richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

// filter only Millionaires
function filterByMillionaires() {
  data = data.filter((item) => item.money > 1000000);

  updateDOM();
}

// Calculate total wealth
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}

// add new obj to data array
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {
  // Clear main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;

    main.appendChild(element);
  });
}

// Format number as Money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// Event Listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", filterByMillionaires);
calcWealthBtn.addEventListener("click", calculateWealth);
