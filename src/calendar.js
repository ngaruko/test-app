import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const {sendEmail} = require('./service');


const Calendar = () => {
    const location = useLocation();
    const { email } = location.state || {}
    const [appointments, setAppointments] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', date: '', time: '' });

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const saveAppointment = (req, res) => {
        const { name, date, time } = formData;
        if (!name || !date || !time) {
            alert('Please fill in all fields');
            return;
        }

        setAppointments((prevAppointments) => ({
            ...prevAppointments,
            [date]: [...(prevAppointments[date] || []), { name, time }]
        }));

        // Display toast notification
        toast.success('Appointment saved successfully!');

        setIsModalOpen(false);
        setFormData({ name: '', date: '', time: '' });
        sendEmail(email, {name, date, time})
        res.status(200).send('Email sent')
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setFormData({ name: '', date: '', time: '' });
    };

    return (
          
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '2px solid #ccc' }}>
            <div id="app-name">My app</div>
            <div><input className={'inputButton'} type="button" onClick={setIsModalOpen} value={'New Appointment'} /></div>
            
            {email? <div id="username">{email }</div>:<div id="username">Anonymous</div>}
             </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        {daysOfWeek.map((day) => (
                            <th key={day} style={headerStyle}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {daysOfWeek.map((day) => (
                            <td key={day} style={cellStyle}>
                                {appointments[day] && appointments[day].map((appt, index) => (
                                    <div key={index} style={{ marginBottom: '8px', backgroundColor:'grey' }}>
                                        <p id="apt-time">{appt.time}:00 -{appt.time}:30 </p>
                                        <p id= "apt-name">{appt.name}</p> 
                                    </div>
                                ))}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>

            {isModalOpen && (
                <div style={modalStyle}>
                    <h2>New Appointment</h2>
                    <div>
                        <label>
                            Appointment Name:
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Date (e.g., Monday):
                            <input
                                type="text"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Time (e.g., 14:00):
                            <input
                                type="text"
                                name="time"
                                value={formData.time}
                                onChange={handleInputChange}
                            />
                        </label>
                    </div>
                    <div>
                        <button onClick={saveAppointment}>Save</button>
                        <a href="#" onClick={handleCancel} style={cancelLinkStyle}>Cancel</a>
                    </div>
                </div>
            )}
                        <ToastContainer position="bottom-right"  autoClose={6000} hideProgressBar={false} />

        </div>
    );
};

const headerStyle = {
    border: '1px solid black',
    backgroundColor: '#f2f2f2',
    padding: '8px',
    textAlign: 'left',
};

const cellStyle = {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'left',
    height: '100px',
    verticalAlign: 'top',
};

const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    backgroundColor: 'white',
    border: '1px solid black',
    zIndex: 1000,
};

const cancelLinkStyle = {
    marginLeft: '10px',
    color: 'blue',
    cursor: 'pointer',
};


export default Calendar