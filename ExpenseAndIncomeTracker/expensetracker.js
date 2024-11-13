let balance = 0;
const transactions = [];

function updateBalance() {
    document.getElementById("balance").textContent = balance.toFixed(2);
}

// Add transaction 
function addTransaction() {
    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const transactionType = document.querySelector('input[name="transactionType"]:checked').value;

    if (!description || isNaN(amount)) {
        alert("Please enter a valid description and amount.");
        return;
    }

    // if the transaction is an expense or income
    const isExpense = transactionType === "expense";
    const transactionAmount = isExpense ? -amount : amount;

    transactions.push({ description, amount: transactionAmount, type: transactionType });
    balance += transactionAmount;

    // Update UI
    updateBalance();
    displayTransactions();

    // Clear fields
    document.getElementById("description").value = '';
    document.getElementById("amount").value = '';
}

function displayTransactions() {
    const transactionList = document.getElementById("transaction-list");
    transactionList.innerHTML = '';

    // show each transaction item
    transactions.forEach((transaction) => {
        const transactionItem = document.createElement("div");
        transactionItem.classList.add("transaction-item");

        const amountClass = transaction.type === "expense" ? "amount expense" : "amount income";
        transactionItem.innerHTML = `
      <div class="description">${transaction.description}</div>
      <div class="${amountClass}">$${transaction.amount.toFixed(2)}</div>
    `;

        transactionList.appendChild(transactionItem);
    });
}

// mng visibility of the transaction history
function toggleTransactionHistory() {
    const transactionList = document.getElementById("transaction-list");
    const showAllButton = document.querySelector(".show-all-btn");

    if (transactionList.style.display === "none") {
        transactionList.style.display = "block";
        showAllButton.textContent = "Hide All";
    } else {
        transactionList.style.display = "none";
        showAllButton.textContent = "Show All";
    }
}

updateBalance();
