//Dependencies
const express = require('express');
const path = require('path');

//set up express app
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//routers

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

//starts server to begin listening
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});