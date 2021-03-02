import React, { Fragment } from 'react'
import logo from '../images/logo.svg'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';



function Header(props) { // props header define
    const handleLogout = e => {
        e.preventDefault();
        props.logout();
        window.location.reload() // refresh
    };


    return (
        <div>
            <nav className="navbar">
                <ul className="nav__list-ul">
                    {!props.loggedIn ? ( // verif non logged


                        //// navbar avec user non logged
                        <Fragment>
                            <li className="nav__list-li logo">
                                <Link to={'/'} >
                                    <img src={logo} alt="logo"></img>
                                </Link>
                            </li>
                            <li className="nav__list-li">
                                <Link to={'/login'} >
                                    <Button className="navbar__style">
                                        <h2 className="hover navbar__style">Connexion</h2>
                                    </Button>
                                </Link>
                            </li>

                            <li className="nav__list-li">
                                <Link to={'/register'} className="navbar__style">
                                    <Button className="navbar__style">
                                        <h2 className="hover navbar__style">Inscription</h2>
                                    </Button>
                                </Link>
                            </li>
                        </Fragment>
                    ) : (





                            // navbar avec user loggedin 
                            <nav className="navbar">
                                <ul className="nav__list-ul">
                                    <li className="nav__list-li logo">
                                        <Link to={'/'} >
                                            <img src={logo} alt="logo"></img>
                                        </Link>
                                    </li>
                                    <li className="nav__list-li">
                                        <Link to={'/messages'} className="navbar__style">
                                            <Button className="navbar__style">
                                                <h2 className="hover navbar__style">Tableau de bord</h2>
                                            </Button>
                                        </Link>
                                    </li>
                                    <li className="nav__list-li">
                                        <Link to={'/messages/new'} className="navbar__style">
                                            <Button className="navbar__style">
                                                <h2 className="hover navbar__style">Nouveau message</h2>
                                            </Button>
                                        </Link>
                                    </li>
                                    <li className="nav__list-li">
                                        <Link to={'/userprofile'} className="navbar__style">
                                            <Button className="navbar__style">
                                                <h2 className="hover navbar__style">Profil</h2>
                                            </Button>
                                        </Link>
                                    </li>
                                    <li className="nav__list-li">
                                        <Link to={'/login'} className="navbar__style" onClick={handleLogout}>
                                            <Button className="navbar__style">
                                                <h2 className="hover navbar__style">Déconnexion</h2>
                                            </Button>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        )}
                </ul>
            </nav>

        </div>
    )
}


// map state loggedin via auth
const mapStateToProps = state => { 
    return {
        loggedIn: state.auth.loggedIn
    };
};

// mise à dispo props
const mapDispatchToProps = dispatch => { 
    return {
        logout: () => dispatch({ type: "SET_LOGOUT" })
    };
};

// maise à disposition maps
export default connect( 
    mapStateToProps,
    mapDispatchToProps
)(Header);