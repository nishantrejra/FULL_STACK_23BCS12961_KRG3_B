let balance = 1000; // initial balance

function deposit() {
  let amount = document.getElementById("amount").value;
  amount = parseFloat(amount);

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid positive amount!");
    return;
  }

  balance += amount;
  document.getElementById("balance").innerText = balance.toFixed(2);
  document.getElementById("amount").value = "";
}

function withdraw() {
  let amount = document.getElementById("amount").value;
  amount = parseFloat(amount);

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid positive amount!");
    return;
  }

  if (amount > balance) {
    alert("Insufficient balance!");
    return;
  }

  balance -= amount;
  document.getElementById("balance").innerText = balance.toFixed(2);
  document.getElementById("amount").value = "";
}
