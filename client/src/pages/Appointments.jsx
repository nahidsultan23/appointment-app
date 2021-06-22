import React, { useEffect, useState } from 'react';

import { getAllAppointments } from '../actions/appointmentActions';

const Appointments = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setLoading(true);
        const result = getAllAppointments();

        result
            .then((res) => {
                if (res.success) {
                    if (res.data.length) {
                        setData(res.data);
                        setErrorMessage('');
                    } else {
                        setData([]);
                        setErrorMessage('No appointment data to show');
                    }
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
    }, []);

    return (
        <React.Fragment>
            <div className="appointment-table">
                <div className="content-title">
                    <h1>All Appointments</h1>
                </div>
                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Dates</th>
                            <th scope="col">08:00 - 10:00</th>
                            <th scope="col">10:00 - 12:00</th>
                            <th scope="col">14:00 - 16:00</th>
                            <th scope="col">16:00 - 18:00</th>
                            <th scope="col">18:00 - 20:00</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="col"></th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="col"></th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    );
};

export default Appointments;
