// Product dataset
const products = [
    { name: "Smartphone", category: "electronics", price: 12000 },
    { name: "Laptop", category: "electronics", price: 55000 },
    { name: "T-Shirt", category: "clothing", price: 800 },
    { name: "Jeans", category: "clothing", price: 1500 },
    { name: "Novel - The Alchemist", category: "books", price: 500 },
    { name: "Programming in JS", category: "books", price: 700 }
  ];
  
  const productList = document.getElementById("product-list");
  const filterDropdown = document.getElementById("filter");
  const feedback = document.getElementById("feedback");
  
  // Function to render products
  function displayProducts(items) {
    productList.innerHTML = "";
  
    if (items.length === 0) {
      feedback.innerText = "No products found!";
      return;
    }
  
    feedback.innerText = `${items.length} product(s) found`;
  
    items.forEach(product => {
      const card = document.createElement("div");
      card.classList.add("product-card");
      card.innerHTML = `<h4>${product.name}</h4>
                        <p>Category: ${product.category}</p>
                        <p>Price: ₹${product.price}</p>`;
      productList.appendChild(card);
    });
  }
  
  // Filter logic
  function filterProducts() {
    const selected = filterDropdown.value;
  
    if (selected === "all") {
      displayProducts(products);
    } else {
      const filtered = products.filter(p => p.category === selected);
      displayProducts(filtered);
    }
  }
  
  // Initial load
  displayProducts(products);
  
  // Event listener for dropdown
  filterDropdown.addEventListener("change", filterProducts);
  