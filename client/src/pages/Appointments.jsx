import React, { useEffect, useState } from 'react';

import { getAllAppointments } from '../actions/appointmentActions';

const Appointments = (props) => {
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

    const appointmentDetails = (id) => {
        props.history.push('/appointments/' + id);
    };

    const renderData = () => {
        if (data && data.length) {
            return data.map((singleData) => {
                return (
                    <tr key={singleData.date}>
                        <th scope="col">{singleData.date}</th>
                        <td>
                            {singleData.hr0 ? (
                                <div
                                    className="name"
                                    onClick={() => {
                                        appointmentDetails(singleData.hr0.id);
                                    }}
                                >
                                    {singleData.hr0.name}
                                </div>
                            ) : (
                                '-'
                            )}
                        </td>
                        <td>
                            {singleData.hr1 ? (
                                <div
                                    className="name"
                                    onClick={() => {
                                        appointmentDetails(singleData.hr1.id);
                                    }}
                                >
                                    {singleData.hr1.name}
                                </div>
                            ) : (
                                '-'
                            )}
                        </td>
                        <td>
                            {singleData.hr2 ? (
                                <div
                                    className="name"
                                    onClick={() => {
                                        appointmentDetails(singleData.hr2.id);
                                    }}
                                >
                                    {singleData.hr2.name}
                                </div>
                            ) : (
                                '-'
                            )}
                        </td>
                        <td>
                            {singleData.hr3 ? (
                                <div
                                    className="name"
                                    onClick={() => {
                                        appointmentDetails(singleData.hr3.id);
                                    }}
                                >
                                    {singleData.hr3.name}
                                </div>
                            ) : (
                                '-'
                            )}
                        </td>
                        <td>
                            {singleData.hr4 ? (
                                <div
                                    className="name"
                                    onClick={() => {
                                        appointmentDetails(singleData.hr4.id);
                                    }}
                                >
                                    {singleData.hr4.name}
                                </div>
                            ) : (
                                '-'
                            )}
                        </td>
                    </tr>
                );
            });
        }
    };

    return (
        <React.Fragment>
            <div className="appointments">
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
                            <tbody>{renderData()}</tbody>
                        </table>
                    </div>
                )}
            </div>
        </React.Fragment>
    );
};

export default Appointments;
