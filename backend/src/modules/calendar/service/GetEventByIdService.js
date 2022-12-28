const { google } = require('googleapis')

export class GetEventByIdService {
  static async execute(auth, eventId) {
    try {
      const calendar = google.calendar({ version: 'v3', auth })

      const res = await calendar.events.get({
        auth,
        calendarId: 'primary',
        eventId,
      })

      console.log(res)
      return res.data
    } catch (error) {
      console.error(error)
      return { error }
    }
  }
}
