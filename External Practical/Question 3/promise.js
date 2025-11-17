const fetchDota = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Data fetched successfully");
    }, 2000);
});

fetchDota
    .then((message) => {
        console.log(message);
    })
    .catch((error) => {
        console.log(error);
    });
