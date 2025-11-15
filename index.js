
const express = require("express");
const app = express();
const PORT = 8001;

const products = {
    1: { id: 1, name: "Laptop", price: 4500 },
    2: { id: 2, name: "Smartphone", price: 2800 },
    3: { id: 3, name: "Monitor", price: 900 }
};

app.get("/products/:id", (req, res) => {
    const id = req.params.id;
    const product = products[id];

    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
});

app.listen(PORT, () => {
    console.log(`Products Service running on http://localhost:${PORT}`);
});
