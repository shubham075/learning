const express = require("express");
const app = express();
const path = require("path");
const stripe = require("stripe")("sk_test_51MSDFJSG8DPyqtCHddm7kSv2RmtHnXTxokrDyiTIK6VbaXHM0rIGxGysjO92yJsLXZRNhvAni7gHSw4CAP31Sda7004IX0bfMF");

const DOMAIN = "http://localhost:8080";

// static files
app.use(express.static(path.join(__dirname, "views")));

// middleware
app.use(express.json());

// routes
app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, "views/checkout.html"));
})
app.post("/payment", async (req, res) => {
    const { products } = req.body;
    
    const lineItems = products.map((product) => {
        return {
            price_data: {
                currency: "inr",
                product_data: {
                    name: product.name,
                    images: [product.image],
                },
                unit_amount: product.amount * 100,
            },
            quantity: product.quantity,
        }
    })

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${DOMAIN}/success.html`,
        cancel_url: `${DOMAIN}/cancel.html`,
    });

    res.json({ id: session.id });
});

// listening...
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
