import React, { useEffect, useState } from 'react';

import { bookAppointment } from '../actions/appointmentActions';

const Appointment = (props) => {
    if (!(props.location.search && props.location.state)) {
        props.history.push('/home');
    }

    const [date, setDate] = useState('');
    const [timeRange, setTimeRange] = useState('');
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    //the 'day' (e.g: 21st, 23rd, etc.) and 'dayName' (e.g: Sunday, Wednesday, etc.) are prepared by the server.
    //preparing them again from the 'search' query will be repeating those processes as they have already been done in the server.
    //So, these two have been sent through the 'state'.
    //to show data extraction from 'search', the 'date' and 'timeRange' will be extracted from it.

    useEffect(() => {
        if (props.location.search) {
            let urlSearchParams = new URLSearchParams(props.location.search);
            let params = Object.fromEntries(urlSearchParams.entries());

            let date = params.start.split('T')[0];

            setDate(date);

            let startTime = params.start.split('T')[1].replace('-', ':');
            let endTime = params.end.split('T')[1].replace('-', ':');

            let timeRange = startTime + ' - ' + endTime;

            setTimeRange(timeRange);
        }
    }, [props.location.search]);

    const submitForm = (e) => {
        e.preventDefault();

        let requestObject = {
            date: date,
            timeRange: timeRange,
            name: name,
        };

        const result = bookAppointment(requestObject);

        result
            .then((res) => {
                if (res.success) {
                    props.history.push('/home');
                } else {
                    setErrorMessage(res.errorMessage);
                }
            })
            .catch((err) => {
                setErrorMessage('Server connection error!');
            });
    };

    return (
        <React.Fragment>
            <div className="appointment">
                <div className="appointment-form">
                    <div className="content-title">
                        <h1>New Appointment</h1>
                    </div>
                    {props && props.location && props.location.state ? (
                        <div className="date-area">
                            <h5>
                                Date: {props.location.state.dayName}, {props.location.state.day} - {timeRange}
                            </h5>
                        </div>
                    ) : (
                        ''
                    )}
                    <form
                        onSubmit={(e) => {
                            submitForm(e);
                        }}
                    >
                        <div>
                            <div className="form-group row">
                                <label htmlFor="inputNameTitle" className="col-sm-4 col-form-label">
                                    Attendee Name
                                </label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="Type your name"
                                        required={true}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="button-area">
                                <button type="submit" className="btn btn-primary mb-2">
                                    Create Appointment
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Appointment;
