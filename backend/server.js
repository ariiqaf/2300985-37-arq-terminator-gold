const express = require("express");
const clothesRouter = require("./src/clothes/routes");
var cors = require('cors')

const app = express();
const port = 8080;

app.use(cors())
app.use(express.json());

app.options('*', cors())

app.use("/api/v1/clothes", clothesRouter);

app.listen(port, () => console.log(`app listening on port ${port}`));
