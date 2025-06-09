const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to log incoming requests (for debugging)
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

// Greeting route
app.get("/greetings/:username", (req, res) => {
  const username = req.params.username;
  res.send(`Hello there, ${username}!`);
});

// Dice rolling route
app.get("/roll/:number", (req, res) => {
  const numberParam = req.params.number;
  const number = parseInt(numberParam);

  if (isNaN(number)) {
    res.send("You must specify a number.");
  } else {
    const randomNum = Math.floor(Math.random() * (number + 1));
    res.send(`You rolled a ${randomNum}.`);
  }
});

// Collectibles route
const collectibles = [
  { name: "shiny ball", price: 5.95 },
  { name: "autographed picture of a dog", price: 10 },
  { name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
];

app.get("/collectibles/:index", (req, res) => {
  const index = parseInt(req.params.index);

  if (isNaN(index) || index < 0 || index >= collectibles.length) {
    res.send("This item is not yet in stock. Check back soon!");
  } else {
    const item = collectibles[index];
    res.send(
      `So, you want the ${item.name}? For ${item.price}, it can be yours!`
    );
  }
});

// Shoes route with filtering
const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" },
];

app.get("/shoes", (req, res) => {
  try {
    let results = [...shoes];
    console.log("Initial shoes:", results); // Debug log

    // Min-price filter
    if (req.query["min-price"]) {
      const minPrice = parseFloat(req.query["min-price"]);
      if (isNaN(minPrice)) {
        return res
          .status(400)
          .json({ error: "min-price must be a valid number" });
      }
      results = results.filter((shoe) => shoe.price >= minPrice);
      console.log("After min-price filter:", results); // Debug log
    }

    // Max-price filter
    if (req.query["max-price"]) {
      const maxPrice = parseFloat(req.query["max-price"]);
      if (isNaN(maxPrice)) {
        return res
          .status(400)
          .json({ error: "max-price must be a valid number" });
      }
      results = results.filter((shoe) => shoe.price <= maxPrice);
      console.log("After max-price filter:", results); // Debug log
    }

    // Type filter
    if (req.query.type) {
      const typeQuery = req.query.type.toLowerCase();
      results = results.filter((shoe) => shoe.type.toLowerCase() === typeQuery);
      console.log("After type filter:", results); // Debug log
    }

    res.json({
      count: results.length,
      shoes: results,
    });
  } catch (error) {
    console.error("Error in /shoes route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Error handling middleware was suggested to be added
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
