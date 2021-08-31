
import React from 'react';

function Header(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand" href="/links">Iron Pocket</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-navbar" aria-controls="main-navbar" aria-expanded="true" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse collapse show" id="main-navbar">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item"><a aria-current="page" className="nav-link active" href="/">Links</a></li>
                    </ul>
                    <span className="navbar-text text-muted">Your brain dump </span>
                </div>
            </div>
        </nav>
    )
}
export default Header;