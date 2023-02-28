const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors())

// parse requests of content-type - application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set the view engine to ejs
// app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use("", require("./routes"));

const port = process.env.PORT || 4000; // setting the port
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})

