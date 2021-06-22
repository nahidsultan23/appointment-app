import axios from 'axios';

export async function bookAppointment(obj) {
    try {
        let response = await axios.post('/api/appointment', obj);

        if (response && response.data) {
            return response.data;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function getAllAppointments() {
    try {
        let response = await axios.get('/api/appointments');

        if (response && response.data) {
            return response.data;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
    }
}
