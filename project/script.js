let balance = document.getElementById("balance")
let money_plus = document.getElementById("money-plus")
let money_minus = document.getElementById("money-minus")
let list = document.getElementById("list")
let form = document.getElementById("form")
let text = document.getElementById("text")
let amount = document.getElementById("amount")
// console.log(money_minus);

// form.addEventListener("submit",function(e){
//     e.preventDefault();

//     console.log(text.value,amount.value);
// })

//transaction history
// let transactions = []
// Get item from Local Storage  STEP 1
let localStorageTransactions = JSON.parse(localStorage.getItem("transactions"));
let transactions = localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

//STEP 5. Initialize the app
init();  //clear and reload our page


// STEP 2 FUNCTION TO STORE DATA IN LOCALSTORAGE
function updateLocalStorage(){
    localStorage.setItem("transactions", JSON.stringify(transactions))

}


//new transaction
function addTransaction(e){
    e.preventDefault();
    if(text.value.trim() === "" || amount.value.trim() === "" || isNaN(amount.value)){
        alert("Enter valid description and amount")
    }
    else{
        const transaction = {
            id: Math.floor(Math.random() * 100000000),
            text: text.value,
            amount: +amount.value
        }
        // console.log(transaction);
        transactions.push(transaction);
        addTransactionToDOM(transaction);
        updateValues()
       
        //STEP 3 Update local storage when item is added
        updateLocalStorage();
        text.value="";
        amount.value="";
    }

}


//show transaction in UI
function addTransactionToDOM(transaction){
    // const sign = transaction.amount > 0 ? "+" : "-";
    let item = document.createElement("li");
    item.classList.add(transaction.amount > 0 ? "plus" :"minus");
    item.innerHTML = `${transaction.text}<span>${transaction.amount}</span> <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`;
    list.appendChild(item);

}
//update transaction
function updateValues(){
    const amounts = transactions.map(x => x.amount)
    const total = amounts.reduce((x, y) => (x += y), 0).toFixed(2);
    balance.innerHTML = `&#x20A6; ${total}`


    //for income
    const income = amounts.filter(x => x > 0).reduce((x,y) => (x=y), 0).toFixed(2);
    money_plus.innerHTML = `&#x20A6; ${income}`

    money_minus.innerHTML = `&#x20A6; ${Math.abs(amounts.filter(x => x < 0).reduce((x,y) => (x += y), 0)).toFixed(2)}`
    // console.log(amounts);

}
function removeTransaction(id){
    transactions = transactions.filter(x => x.id !== id)
    // updateValues()
    //4. update local storage when item is deleted
    updateLocalStorage()
    init()
    
}

function init(){
    list.innerHTML = "";
    transactions.forEach(addTransactionToDOM)
    updateValues()
    
}

form.addEventListener("submit", addTransaction);