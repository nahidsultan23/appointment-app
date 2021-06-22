const express = require('express');
const router = express.Router();

router.post('/appointment', (req, res) => {
    resData = {
        success: false,
        errorMessage: '',
    };

    let date = req.body.date;
    let timeRange = req.body.timeRange;
    let name = req.body.name;

    if (name) {
        //security threat characters will be removed from the name string

        name = name.replace(/;/g, '');
        name = name.replace(/"/g, '');

        //some names can have single ' like O'Brien. But this character is a security threat in mysql database.
        //so, this character will be changed into % so that we can retrieve this character later.
        //before converting ' into %, we have to make sure that there is no % character in the name.

        name = name.replace(/%/g, '');
        name = name.replace(/'/g, '%');
    }

    //if both date and time range are provided, then other parameters can be checked.

    if (date && timeRange && name) {
        //
    } else {
        resData.errorMessage = 'You must provide a valid date, a valid time and a valid name to book an appointment';
    }

    if (resData.errorMessage) {
        return res.json(resData);
    }
});

module.exports = router;
