const express = require('express');

const app = express();

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

//if there is a database with the name 'appointment', the tables will be automatically created with the 'createTables' script

require('./createTables');

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
