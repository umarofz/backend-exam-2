import { read, write } from "../utils/model.js"
import jwt from './../utils/jwt.js'

export default (req, res, next) => {
    try {
        const expect = read('expect');
        const events = read('events');
        const { eventId } = req.params;
        let { token } = req.headers;
        let check = jwt.verify(token);
        
        if (check) {
            const event = expect.find(item => item.eventId == eventId)
            
            if (event) {
                const index = expect.indexOf(event)
                event.status = "approved"
                event.eventId = events.at(-1)?.eventId + 1 || 1
                let newArr = expect.slice(index, index+1)
                expect.splice(index, index+1)
                
                
                events.push(...newArr)
                write('events', events)
                write('expect', expect)
                res.status(200).json({
                    status:200,
                    message: 'success added to events'
                })
                return next()
            }
        }
        
        return next()
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}