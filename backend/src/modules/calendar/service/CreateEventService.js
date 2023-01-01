import Bot from '../../../utils/Bot'
import { updateEvent } from '../../../utils/ScheduleEvents'

const { google } = require('googleapis')

export class CreateEventService {
  static async execute(auth, body) {
    try {
      const calendar = google.calendar({ version: 'v3', auth })

      let text
      let res = await calendar.events.insert({
        auth: auth,
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
        console.log(body.start, body.end, start, end)
        text = `Evento '${body.summary}' criado!\n${body.description}\nInício: ${start}\nFim: ${end}`
      } else {
        let hourStartArr = start.split('T')[1].split('.')[0].split(':')
        console.log('hourStartArr', hourStartArr)
        start = start.split('T')[0]
        start = start.split('-')

        start = start[2] + '/' + start[1] + '/' + start[0]

        let end = body.end.date || body.end.dateTime
        let hourEndArr = end.split('T')[1].split('.')[0].split(':')
        end = end.split('T')[0]
        end = end.split('-')

        end = end[2] + '/' + end[1] + '/' + end[0]
        console.log(body.start, body.end, start, end)
        text = `Evento '${body.summary}' criado!\n${
          body.description
        }\nInício: ${start} - ${hourStartArr[0] - 3}:${
          hourStartArr[1]
        }\nFim: ${end} - ${hourEndArr[0] - 3}:${hourEndArr[1]}`
      }

      // Envia mensagem para o bot
      await Bot.sendMessage(text)

      updateEvent()

      return res
    } catch (error) {
      console.error(error)
      return { error }
    }
  }
}

// "recurrence": [
//     "RRULE:FREQ=DAILY;COUNT=2"
//   ],
