import React from 'react';

const AppointmentDetails = () => {
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
