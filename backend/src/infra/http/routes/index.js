import calendarRoutes from '../../../modules/calendar/routes'
import botRoutes from '../../../modules/bot/routes'

export default function setupRoutes(app) {
  app.get('/health', (req, res) => {
    res.status(200).send({ result: 'live' })
  })

  app.use('/calendar', calendarRoutes)
  app.use('/bot', botRoutes)
}
