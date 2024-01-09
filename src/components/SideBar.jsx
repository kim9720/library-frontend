import React from 'react';
import { Link } from 'react-router-dom';


const SideBar = () => {
  return (
    <aside className="left-sidebar" data-sidebarbg="skin5">
      <div className="scroll-sidebar">
        <nav className="sidebar-nav">
          <ul id="sidebarnav" className="pt-4">
            <li className="sidebar-item">
              <Link
                to="/dashboard"
                className="sidebar-link waves-effect waves-dark sidebar-link"
                style={{ textDecoration: 'none' }}
                aria-expanded="false"
              >
                <i className="mdi mdi-view-dashboard"></i>
                <span className="hide-menu">Dashboard</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link
                to="/books"
                className="sidebar-link waves-effect waves-dark sidebar-link"
                style={{ textDecoration: 'none' }}
                aria-expanded="false"
              >
                <i className="mdi mdi-book"></i>
                <span className="hide-menu">Books</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link
                to="/users"
                className="sidebar-link waves-effect waves-dark sidebar-link"
                style={{ textDecoration: 'none' }}
                aria-expanded="false"
              >
                <i className=" mdi mdi-account-multiple"></i>

                <span className="hide-menu">Users</span>
              </Link>
            </li>



          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;
