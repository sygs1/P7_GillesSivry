//Imports

import React, { useState } from 'react';
import Header from '../../headers/Header';
import Footer from '../../headers/Footer';
import { Link } from "react-router-dom";
import axios from "axios";
import { withRouter } from "react-router-dom";
import * as Components from '../../../materialui/Imports'
import logo from '../../../images/icon-left-font-monochrome-black.png'


/**Register function **/

function Register(props) {

    //Set state
    const [state, setState] = useState({
        email: "",
        password: "",
        pseudo: "",
        successMessage: null
    })

    //HandleChange for form
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    //HandleSubmitClick - Creates new user, stores it in DB and redirects to Login page
    const handleSubmitClick = (e) => {
        /*if(state.email.length && state.password.length) {
            props.showError(null);}*/
        const payload = {
            "email": state.email,
            "pseudo": state.pseudo,
            "password": state.password,
        }
        axios.post("http://localhost:3000/api/auth/signup", payload)
            .then(function (response) {
                if (response.status === 201) {
                    setState(prevState => ({
                        ...prevState,
                        'successMessage': 'Registration successful. Redirecting to home page..'
                    }))
                    props.history.push('/login')
                } else {
                    console.log(response)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        e.preventDefault();
    }

    return (
        <div className="App">
            <section id="main-container">
                <Header />
                <main>
                    <Components.Paper elevation={9} className="login-box">
                        <section className="message-list">
                            <img src={logo} alt="logo" className="login-logo"></img>
                            <Components.Button color="primary">
                                <p>Inscription</p>
                            </Components.Button>
                            <div>
                                <form className="login__input">
                                    <div>
                                        <Components.TextField
                                            type="pseudo"
                                            name="pseudo"
                                            id="pseudo"
                                            placeholder="pseudo"
                                            value={state.pseudo}
                                            onChange={handleChange}
                                            required />
                                    </div>
                                    <div>
                                        <Components.TextField
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="e-mail*"
                                            value={state.email}
                                            onChange={handleChange}
                                            required />
                                    </div>
                                    <div>
                                        <Components.TextField
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="mot de passe*"
                                            value={state.password}
                                            onChange={handleChange}
                                            required />
                                    </div>
                                    <div className="login__button">
                                        <Components.Button
                                            type="submit"
                                            onClick={handleSubmitClick}
                                            id="submit"
                                            variant="outlined"
                                            color="primary">VALIDER
                                        </Components.Button>
                                    </div>
                                </form>
                                <div className="login__input">
                                    <span>Vous avez déjà un compte? </span>
                                    <Link to={'/login'}>
                                        <Components.Button color="primary">Connectez-vous</Components.Button>
                                    </Link>
                                </div>
                            </div>
                        </section>
                    </Components.Paper>
                </main>
                <Footer />
            </section>
        </div>
    )
}

export default withRouter(Register);