const express = require("express")
const mysql = require("mysql")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors(
    {
        origin: ["http://localhost:5173"],
        methods: ["POST, GET"],
        credentials: true
    }
))



const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db-name"
})

const verifyuser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Message: "provide token" })
    } else {
        jwt.verify(token, "out-jsonwebtoken-secret-key", (err, decoded) => {
            if (err) {
                return res.json({ Message: "authentication error" })
            } else {
                req.uname = decoded.uname
                next()
            }
        })
    }
}

app.get('/', verifyuser, (req, res) => {
    return res.json({ status: "success", uname: req.uname })
})

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO users (`uname`,`email`,`password`) VALUES (?)"
    values = [
        req.body.uname,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json("error");
        }
        return res.json(data)
    })
})


app.post('/signin', (req, res) => {
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?"
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) return res.json({ Message: "server side error" });
        if (data.length > 0) {
            const uname = data[0].uname
            const token = jwt.sign({ uname }, "out-jsonwebtoken-secret-key", { expiresIn: '1d' })
            res.cookie('token', token)
            return res.json({ status: "success" })
        } else {
            return res.json({ Message: "no record existed" });
        }
    })
})


app.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({ status: "success"})
})


app.listen(8080, () => {
    console.log("listening")
})