import React, { useEffect, useState } from 'react';

import { getAppointmentDetails } from '../actions/appointmentActions';

const AppointmentDetails = (props) => {
    if (!props.match.params.id) {
        props.history.push('/appointments');
    }

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setLoading(true);
        const result = getAppointmentDetails(props.match.params.id);

        result
            .then((res) => {
                if (res.success) {
                    setData(res.data);
                    setErrorMessage('');
                } else {
                    setData([]);
                    setErrorMessage(res.errorMessage);
                }
            })
            .catch((err) => {
                setErrorMessage('Server connection error!');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [props.match.params]);

    return (
        <React.Fragment>
            <div className="appointment-details">
                {loading ? (
                    <div className="spinner-border text-info" role="status">
                        <span className="sr-only"></span>
                    </div>
                ) : errorMessage ? (
                    <div className="error-message">
                        <h1>{errorMessage}</h1>
                    </div>
                ) : (
                    <div className="appointment-details-area">
                        <div className="content-title">
                            <h1>Appointment Details</h1>
                        </div>
                        <table className="table table-striped table-dark">
                            <tbody>
                                <tr>
                                    <th scope="col">Appointment ID</th>
                                    <td>{data.id}</td>
                                </tr>
                                <tr>
                                    <th scope="col">Appointment Date</th>
                                    <td>{data.appointmentDate}</td>
                                </tr>
                                <tr>
                                    <th scope="col">Week Day</th>
                                    <td>{data.dayName}</td>
                                </tr>
                                <tr>
                                    <th scope="col">Appointment Time</th>
                                    <td>{data.timeRange}</td>
                                </tr>
                                <tr>
                                    <th scope="col">Booked by</th>
                                    <td>
                                        <div className="booked-by">{data.name}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="col">Booked on</th>
                                    <td>
                                        {data.date} at {data.time}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </React.Fragment>
    );
};

export default AppointmentDetails;
