import { Switch, Route, Router } from 'react-router-dom';

import history from './history';

import Navbar from './components/Navbar';

import Home from './pages/Home.jsx';
import Appointment from './pages/Appointment.jsx';
import Appointments from './pages/Appointments.jsx';
import AppointmentDetails from './pages/AppointmentDetails.jsx';
import PageNotFound from './pages/PageNotFound.jsx';

function App() {
    return (
        <div className="App">
            <Router history={history}>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/home" component={Home} />
                    <Route path="/appointment/new" component={Appointment} />
                    <Route path="/appointments/:id" component={AppointmentDetails} />
                    <Route path="/appointments" component={Appointments} />
                    <Route path="/*" component={PageNotFound} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
