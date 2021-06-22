const express = require('express');
const router = express.Router();
const moment = require('moment');

const db = require('../db/dbConnect');

convertIntoTwoCharacters = (string) => {
    //function to convert the day, month, hour, minute and second into 2 characters

    if (string.length < 2) {
        string = '0' + string;
    }

    return string;
};

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

router.get('/home', (req, res) => {
    resData = {
        success: false,
        errorMessage: '',
        data: [],
    };

    let currentTimeStamp = new Date().getTime();

    //As appointments can only be booked on a future date, the next 7 days have been calculated by adding 24 hours for each day.
    //next7Days array will be prepared to send to the client.

    let next7Days = [];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    for (i = 0; i < 7; i++) {
        let newTimeStamp = currentTimeStamp + 24 * 3600 * 1000 * (i + 1);
        let date = new Date(newTimeStamp);
        let day = date.getDate();
        let dayName = days[date.getDay()];

        if (day % 10 === 1) {
            day = day + 'st';
        } else if (day % 10 === 2) {
            day = day + 'nd';
        } else if (day % 10 === 3) {
            day = day + 'rd';
        } else {
            day = day + 'th';
        }

        if (dayName === 'Saturday' || dayName === 'Sunday') {
            next7Days.push({
                day: day,
                dayName: dayName,
                date: convertTimeStampIntoDate(newTimeStamp),
                hourData: {
                    hr0: 'unavailable',
                    hr1: 'unavailable',
                    hr2: 'unavailable',
                    hr3: 'unavailable',
                    hr4: 'unavailable',
                },
            });
        } else {
            next7Days.push({
                day: day,
                dayName: dayName,
                date: convertTimeStampIntoDate(newTimeStamp),
                hourData: {
                    hr0: '',
                    hr1: '',
                    hr2: '',
                    hr3: '',
                    hr4: '',
                },
            });
        }
    }

    //fetch the next 7 days' data from the database.

    let query =
        'SELECT * ' +
        'FROM appointments ' +
        "WHERE date='" +
        next7Days[0].date +
        "' " +
        "OR date='" +
        next7Days[1].date +
        "' " +
        "OR date='" +
        next7Days[2].date +
        "' " +
        "OR date='" +
        next7Days[3].date +
        "' " +
        "OR date='" +
        next7Days[4].date +
        "' " +
        "OR date='" +
        next7Days[5].date +
        "' " +
        "OR date='" +
        next7Days[6].date +
        "'";

    db.query(query, (err, result) => {
        if (err) {
            resData.errorMessage = 'Something went wrong! Please try again';
            return res.json(resData);
        }

        if (result.length) {
            //add the data from the database to the next7Days array.

            for (let i = 0; i < result.length; i++) {
                let date = result[i].date;
                let index = next7Days.findIndex((a) => a.date === date);

                if (result[i].hr0) {
                    //the data was saved as string in the database.
                    //before sending it to the client, the string will be converted into JSON object.

                    let object = JSON.parse(result[i].hr0);

                    //the ' from the name was replaced with % before saving the name into the database.
                    //before sending the name to the client, that ' will be returned.

                    object.name = object.name.replace(/%/g, "'");

                    next7Days[index].hourData.hr0 = object;
                }

                if (result[i].hr1) {
                    let object = JSON.parse(result[i].hr1);
                    object.name = object.name.replace(/%/g, "'");

                    next7Days[index].hourData.hr1 = object;
                }

                if (result[i].hr2) {
                    let object = JSON.parse(result[i].hr2);
                    object.name = object.name.replace(/%/g, "'");

                    next7Days[index].hourData.hr2 = object;
                }

                if (result[i].hr3) {
                    let object = JSON.parse(result[i].hr3);
                    object.name = object.name.replace(/%/g, "'");

                    next7Days[index].hourData.hr3 = object;
                }

                if (result[i].hr4) {
                    let object = JSON.parse(result[i].hr4);
                    object.name = object.name.replace(/%/g, "'");

                    next7Days[index].hourData.hr4 = object;
                }
            }
        }

        resData.success = true;
        resData.data = next7Days;
        return res.json(resData);
    });
});

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
                    //the date is fine. Now, check the day.
                    //appointments cannot be booked on Saturday or Sunday.

                    let day = formattedDate.getDay();

                    //Sunday is day=0 and Saturday is day=6
                    //so a valid day will be from day=1 to day=5

                    if (day && day < 6) {
                        let timeRangeForDB = '';

                        //prepare the time range for the database.

                        if (timeRange === '08:00 - 10:00') {
                            timeRangeForDB = 'hr0';
                        } else if (timeRange === '10:00 - 12:00') {
                            timeRangeForDB = 'hr1';
                        } else if (timeRange === '12:00 - 14:00') {
                            resData.errorMessage = 'Appointments cannot be booked from 12:00 to 14:00. Please select another time';
                        } else if (timeRange === '14:00 - 16:00') {
                            timeRangeForDB = 'hr2';
                        } else if (timeRange === '16:00 - 18:00') {
                            timeRangeForDB = 'hr3';
                        } else if (timeRange === '18:00 - 20:00') {
                            timeRangeForDB = 'hr4';
                        } else {
                            resData.errorMessage = 'Please select a valid time';
                        }

                        if (timeRangeForDB) {
                            //check whether the date already exists in the database or not.

                            let query = "SELECT * FROM appointments WHERE date='" + reAssembledDate + "'";

                            db.query(query, (err, result) => {
                                if (err) {
                                    resData.errorMessage = 'Something went wrong! Please try again';
                                    return res.json(resData);
                                }

                                if (result.length) {
                                    //the date exists in the database. Check whether the time is already booked or not.

                                    if (result[0][timeRangeForDB]) {
                                        //the time is already taken.

                                        resData.errorMessage = 'The time has already been booked. Please choose another time';
                                        return res.json(resData);
                                    } else {
                                        //the time is available for appointment.

                                        query =
                                            'UPDATE appointments SET ' +
                                            timeRangeForDB +
                                            "='" +
                                            stringObject +
                                            "' WHERE date='" +
                                            reAssembledDate +
                                            "'";

                                        db.query(query, (err, result) => {
                                            if (err) {
                                                resData.errorMessage = 'Something went wrong! Please try again';
                                                return res.json(resData);
                                            }

                                            resData.success = true;
                                            return res.json(resData);
                                        });
                                    }
                                } else {
                                    //the date doesn't exist in the database. So, it can be inserted as a new row.

                                    query =
                                        'INSERT INTO appointments (date, ' +
                                        timeRangeForDB +
                                        ") VALUES ('" +
                                        reAssembledDate +
                                        "', '" +
                                        stringObject +
                                        "')";

                                    db.query(query, (err, result) => {
                                        if (err) {
                                            resData.errorMessage = 'Something went wrong! Please try again';
                                            return res.json(resData);
                                        }

                                        resData.success = true;
                                        return res.json(resData);
                                    });
                                }
                            });
                        }
                    } else {
                        resData.errorMessage = 'Appointments cannot be booked on Saturday or Sunday';
                    }
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

router.get('/appointment/:id', (req, res) => {
    resData = {
        success: false,
        errorMessage: '',
        data: {},
    };

    let id = req.params.id;

    //security check: remove all non-numeric characters from the id (if available).

    id = id.replace(/\D/g, '');

    //an ID will always be 16 characters (the 'createID' function above creates the IDs and it always returns a 16 character ID)

    if (id.length === 16) {
        //get the date and the time range information from the ID.

        let date = id.slice(0, 8);
        let timeRange = id.slice(8);

        //convert the date and the timeRange into their real appearances.

        let formattedDate = date.slice(0, 4) + '-' + date.slice(4, 6) + '-' + date.slice(6);
        let formattedTimeRange = timeRange.slice(0, 2) + ':' + timeRange.slice(2, 4) + ' - ' + timeRange.slice(4, 6) + ':' + timeRange.slice(6);

        let timeRangeForDB = '';

        if (formattedTimeRange === '08:00 - 10:00') {
            timeRangeForDB = 'hr0';
        } else if (formattedTimeRange === '10:00 - 12:00') {
            timeRangeForDB = 'hr1';
        } else if (formattedTimeRange === '14:00 - 16:00') {
            timeRangeForDB = 'hr2';
        } else if (formattedTimeRange === '16:00 - 18:00') {
            timeRangeForDB = 'hr3';
        } else if (formattedTimeRange === '18:00 - 20:00') {
            timeRangeForDB = 'hr4';
        } else {
            resData.errorMessage = 'Please provide a valid Appointment ID';
        }

        if (timeRangeForDB) {
            //search for the appointment.

            let query = 'SELECT ' + timeRangeForDB + " FROM appointments WHERE date='" + formattedDate + "'";
            db.query(query, (err, result) => {
                if (err) {
                    resData.errorMessage = 'Something went wrong! Please try again';
                } else {
                    if (result.length === 1) {
                        //the data in the database is a string.
                        //it will be converted into a JSON object before sending it to the client.

                        let object = JSON.parse(result[0][timeRangeForDB]);

                        resData.success = true;
                        resData.data = {
                            id: object.id,
                            name: object.name,
                            date: object.date,
                            time: object.time,
                            timeRange: formattedTimeRange,
                        };
                    } else {
                        resData.errorMessage = 'Please provide a valid Appointment ID';
                    }
                }

                return res.json(resData);
            });
        }
    } else {
        resData.errorMessage = 'Please provide a valid Appointment ID';
    }

    if (resData.errorMessage) {
        return res.json(resData);
    }
});

router.get('/appointments', (req, res) => {
    resData = {
        success: false,
        errorMessage: '',
        data: [],
    };

    //get all the appointments from the database.

    let query = 'SELECT * FROM appointments';

    db.query(query, (err, result) => {
        if (err) {
            resData.errorMessage = 'Something went wrong! Please try again';
        }

        resData.success = true;

        if (result.length) {
            //in the database, the appointments are not sorted according to their dates.
            //the appointments will be sorted according to their dates before sending them to the client.

            let sortedResult = result.sort(
                (a, b) =>
                    new Date(a.date.split('-')[0], a.date.split('-')[1] - 1, a.date.split('-')[2]).getTime() -
                    new Date(b.date.split('-')[0], b.date.split('-')[1] - 1, b.date.split('-')[2]).getTime()
            );
        }

        return res.json(resData);
    });
});

module.exports = router;
