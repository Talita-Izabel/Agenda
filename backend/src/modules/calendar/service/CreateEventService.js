import Bot from '../../../utils/Bot'

const { google } = require('googleapis')

export class CreateEventService {
  static async execute(auth, body) {
    try {
      const calendar = google.calendar({ version: 'v3', auth })

      let res = await calendar.events.insert({
        auth: auth,
        calendarId: 'primary',
        resource: body,
      })

      let start = body.start.date || body.start.dateTime
      start = start.split('T')[0]

      let end = body.end.date || body.end.dateTime
      end = end.split('T')[0]

      console.log(body.start, body.end, start, end)

      // Envia mensagem para o bot
      let text = `Evento '${body.summary}' criado!\n${body.description}\nInício: ${start}\nFim: ${end}`
      await Bot.sendMessage(text)

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
