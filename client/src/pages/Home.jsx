import React from 'react';

const Home = () => {
    return (
        <React.Fragment>
            <div className="homepage">
                <div className="appointment-table">
                    <div className="content-title">
                        <h1>Week Schedule</h1>
                    </div>
                    <table className="table table-striped table-dark">
                        <thead>
                            <tr>
                                <th scope="col">Hours</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">08:00 - 10:00</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <th scope="row">10:00 - 12:00</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
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
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <th scope="row">16:00 - 18:00</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <th scope="row">18:00 - 20:00</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Home;
