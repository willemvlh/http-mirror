import express from "express";
import bodyParser from "body-parser";

var app = express();
app.use(bodyParser.raw({ type: "*/*" }));

export default app;
