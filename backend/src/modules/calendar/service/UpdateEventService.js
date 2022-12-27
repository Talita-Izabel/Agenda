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

      console.log(res)
      return res
    } catch (error) {
      console.error(error)
      return { error }
    }
  }
}
