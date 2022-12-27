const { google } = require('googleapis')

export class DeleteEventService {
  static async execute(auth, eventId) {
    try {
      const calendar = google.calendar({ version: 'v3', auth })

      let res = await calendar.events.delete({
        auth,
        eventId,
        calendarId: 'primary',
      })

      console.log(res)
      return res
    } catch (error) {
      console.error(error)
      return { error }
    }
  }
}
