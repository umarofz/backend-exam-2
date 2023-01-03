import { read } from "../utils/model.js"
import crypto from 'crypto'
import jwt from '../utils/jwt.js'

const POST = (req, res) => {
    try {
        let { login, password } = req.body;
        let admins = read('admins');

        let admin = admins.find(item => item.login == login && item.password == crypto.createHash('sha256', 'olma').update(password).digest('hex'))
        console.log(admin);
        if (admin) {
            return res.status(200).json({
                status: 200,
                message: 'success',
                token: jwt.sign(admin)
            })
        }

        return res.status(400).json({
            status: 400,
            message: 'Login or password invalid'
        })
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}

export default {
    POST
}