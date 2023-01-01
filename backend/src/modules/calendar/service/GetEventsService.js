const { google } = require('googleapis')

export class GetEventsService {
  static async execute(auth) {
    try {
      let eventsArr = []
      const calendar = google.calendar({ version: 'v3', auth })
      const res = await calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
      })
      const events = res.data.items
      if (!events || events.length === 0) {
        console.log('No upcoming events found.')
        return
      }
      console.log('Upcoming 10 events:')
      events.map((event) => {
        console.log(event)
        const start = event.start.dateTime || event.start.date
        const end = event.end.dateTime || event.end.date
        eventsArr.push({
          id: event.id,
          start,
          summary: event.summary,
          description: event.description,
          end,
          location: event.location,
        })
      })
      console.log(events)

      return eventsArr
    } catch (error) {
      console.error(error)
      return { error }
    }
  }
}
