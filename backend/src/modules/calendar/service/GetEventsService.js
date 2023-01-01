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
        let start = event.start.dateTime || event.start.date
        let end = event.end.dateTime || event.end.date

        if (!start.includes('T')) {
          let startArr = start.split('T')[0].split('-')
          let endArr = end.split('T')[0].split('-')
          start = startArr[2] + '/' + startArr[1] + '/' + startArr[0]
          end = endArr[2] + '/' + endArr[1] + '/' + endArr[0]
        } else {
          let startDateArr = start.split('T')[0].split('-')
          let endDateArr = end.split('T')[0].split('-')

          let startHourArr = start.split('T')[1].split('-')[0].split(':')
          let endHourArr = end.split('T')[1].split('-')[0].split(':')

          start =
            startDateArr[2] +
            '/' +
            startDateArr[1] +
            '/' +
            startDateArr[0] +
            ' - ' +
            `${startHourArr[0]}:${startHourArr[1]}`

          end =
            endDateArr[2] +
            '/' +
            endDateArr[1] +
            '/' +
            endDateArr[0] +
            ' - ' +
            `${endHourArr[0]}:${endHourArr[1]}`
        }

        eventsArr.push({
          id: event.id,
          start,
          summary: event.summary,
          description: event.description,
          end,
          location: event.location,
        })
      })
      //console.log(events)

      return eventsArr
    } catch (error) {
      console.error(error)
      return { error }
    }
  }
}
