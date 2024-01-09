import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
    // Perform any additional actions needed for sidebar toggle
  };

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    // Navigate to the login page
    navigate('/login');
  };

  return (
    <header className="topbar" data-navbarbg="skin5">
      <nav className="navbar top-navbar navbar-expand-md navbar-dark">
        <div className="navbar-header" data-logobg="skin5">
          <Link className="navbar-brand" to="/">
            <b className="logo-icon ps-2"><img src='assets/images/users/nuwarisha_logo.png' width='50px' height='50px' /></b>
            <span className="logo-text">
              <h3>Admin</h3>
            </span>
          </Link>
          <Link className="nav-toggler waves-effect waves-light d-block d-md-none" to="#" onClick={handleSidebarToggle}>
            <i className="ti-menu ti-close"></i>
          </Link>
        </div>
        <div className={`navbar-collapse collapse ${isSidebarOpen ? 'show' : ''}`} id="navbarSupportedContent" data-navbarbg="skin5">
          <ul className="navbar-nav float-start me-auto">
            <li className="nav-item d-none d-lg-block">
              <Link
                className="nav-link sidebartoggler waves-effect waves-light"
                to="#"
                onClick={handleSidebarToggle}
                data-sidebartype="mini-sidebar"
              >
                <i className="mdi mdi-menu font-24"></i>
              </Link>
            </li>

          </ul>
          <ul className="navbar-nav float-end">
          <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle text-muted waves-effect waves-dark pro-pic"
                to="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img src="assets/images/users/1.jpg" alt="user" className="rounded-circle" width="31" />
              </Link>
              <ul className="dropdown-menu dropdown-menu-end user-dd animated" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="#">
                  <i className="ti-user me-1 ms-1"></i> My Profile
                </Link>
                <div className="dropdown-divider"></div>
                <div className="dropdown-divider"></div>
                <Link to="#" className="dropdown-item" onClick={handleLogout}>
                  <i className="fa fa-power-off me-1 ms-1"></i> Logout
                </Link>
                <div className="dropdown-divider"></div>
                
              </ul>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle waves-effect waves-dark"
                to="#"
                id="2"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="font-24 mdi mdi-comment-processing"></i>
              </Link>
              <ul className="dropdown-menu dropdown-menu-end mailbox animated bounceInDown" aria-labelledby="2">
                <ul className="list-style-none">
                  
                  <li>
                    <div className="">
                      <Link to="#" className="link border-top">
                        <div className="d-flex no-block align-items-center p-10">
                          <span className="btn btn-success btn-circle"><i className="ti-calendar"></i></span>
                          <div className="ms-2">
                            <h5 className="mb-0">Event today</h5>
                            <span className="mail-desc">Just Link reminder that event</span>
                          </div>
                        </div>
                      </Link>
                      {/* More messages can be added similarly */}
                    </div>
                  </li>
                </ul>
              </ul>
            </li>
        
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
