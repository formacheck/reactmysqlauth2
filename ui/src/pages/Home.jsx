import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css'

const Home = () => {
    const [auth, setAuth] = useState(false)
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    useEffect(() => {
        axios.get('http://localhost:8080')
            .then(res => {
                if (res.data.status === "success") {
                    setAuth(true)
                    setName(res.data.uname)
                } else {
                    setAuth(false)
                    setMessage(res.data.Message)
                }
            })
    }, [])


    const handleLogout = () => {
        axios.get('http://localhost:8080/logout')
            .then(res => {
                if (res.data.status === "success") {
                    location.reload(true)
                } else {
                    alert("error")
                }
            }).catch(err => console.log(err))
    }


    return (
        <div className='card'>
            {
                auth ?
                    <div>
                        you are authorized {name}
                        <button onClick={handleLogout}>logout</button>
                    </div>
                    :
                    <div>
                        login now {message}
                        <button>login</button>
                    </div>
            }
        </div>
    )
}

export default Home