const AWS = require("aws-sdk");
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

// Configure AWS SDK for SSM
const ssm = new AWS.SSM({ region: "us-east-1" });
let demoUser = null;

// Fetch credentials from SSM Parameter Store
async function loadSecret() {
  try {
    const data = await ssm.getParameter({
      Name: "/devops/demo_user",  // Make sure this matches your parameter name
      WithDecryption: true
    }).promise();

    demoUser = JSON.parse(data.Parameter.Value);
    console.log("Demo credentials loaded successfully!");
  } catch (err) {
    console.error("Error loading secret from SSM:", err);
  }
}

// Load secret when app starts
loadSecret();

// POST /login endpoint
app.post("/login", (req, res) => {
  if (!demoUser) return res.status(500).send("Secret not loaded yet");

  const { email, password } = req.body;
  if (email === demoUser.email && password === demoUser.password) {
    return res.json({ success: true, message: "Login successful!" });
  }
  res.status(401).json({ success: false, message: "Invalid credentials" });
});

// GET / homepage
app.get("/", (req, res) => {
  res.send("Hello from DevOps Assignment!");
});

// Optional: GET /login for browser demo
app.get("/login", (req, res) => {
  res.send("Use POST /login with JSON body: hire-me@anshumat.org / HireMe@2025!");
});

// Start server
app.listen(port, () => console.log(`App running at http://localhost:${port}`));
