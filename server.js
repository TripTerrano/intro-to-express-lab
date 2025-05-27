// Import Express
const express = require("express");
const app = express();
const PORT = 3000;

// Introduction Greeting the User

app.get("/greetings/:username", (req, res) => {
  const username = req.params.username;
  res.send(`Hello there, ${username}!`);
});

// Rolling the Dice

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

// Collectibles by Index

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

// Filtering by Shoes

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  // ... other shoe objects
];

app.get("/shoes", (req, res) => {
  let filteredShoes = [...shoes];

  // Filter logic for min-price, max-price, and type
  // ...

  res.json(filteredShoes);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// Additional shoe objects for demonstration
