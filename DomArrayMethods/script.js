const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser()
getRandomUser()
getRandomUser()

// fetch random user and add money
async function getRandomUser() {
    const res = await fetch('https://cors-anywhere.herokuapp.com/https://randomuser.me/api')
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }

    addData(newUser);
}

// Calculate total wealth
function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);

    const wealthElement = document.createElement('div');
    wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthElement);
}

// Filter only millionaires
function showMillionaires() {
    data = data.filter(item => {
        return item.money > 1000000;
    })

    updateDOM();
}

// Sort users by richest
function sortByRichest() {
    data.sort((a, b) => {
        return b.money - a.money;
    })

    updateDOM();
}

// Double everyones money
function doubleMoney() {
    data = data.map((user) => {
        return { ...user, money: user.money * 2 };
    })

    updateDOM();
}

// add new obj to data arr 
function addData(obj) {
    data.push(obj);

    updateDOM();
}

// update DOM
function updateDOM(providedData = data) {
    // Clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach((item, index) => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}

// Format number as money
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event listeners

// add user
addUserBtn.addEventListener('click', getRandomUser);

// double money
doubleBtn.addEventListener('click', doubleMoney);

// sort 
sortBtn.addEventListener('click', sortByRichest);

showMillionairesBtn.addEventListener('click', showMillionaires);

calculateWealthBtn.addEventListener('click', calculateWealth);