const express = require("express");
const app = express();
const port = 3000;

const demoUser = { email: "hire-me@anshumat.org", password: "HireMe@2025!" };

app.use(express.json());

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if(email === demoUser.email && password === demoUser.password){
    return res.json({ success: true, message: "Login successful!" });
  }
  res.status(401).json({ success: false, message: "Invalid credentials" });
});

app.get("/", (req, res) => res.send("Hello from DevOps Assignment!"));

app.listen(port, () => console.log(`App running at http://localhost:${port}`));
