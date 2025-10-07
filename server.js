const express = require("express");
const app = express();
const data = require("./lists.json");
app.use(express.json());

function formatListGeneric(items) {
  return items
    .map(item => Object.entries(item)
      .map(([k, v]) => `${capitalize(k)}: ${v}`)
      .join("\n"))
    .join("\n\n");
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

app.post("/get-list", (req, res) => {
  const category = req.body.category;

  console.log("Category received:", req.body.category);

  const items = data[category] || [];
  res.json({ formatted: formatListGeneric(items) });
});

app.listen(3000, () => console.log("Running"));
