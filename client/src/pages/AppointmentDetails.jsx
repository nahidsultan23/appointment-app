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
                <div className="appointment-details-area">
                    <div className="content-title">
                        <h1>Appointment Details</h1>
                    </div>
                    <table className="table table-striped table-dark">
                        <tbody>
                            <tr>
                                <th scope="col">Appointment ID</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th scope="col">Appointment Time</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th scope="col">Booked by</th>
                                <td>
                                    <div className="booked-by"></div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="col">Booked on</th>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment>
    );
};

export default AppointmentDetails;
