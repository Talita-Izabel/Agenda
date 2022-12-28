const { google } = require('googleapis')

class Calendar {
  async getEvents(auth) {
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
        return null
      }
      events.map((event) => {
        const start = event.start.dateTime || event.start.date
        const end = event.end.dateTime || event.end.date
        eventsArr.push({
          id: event.id,
          start,
          description: event.summary,
          end,
        })
      })

      return eventsArr
    } catch (error) {
      console.error(error)
    }
  }

  async getEvent(eventId, auth) {
    try {
      const calendar = google.calendar({ version: 'v3', auth })

      const res = await calendar.events.get({
        auth,
        calendarId: 'primary',
        eventId,
      })

      return res.data
    } catch (error) {
      console.error(error)
    }
  }
}

export default new Calendar()
