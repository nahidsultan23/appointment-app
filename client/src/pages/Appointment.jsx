import React from 'react';

const Appointment = () => {
    return (
        <React.Fragment>
            <div className="appointment">
                <div className="appointment-form">
                    <div className="content-title">
                        <h1>New Appointment</h1>
                    </div>
                    <div className="date-area">
                        <h5>Date:</h5>
                    </div>
                    <form>
                        <div>
                            <div className="form-group row">
                                <label htmlFor="inputNameTitle" className="col-sm-4 col-form-label">
                                    Attendee Name
                                </label>
                                <div className="col-sm-8">
                                    <input type="text" name="name" className="form-control" placeholder="Type your name" required={true} />
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
