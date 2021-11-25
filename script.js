//Mina consts 
const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const money_minus = document.getElementById("money-minus");
const localStorageTransactions = JSON.parse(localStorage.getItem("transactions"));

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

//Skriva in transaktion
function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
  text.placeholder = "Beskrivning saknas";
  amount.placeholder = "Värde saknas";
  }
  
  else {
  const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();
    text.value = "";
    amount.value = "";
  }
}

//ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

//Lägger till transaktioner till dom-lista
function addTransactionDOM(transaction) {

  //Visar + eller - i listan
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");

  //Visa inkomst/utgift i lista + knapp för att radera transaktioner
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");
  item.innerHTML = `${transaction.text} 
   <span>${sign}${Math.abs(transaction.amount)}</span> 
   <button class="delete-btn" onclick="removeTransaction(${
     transaction.id})">x</button>`;
     list.appendChild(item);
}
// Uppdatera summa
function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);

  //Visar totalen 
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `SEK: ${total}`;
  money_plus.innerText = `SEK: ${income}`;
  money_minus.innerText = `SEK: ${expense}`;
}


// Ta bort transaktioner i listan
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage();
  remove();
}

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function remove() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}
remove();

form.addEventListener("submit", addTransaction);