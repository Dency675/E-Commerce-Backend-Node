const express = require("express"); //here express gives a function

const app = express(); //the return of express function is stored in app

const port = 3000 || process.env.port; //process.env.port takes value in the environment file and use that here

app.use(express.json());

app.get("/", (req, res) => {
  const { name, age } = req.query;
  res.send(`${name} , ${age} `);
});

app.post("/contact", (req, res) => {
  const { name, email, phone } = req.body;
  if (!name) {
    res.status(425).json({ message: "name is missing" });
  }

  res.status(200).json({
    message: `The contact of ${name} is ${email} and ${phone}`,
  });
});

app.listen(port, () => {
  console.log(`The port ${port} running`);
});
