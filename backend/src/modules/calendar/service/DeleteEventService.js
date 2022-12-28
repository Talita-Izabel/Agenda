import Bot from '../../../utils/Bot'
import { updateEvent } from '../../../utils/ScheduleEvents'

const { google } = require('googleapis')

export class DeleteEventService {
  static async execute(auth, eventId) {
    try {
      const calendar = google.calendar({ version: 'v3', auth })

      let event = await calendar.events.get({
        auth,
        eventId,
        calendarId: 'primary',
      })

      event = event.data

      let res = await calendar.events.delete({
        auth,
        eventId,
        calendarId: 'primary',
      })

      // Envia mensagem para o bot
      let text = `Evento '${event.summary}' deletado!\n${event.description}`
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
