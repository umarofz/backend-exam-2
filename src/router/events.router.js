import { Router } from "express";
import eventsController from "../controllers/events.controller.js";
import status from "../middlewares/status.js";
import validate from "../middlewares/validate.js";

const router = Router()
router.get('/events', eventsController.GET)
router.get('/events/queue/:eventId', status, eventsController.GET)
router.get('/events/:eventId', eventsController.GET)
router.post('/events', validate, eventsController.POST)

export default router