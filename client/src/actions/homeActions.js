import axios from 'axios';

export async function getAppointmentData() {
    try {
        let response = await axios.get('/api/home');

        if (response && response.data) {
            return response.data;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
    }
}
