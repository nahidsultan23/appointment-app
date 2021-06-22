import React, { useEffect, useState } from 'react';

import { getAppointmentData } from '../actions/homeActions';

const Home = (props) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setLoading(true);

        const result = getAppointmentData();

        result
            .then((res) => {
                if (res.success) {
                    let dateNday = [];
                    let hr0Data = [];
                    let hr1Data = [];
                    let hr2Data = [];
                    let hr3Data = [];
                    let hr4Data = [];

                    for (let i = 0; i < res.data.length; i++) {
                        dateNday.push({
                            date: res.data[i].date,
                            day: res.data[i].day,
                            dayName: res.data[i].dayName,
                        });

                        hr0Data.push({
                            data: res.data[i].hourData.hr0,
                            day: res.data[i].day,
                            dayName: res.data[i].dayName,
                            date: res.data[i].date,
                            time: '08:00 - 10:00',
                        });
                        hr1Data.push({
                            data: res.data[i].hourData.hr1,
                            day: res.data[i].day,
                            dayName: res.data[i].dayName,
                            date: res.data[i].date,
                            time: '10:00 - 12:00',
                        });
                        hr2Data.push({
                            data: res.data[i].hourData.hr2,
                            day: res.data[i].day,
                            dayName: res.data[i].dayName,
                            date: res.data[i].date,
                            time: '14:00 - 16:00',
                        });
                        hr3Data.push({
                            data: res.data[i].hourData.hr3,
                            day: res.data[i].day,
                            dayName: res.data[i].dayName,
                            date: res.data[i].date,
                            time: '16:00 - 18:00',
                        });
                        hr4Data.push({
                            data: res.data[i].hourData.hr4,
                            day: res.data[i].day,
                            dayName: res.data[i].dayName,
                            date: res.data[i].date,
                            time: '18:00 - 20:00',
                        });
                    }

                    setData({
                        dateNday: dateNday,
                        hr0Data: hr0Data,
                        hr1Data: hr1Data,
                        hr2Data: hr2Data,
                        hr3Data: hr3Data,
                        hr4Data: hr4Data,
                    });

                    setErrorMessage('');
                } else {
                    setData({});
                    setErrorMessage(res.errorMessage);
                }
            })
            .catch((err) => {
                setErrorMessage('Server connection error!');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const bookAppointment = (day, dayName, date, time) => {
        let timeWithoutSpaces = time.replace(/ /g, '');

        let splittedTime = timeWithoutSpaces.split('-');

        let startTime = splittedTime[0].replace(':', '-');
        let endTime = splittedTime[1].replace(':', '-');

        let queryString = '?start=' + date + 'T' + startTime + '&end=' + date + 'T' + endTime;

        //as the 'day' and 'dayName' are prepared by the server, I am sending them through the 'sate'.
        //to show data extraction from 'search', the 'date' and 'timeRange' will be extracted from it in the '/appointment/new' page.

        props.history.push({
            pathname: '/appointment/new',
            search: queryString,
            state: {
                day: day,
                dayName: dayName,
            },
        });
    };

    const renderDates = () => {
        if (data && data.dateNday && data.dateNday.length) {
            return data.dateNday.map((singleData) => {
                return (
                    <th scope="col" key={singleData.dayName}>
                        {singleData.dayName}, {singleData.day}
                    </th>
                );
            });
        }
    };

    const renderDateData = (hr) => {
        if (data && data[hr] && data[hr].length) {
            return data[hr].map((singleData, index) => {
                return (
                    <td key={index}>
                        {singleData && singleData.data ? (
                            singleData.data === 'unavailable' ? (
                                <div className="unavailable">Unavailable</div>
                            ) : (
                                <div className="name">{singleData.data.name}</div>
                            )
                        ) : (
                            <div
                                className="available"
                                onClick={() => {
                                    bookAppointment(singleData.day, singleData.dayName, singleData.date, singleData.time);
                                }}
                            >
                                -
                            </div>
                        )}
                    </td>
                );
            });
        }
    };

    return (
        <React.Fragment>
            <div className="homepage">
                {loading ? (
                    <div className="spinner-border text-info" role="status">
                        <span className="sr-only"></span>
                    </div>
                ) : errorMessage ? (
                    <div className="error-message">
                        <h1>{errorMessage}</h1>
                    </div>
                ) : (
                    <div className="appointment-table">
                        <div className="content-title">
                            <h1>Week Schedule</h1>
                        </div>
                        <table className="table table-striped table-dark">
                            <thead>
                                <tr>
                                    <th scope="col">Hours</th>
                                    {renderDates()}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">08:00 - 10:00</th>
                                    {renderDateData('hr0Data')}
                                </tr>
                                <tr>
                                    <th scope="row">10:00 - 12:00</th>
                                    {renderDateData('hr1Data')}
                                </tr>
                                <tr>
                                    <th scope="row">12:00 - 14:00</th>
                                    <td>
                                        <div className="unavailable">Unavailable</div>
                                    </td>
                                    <td>
                                        <div className="unavailable">Unavailable</div>
                                    </td>
                                    <td>
                                        <div className="unavailable">Unavailable</div>
                                    </td>
                                    <td>
                                        <div className="unavailable">Unavailable</div>
                                    </td>
                                    <td>
                                        <div className="unavailable">Unavailable</div>
                                    </td>
                                    <td>
                                        <div className="unavailable">Unavailable</div>
                                    </td>
                                    <td>
                                        <div className="unavailable">Unavailable</div>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">14:00 - 16:00</th>
                                    {renderDateData('hr2Data')}
                                </tr>
                                <tr>
                                    <th scope="row">16:00 - 18:00</th>
                                    {renderDateData('hr3Data')}
                                </tr>
                                <tr>
                                    <th scope="row">18:00 - 20:00</th>
                                    {renderDateData('hr4Data')}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </React.Fragment>
    );
};

export default Home;
