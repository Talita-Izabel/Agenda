import verifyAuth from '../../../middlewares/verifyAuth'
import { CreateEventController } from '../controller/CreateEventController'
import { DeleteEventController } from '../controller/DeleteEventController'
import { GetCalendarsController } from '../controller/GetCalendarsController'
import { GetEventsController } from '../controller/GetEventsController'
import { UpdateEventController } from '../controller/UpdateEventController'

const Router = require('express')
const router = Router()

router.get('/list/events', verifyAuth, async (req, res) => {
  try {
    let events = await GetEventsController.handle(req)
    res.status(events.statusCode).json({ ...events })
  } catch (error) {
    console.error(error)
  }
})

router.get('/list/calendars', verifyAuth, async (req, res) => {
  try {
    let events = await GetCalendarsController.handle(req)
    res.status(events.statusCode).json({ ...events })
  } catch (error) {
    console.error(error)
  }
})

router.post('/create/event', verifyAuth, async (req, res) => {
  try {
    let events = await CreateEventController.handle(req)
    res.status(events.statusCode).json({ ...events })
  } catch (error) {
    console.error(error)
  }
})

router.put('/update/event/:eventId', verifyAuth, async (req, res) => {
  try {
    let events = await UpdateEventController.handle(req)
    res.status(events.statusCode).json({ ...events })
  } catch (error) {
    console.error(error)
  }
})

router.delete('/delete/event/:eventId', verifyAuth, async (req, res) => {
  try {
    let events = await DeleteEventController.handle(req)
    res.status(events.statusCode).json({ ...events })
  } catch (error) {
    console.error(error)
  }
})

export default router
