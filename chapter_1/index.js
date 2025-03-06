const express = require("express");
const app = express();

const PORT = 8383;

// middlewares
app.use(express.json());

let data = [
  {
    firstName: "Emran",
    lastName: "Hossain",
    age: 37,
    isMarried: true,
  },
];

app.get("/", (req, res) => {
  res.send(`
    <body style="background: gray; color: white">
    <h1>Hello World!</h1>
    <a href="/dashboard">Dashboard</a>
    <p>${JSON.stringify(data)}</p>
    </body>
    `);
});

app.get("/dashboard", (req, res) => {
  res.send(`
    <body>
    <p>I am from the dashboard page!</p>
    <a href="/">home</a>
    <script>console.log("I am website")</script>
    </body>
    `);
});

app.get("/api/data", (req, res) => {
  res.send(data);
  console.log("Data from server side");
});

app.post("/api/data", (req, res) => {
  let newEntry = req.body;
  let newData = data.push(newEntry);
  console.log(newData);
  res.sendStatus(201);
});

app.delete("/api/data", (req, res) => {
  data.pop()
  res.sendStatus(203);
});

app.listen(PORT, () => {
  console.log(`Rerver is running on port: ${PORT}`);
});
