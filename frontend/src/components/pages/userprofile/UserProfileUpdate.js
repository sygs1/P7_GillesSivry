import React, { useState } from 'react';
import Header from '../../../components/headers/Header';
import axios from 'axios'
import UserProfileInfo from './UserProfileInfo';
import * as Components from '../../../materialui/Imports'

//User can update his profil info
function UserProfileUpdate() {

    //Set state
    const [state, setState] = useState({
        id: "",
        email: "",
        pseudo: "",
        //bio: ""
    })

    //HandleInput for form
    const handleInput = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }
    //Updates the profile 
    const handleForm = e => {
        e.preventDefault();
        const data = {
            "id": state.id,
            "email": state.email,
            "pseudo": state.pseudo,
           // "bio": state.bio,
        };
        axios
            .put("http://localhost:3000/api/auth", data)
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(e => this.setState({ errors: e.response.data }));
    };

    return (
        <div className="App">
            <Header />
            <UserProfileInfo />
            <main className="message-box">
                <div className="form ">
                    <h3>Modifier votre profil</h3>
                    <Components.Paper elevation={6} className="messagBox-flex-profil" >
                        <div className='profil'>
                            <form onSubmit={handleForm}  >
                                <div>pseudo</div>
                                <Components.TextareaAutosize
                                    type="text"
                                    name="pseudo"
                                    id="pseudo"
                                    placeholder="pseudo"
                                    maxLength="10"
                                    variant="outlined"
                                    className="form__input-title"
                                    value={state.pseudo}
                                    onChange={handleInput} />
                                <div>Email</div>
                                <Components.TextareaAutosize
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="email"
                                    maxLength="20"
                                    variant="outlined"
                                    className="form__input-title"
                                    value={state.email}
                                    onChange={handleInput} />
                                
                                <div className="form__button-comment">
                                    <Components.Button
                                        type="submit"
                                        id="submit"
                                        variant="contained"
                                        color="primary">
                                        VALIDER</Components.Button>
                                </div>
                            </form>
                        </div>
                    </Components.Paper>
                </div>
            </main>
        </div>
    )
}

export default UserProfileUpdate