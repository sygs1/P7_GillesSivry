import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

function Footer() {
    return (
        <div>
            <footer className="footer">
                <div>
                    <Link to={'/adminlogin'} >
                        <Button className="navbar__style">
                            <h2 className="hover navbar__style">Connexion Modérateur</h2>
                        </Button>
                    </Link>
                </div>
            </footer>
        </div>
    )
}

export default Footer

