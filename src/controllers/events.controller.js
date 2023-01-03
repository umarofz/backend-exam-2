import { read, write } from '../utils/model.js';
import path from 'path'

const GET = (req, res) => {
    try {
        let { eventId } = req.params
        let events = read('events')
        
        if (req.url == `/events/${eventId}` && req.method == 'GET') {
            let event = events.find(item => item.eventId == eventId)
            
            return res.status(200).json({
                status: 200,
                message: `${eventId} event`,
                data: event
            })
        }

        events = events.filter(event => event.status == "approved")
        
        return res.status(200).json({
            status: 200,
            message: 'all events',
            data: events
        })
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}


const POST = (req, res) => {
    try {
        const events = read('events')
        const expect = read('expect')
        const { date, time, category, subCategory, type, link, owner, proffesion, tel, description, body } = req.body;
        const { image } = req.files;
        
        
        let fileName = Date.now() + image.name.replace(/\s/g, '')
        image.mv(path.resolve('uploads', fileName))
        
        let newEvent = {
            eventId: expect.at(-1)?.eventId + 1 || 1,
            image: fileName,
            description,
            owner,
            proffesion,
            date,
            time,
            status: 'waiting',
            views: 0,
            type,
            category,
            subCategory,
            link,
            tel,
            body
        }
        
        expect.push(newEvent)
        write('expect', expect)
        
        return res.status(201).json({
            status: 201,
            message: 'added',
            data: newEvent
        })
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: error.message,
        })
    }
}

export default {
    GET,
    POST
}