import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/auth.module.css';

const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = e => setFormData({...formData, [e.target.id]: e.target.value });
    
    const onSubmit = async e => { 
        e.preventDefault();
        console.log('Success');
    }

    return(
        <div className = {`container ${styles.container}`}>
            <h3>Prijava</h3>
            <br></br>
            <form className = "form" onSubmit = { e => onSubmit(e) }>
                <div className="form-group">
                    <label htmlFor="InputEmail">Email</label>
                    <input type="email" 
                        className="form-control" 
                        id="email" 
                        placeholder="Unesite mail"
                        value = {email}
                        onChange = { e => onChange(e) }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="InputPassword">Lozinka</label>
                    <input type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Unesite lozinku"
                        value = {password}
                        onChange = { e => onChange(e) }
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <br></br>
            <h6>Nemate profil? Registrirajte se <Link to = '/register'>ovdje</Link>.</h6>
        </div>
    )
}

export default Login