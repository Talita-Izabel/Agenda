import Bot from '../../../utils/Bot'
import Calendar from '../../../utils/Calendar'

export class SendNotificationEventService {
  static async execute(auth, eventId) {
    try {
      let date, dateArr, hourArr, hourStart, hourEnd, text, location

      let event = await Calendar.getEvent(eventId, auth)
      let start = event.start.date || event.start.dateTime
      let end = event.end.date || event.end.dateTime

      if (!event.location) location = ''
      else location = event.location

      dateArr = start.split('T')[0]
      dateArr = dateArr.split('-')
      date = `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`

      // Verifica se evento possui horario
      if (event.start.dateTime) {
        hourArr = start.split('T')[1].split('-')[0]
        hourArr = hourArr.split(':')

        hourStart = `${hourArr[0]}:${hourArr[1]}`

        hourArr = end.split('T')[1].split('-')[0]
        hourArr = hourArr.split(':')

        hourEnd = `${hourArr[0]}:${hourArr[1]}`

        text = `'${event.summary}' - ${date}\n${event.description}\n${location}\n${hourStart} - ${hourEnd}`
      } else {
        text = `'${event.summary}' - ${date}\n${event.description}\n${location}`
      }

      // Envia mensagem para o bot
      await Bot.sendMessage(text)
      return event
    } catch (error) {
      console.error(error)
      return { error }
    }
  }
}
