import { eventSchema, loginSchema } from "../validate/events.validate.js"

export default (req, res, next) => {
    try {
        if(req.url == '/events' && req.method == 'POST'){
            let {error} =  eventSchema.validate({...req.body, image: req.files.image.name})
            if (error) throw error
        }

        if (req.url == '/admin/login' && req.method == 'POST') {
            let {error} = loginSchema.validate(req.body)
            if(error) throw error
        }
        
        return next()
    } catch (error) {
        res.status(400).json({
            status:400,
            message:error.message
        })
    }
}