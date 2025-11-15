
const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 8002;

const stock = {
    1: { productId: 1, quantity: 15 },
    2: { productId: 2, quantity: 4 },
    3: { productId: 3, quantity: 20 }
};

app.get("/stock/:productId", async (req, res) => {
    const productId = req.params.productId;

    try {
        await axios.get(`http://localhost:8001/products/${productId}`);
        const stockInfo = stock[productId];

        if (!stockInfo) {
            return res.status(404).json({ error: "Stock not found" });
        }

        res.json(stockInfo);

    } catch (error) {
        if (error.response && error.response.status === 404) {
            return res.status(404).json({ error: "Product does not exist" });
        }
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Stock Service running on http://localhost:${PORT}`);
});
