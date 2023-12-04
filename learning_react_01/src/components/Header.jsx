import React from 'react'

export default function Header(props) {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-color container-fluid">
                <a className="navbar-brand me-2" href="/">
                    {/* <i className="fa-regular fa-message-smile"></i> */}
                    <h1 className='ms-4'>Keeper</h1>
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#keeperNav"
                    aria-controls="keeperNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <i className="fas fa-bars"></i>
                </button>

                <div className="collapse navbar-collapse" id="keeperNav">

                    <div className="d-flex align-items-center ms-auto">
                        <button type="button" className="btn btn-link px-3 me-2">
                            Login
                        </button>
                        <button type="button" className="btn btn-primary me-3">
                            Sign up for free
                        </button>
                    </div>
                </div>
            </nav>
        </div >
    )
}
