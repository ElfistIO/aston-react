const express = require("express");

const app = express();
const port = 4000;

app.get("/api/feature-flags", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send({ isTelegramShareEnabled: true });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
