import React from 'react'

export default function Books() {
    return (
        <div className="page-wrapper">
            <div className="page-breadcrumb">
                <div className="row">
                    <div className="col-12 d-flex no-block align-items-center">
                        <h4 className="page-title">Books</h4>
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
        </div>
    )
}
