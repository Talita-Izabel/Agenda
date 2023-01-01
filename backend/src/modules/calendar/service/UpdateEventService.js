import Bot from '../../../utils/Bot'
import { updateEvent } from '../../../utils/ScheduleEvents'

const { google } = require('googleapis')

export class UpdateEventService {
  static async execute(auth, body, eventId) {
    try {
      let text
      const calendar = google.calendar({ version: 'v3', auth })

      let res = await calendar.events.update({
        auth,
        eventId,
        calendarId: 'primary',
        resource: body,
      })

      let start = body.start.date || body.start.dateTime
      if (!start.includes('T')) {
        start = start.split('T')[0]
        start = start.split('-')

        start = start[2] + '/' + start[1] + '/' + start[0]

        let end = body.end.date || body.end.dateTime
        end = end.split('T')[0]
        end = end.split('-')

        end = end[2] + '/' + end[1] + '/' + end[0]
        text = `Evento '${body.summary}' atualizado!\n${body.description}\nInício: ${start}\nFim: ${end}`
      } else {
        console.log('teste', start.split('T')[1])
        let hourStartArr = start.split('T')[1].split('.')[0].split(':')
        start = start.split('T')[0]
        start = start.split('-')

        start = start[2] + '/' + start[1] + '/' + start[0]

        let end = body.end.date || body.end.dateTime
        let hourEndArr = end.split('T')[1].split('.')[0].split(':')
        end = end.split('T')[0]
        end = end.split('-')

        end = end[2] + '/' + end[1] + '/' + end[0]
        text = `Evento '${body.summary}' atualizado!\n${
          body.description
        }\n\nInício: ${start} - ${hourStartArr[0] - 3}:${
          hourStartArr[1]
        }\nFim: ${end} - ${hourEndArr[0] - 3}:${hourEndArr[1]}`
      }

      // Envia mensagem para o bot
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
