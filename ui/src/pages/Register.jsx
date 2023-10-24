import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import validation1 from './validation1'
import axios from 'axios'
import '../App.css'

const Register = () => {

    const [errors, setErrors] = useState({})

    const [values, setValues] = useState({
        uname: '',
        email: '',
        password: ''
    })

    const handleChange = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
    }

    navigator = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validation1(values))
        if (errors.uname === "" && errors.email === "" && errors.password === "") {
            axios.post('http://localhost:8080/signup', values)
                // .then(res => console.log(res)) testing
                .then(res => {
                    Navigate('/login')
                })
                .catch(err => console.log(err))
        }
    }

    return (

        <div className='card'>
            <p>register</p>
            <form>
                <input type='text' name='uname' onChange={handleChange} placeholder='enter uname' />
                {errors.uname && <span>{errors.uname}</span>}
                <br />
                <input type='email' name='email' onChange={handleChange} placeholder='enter email' />
                {errors.email && <span>{errors.email}</span>}
                <br />
                <input type='password' name='password' onChange={handleChange} placeholder='*********' />
                {errors.password && <span>{errors.password}</span>}
                <br />
                <Link to={"/login"}>login</Link> <br /><br />
                <button type='submit' onClick={handleSubmit}>register</button>
            </form>
        </div>

    )
}

export default Register