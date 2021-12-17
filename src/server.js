require("dotenv").config();
const express = require("express");
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

require("./controllers/auth")(app);
require("./controllers/user")(app);
require("./controllers/receipts")(app);

app.listen(3001);
