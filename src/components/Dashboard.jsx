// Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Dashboard = () => {
    const [totalOrphans, setTotalOrphans] = useState(null);
    const [widowCount, setWidowCount] = useState(0);
    const [elderCount, setElderCount] = useState(0);
    const [staffCount, setStaffCount] = useState(0);
    const [eventCount, setEventCount] = useState(0);


    useEffect(() => {
        // Fetch staff count
        const fetchStaffCount = async () => {
            try {
                const response = await axios.get('https://kim.nuwarisha.org/public/api/bookscount');
                setStaffCount(response.data.number_of_books);
            } catch (error) {
                console.error('Error fetching users count:', error);
            }
        };

        fetchStaffCount();
    }, []);

    useEffect(() => {
        // Fetch event count
        const fetchEventCount = async () => {
            try {
                const response = await axios.get('https://kim.nuwarisha.org/public/api/userscount');
                setEventCount(response.data.number_of_users);
            } catch (error) {
                console.error('Error fetching event count:', error);
            }
        };

        fetchEventCount();
    }, []);

    return (
        <div>
            <div className="page-wrapper">
                {/* Breadcrumb */}
                <div className="page-breadcrumb">
                    <div className="row">
                        <div className="col-12 d-flex no-block align-items-center">
                            <h4 className="page-title">Dashboard</h4>
                            <div className="ms-auto text-end">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                    <li className="breadcrumb-item">Dashboard </li>
                                        <li className="breadcrumb-item active" aria-current="page"></li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Main content of the Dashboard */}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 col-lg-6 col-xlg-3">
                            <div className="card card-hover">
                                <div className="box bg-secondary text-center">
                                    <h1 className="font-light text-white">{staffCount}</h1>
                                    <h6 className="text-white">Books</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xlg-3">
                            <div className="card card-hover">
                                <div className="box bg-primary text-center">
                                    <h1 className="font-light text-white">{eventCount}</h1>
                                    <h6 className="text-white">Users</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
