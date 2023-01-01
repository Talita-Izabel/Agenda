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

      let event = {
        creator: res.data.creator.email,
        description: res.data.description,
        summary: res.data.summary,
        location: res.data.location,
        start: res.data.start.date || res.data.start.dateTime,
        end: res.data.end.date || res.data.end.dateTime,
      }

      return event
    } catch (error) {
      console.error(error)
      return { error }
    }
  }
}
