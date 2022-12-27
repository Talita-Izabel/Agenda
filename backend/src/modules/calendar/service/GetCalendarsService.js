const { google } = require('googleapis')

export class GetCalendarsService {
  static async execute(auth) {
    try {
      const calendar = google.calendar({ version: 'v3', auth })

      const res = await calendar.calendarList.list()
      let calendars = res.data.items

      return calendars
    } catch (error) {
      console.error(error)
      return { error }
    }
  }
}
