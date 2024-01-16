import React from 'react'
import UserTable from './UserTable'

export default function Users() {
  return (
    <div className="page-wrapper">
    <div className="page-breadcrumb">
        <div className="row">
            <div className="col-12 d-flex no-block align-items-center">
                <h4 className="page-title">Users</h4>
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
    <UserTable/>

</div>
  )
}
