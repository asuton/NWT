import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/auth.module.css';

const Register = () => {

    //useState hook slicno kao kod className komponentni
    //formData sluzi za state, setFormData za postavljanje statea
    //odi definiran inicijalan state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    //tipkanjem u polju poziva se setFormData
    //state se azurira na temelju id inputa
    const onChange = e => setFormData({...formData, [e.target.id]: e.target.value });
    
    const onSubmit = async e => { 
        e.preventDefault();
        if(password !== password2 ){
            console.log('Passwords do not match');
        } else {
            console.log('Success');
        }
    }

    return(
        <div className = {`container ${styles.container}`}>
            <h3>Registracija</h3>
            <br></br>
            <form onSubmit = { e => onSubmit(e) }>
                <div className="form-group">
                    <label htmlFor="name">Ime</label>
                    <input type="text" 
                        className="form-control" 
                        id="name" 
                        placeholder="Unesite ime"
                        required
                        value = {name}
                        onChange = { e => onChange(e) }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" 
                        className="form-control" 
                        id="email"
                        placeholder="Unesite email"
                        required
                        value = {email}
                        onChange = { e => onChange(e) }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Lozinka</label>
                    <input type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Unesite lozinku" 
                        minLength = "6"
                        required
                        value = {password}
                        onChange = { e => onChange(e) }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Potvrdite lozinku</label>
                    <input type="password" 
                        className="form-control"
                        id="password2" 
                        placeholder="Potvrdite lozinku" 
                        minLength = "6"
                        required
                        value = {password2}
                        onChange = { e => onChange(e) }
                    />
                </div>
                <button type="submit" value = "submit" className="btn btn-primary">Submit</button>
            </form>
            <br></br>
            <h6>Već ste registrirani? Prijavite se <Link to = '/'>ovdje</Link>.</h6>
        </div>
    )
}

export default Register