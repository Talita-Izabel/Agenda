import Bot from '../../../utils/Bot'
import { updateEvent } from '../../../utils/ScheduleEvents'

const { google } = require('googleapis')

export class UpdateEventService {
  static async execute(auth, body, eventId) {
    try {
      const calendar = google.calendar({ version: 'v3', auth })

      let res = await calendar.events.update({
        auth,
        eventId,
        calendarId: 'primary',
        resource: body,
      })

      let start = body.start.date || body.start.dateTime
      start = start.split('T')[0]

      let end = body.end.date || body.end.dateTime
      end = end.split('T')[0]

      // Envia mensagem para o bot
      let text = `Evento '${body.summary}' atualizado!\n${body.description}\nInício: ${start}\nFim: ${end}`
      await Bot.sendMessage(text)

      updateEvent()
      console.log(res)
      return res
    } catch (error) {
      console.error(error)
      return { error }
    }
  }
}
