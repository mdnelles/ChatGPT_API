// const express = require("express");
// const app = express();

import express from "express";
const app = express();
import bodyParser from "body-parser";
import * as basic from "./routes/basic.js";
import cors from "cors";
import helmet from "helmet";

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: true });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(jsonParser);
app.use(urlencodedParser);
app.use(helmet());

// Login endpoint
app.get("/chat/wait", basic.chatWait);
app.get("/chat/stream", basic.chatStream);
app.get("/chat/followup", basic.chatFollowUp);

// Start the server
app.listen(3000, () => {
   console.log("Server listening on port 3000");
});
