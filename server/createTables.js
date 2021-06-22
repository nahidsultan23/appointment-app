const db = require('./db/dbConnect');

let query = "SELECT * FROM information_schema.tables WHERE table_schema = 'appointment' AND table_name = 'appointments'";

db.query(query, (err, result) => {
    if (!(err || result.length)) {
        query =
            'CREATE TABLE appointments (' +
            'id INT(6) AUTO_INCREMENT PRIMARY KEY, ' +
            'date TEXT, ' +
            'hr0 TEXT, ' +
            'hr1 TEXT, ' +
            'hr2 TEXT, ' +
            'hr3 TEXT, ' +
            'hr4 TEXT' +
            ')';

        db.query(query, (err, result) => {});
    }
});
