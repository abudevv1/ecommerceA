const { hashSync, compareSync } = require('bcrypt')
const db = require("../config/db.config")
const { sign } = require('jsonwebtoken')
const env = require("../config/env.config")
const jwt = require('jsonwebtoken')

async function register(req, res) {
    try {
        const { name, last_name, phone, email, password } = req.body
        const query = "SELECT * FROM users WHERE email = ?"
        const [[user]] = await db.query(query, email)
        if (user) {
            const error = new Error(`user with email:${email}`)
            error.status = 406;
            throw error
        }
        const hashedPassword = hashSync(password, 1)
        const paramObj = {
            name,
            last_name,
            phone,
            email,
            password: hashedPassword
        }
        const [{ insertId }] = await db.query("INSERT INTO users SET ?", paramObj)
        const accesToken = sign({ id: insertId, role: 'user' }, env.ACCES_TOKEN_SECRET, { expiresIn: "60s" })
        const refreshToken = sign({ id: insertId, role: 'user' }, env.REFRESH_TOKEN_SECRET, { expiresIn: "60s" })
        res.json({ refreshToken, accesToken })
    } catch (error) {
        console.error(error.message)
        res.status(error.status || 500).json({ error: 'cannot create user:' + error.message })
    }
}
async function login(req, res) {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            const error = new Error("Email and password fields must be provided")
            error.status = 400
            throw error
        } 
        const [[user]] = await db.query("SELECT * FROM users WHERE email = ?", email)
        if (!user) {
            const error = new Error(`user with email:${email} not found `)
            error.status = 404;
            throw error
        }
        const isRightPassword = compareSync(password, user.password)
        if (!isRightPassword) {
            const error = new Error('wrong email or/and password')
            error.status = 400
            throw error
        }
        const accesToken = sign({ id: user.id, role: user.role }, env.ACCESS_TOKEN_SECRET, { expiresIn: "60s" })
        const refreshToken = sign({  id: user.id, role: user.role  }, env.REFRESH_TOKEN_SECRET, { expiresIn: "60s" })
        const hashedRefreshToken = hashSync(refreshToken, 1)
        await db.query('UPDATE users SET refresh_token = ? WHERE id = ?', [hashedRefreshToken, user.id])
        res.json({ refreshToken, accesToken })
    } catch (error) {
        res.send({ error: error.message })
    }
}
async function refresh(req, res) {
    const { refreshToken: refreshTokenFromClient } = req.body
    if (!refreshTokenFromClient) {
        const error = new Error
    }
}
async function logout(req, res) {

}
module.exports = {
    register,
    refresh,
    login,
    logout
}
