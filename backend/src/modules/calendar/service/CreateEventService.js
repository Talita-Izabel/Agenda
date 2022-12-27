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

      console.log(res)
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
