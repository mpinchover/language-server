const express = require("express");
const cors = require("cors");
const { makeRequestToOpenAIHebrew } = require("./openai");

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options("*", cors());

app.post("/translate", async (req, res) => {
  try {
    const text = req.body.text;
    const trans = await makeRequestToOpenAIHebrew(text);
    res.json({ trans });
  } catch (e) {
    console.log(e);
    res.json({ success: false });
  }
});

app.listen(5001, () => {
  console.log("listning on port 5001");
});
