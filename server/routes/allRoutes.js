const express = require('express');
const router = express.Router();
const moment = require('moment');

convertTimeStampIntoDate = (timeStamp) => {
    //function to convert a timeStamp into a date in the format yyyy-mm-dd

    let date = new Date(timeStamp);

    let day = convertIntoTwoCharacters(date.getDate().toString());
    let month = convertIntoTwoCharacters((date.getMonth() + 1).toString());
    let year = date.getFullYear();

    return year + '-' + month + '-' + day;
};

convertTimeStampIntoTime = (timeStamp) => {
    //function to convert a timeStamp into a time in the format hh:mm:ss

    let date = new Date(timeStamp);

    let hour = convertIntoTwoCharacters(date.getHours().toString());
    let minute = convertIntoTwoCharacters(date.getMinutes().toString());
    let second = convertIntoTwoCharacters(date.getSeconds().toString());

    return hour + ':' + minute + ':' + second;
};

getTimeStampOfNext8thDay = (timeStamp) => {
    //function to calculate the timestamp of 12:00 AM of the 7th day starting from tomorrow (8th day starting from today)

    let date = new Date(timeStamp);

    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let millisecond = date.getMilliseconds();

    //the hour, minute, second and millisecond of today will be subtracted from the current timeStamp to get the time of 12:00 AM today
    //if 8 days are added to this timeStamp, we'll get the timeStamp of 12:00 AM of the 7th day starting from tomorrow (7th day starting from today)

    let eighthDayTimeStamp = timeStamp - ((hour * 3600 + minute * 60 + second) * 1000 + millisecond) + 24 * 3600 * 1000 * 8;

    return eighthDayTimeStamp;
};

createID = (date, time) => {
    //function to create a unique ID for an appointment data

    let plainDate = date.replace(/-/g, '');
    let plainTime = time.replace(/ /g, '');
    plainTime = plainTime.replace(/-/g, '');
    plainTime = plainTime.replace(/:/g, '');

    return plainDate + plainTime;
};

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
        let splittedDate = date.split('-');

        //check the validity of the provided date.
        //if the date has 3 parts (year, month and day), only then it can be correct.

        if (splittedDate.length === 3) {
            let reAssembledDate = splittedDate[0] + '-' + splittedDate[1] + '-' + splittedDate[2];

            //though the date has 3 parts, that doesn't mean the date is correct.
            //it can still be an invalid date.
            //using 'moment' to check whether the date is valid or not.

            let m = moment(reAssembledDate, 'YYYY-MM-DD');

            if (m.isValid()) {
                //converting the date into timestamp, it will be checked whether it is a future date or not.
                //appointments can only be fixed on future dates.

                let formattedDate = new Date(splittedDate[0], splittedDate[1] - 1, splittedDate[2]);

                let timeStamp = formattedDate.getTime();

                let currentTimeStamp = new Date().getTime();

                //appointments can only be fixed within the next 7 days starting from tomorrow.
                //so, we need the timeStamp of 12:00 AM on the 8th day to validate the provided time by the client.

                let timeStampOfTheNext8thDay = getTimeStampOfNext8thDay(currentTimeStamp);

                //create an object with id, name, date and the time of the booking.
                //this object will be stored in the database.

                let object = {
                    id: createID(reAssembledDate, timeRange),
                    name: name,
                    date: convertTimeStampIntoDate(currentTimeStamp),
                    time: convertTimeStampIntoTime(currentTimeStamp),
                };

                //as the database stores text data, the object will be converted into a string to store it in the database

                let stringObject = JSON.stringify(object);

                if (timeStamp > currentTimeStamp && timeStamp < timeStampOfTheNext8thDay) {
                    //
                } else if (timeStamp <= currentTimeStamp) {
                    resData.errorMessage = 'Please select a future date to book an appointment';
                } else if (timeStamp >= timeStampOfTheNext8thDay) {
                    resData.errorMessage = 'Appointments can only be booked within the next 7 days';
                }
            } else {
                resData.errorMessage = 'You must provide a valid date and a valid time to book an appointment';
            }
        } else {
            resData.errorMessage = 'You must provide a valid date and a valid time to book an appointment';
        }
    } else {
        resData.errorMessage = 'You must provide a valid date, a valid time and a valid name to book an appointment';
    }

    if (resData.errorMessage) {
        return res.json(resData);
    }
});

module.exports = router;
