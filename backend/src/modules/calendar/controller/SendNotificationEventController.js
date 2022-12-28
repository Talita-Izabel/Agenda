import { SendNotificationEventService } from '../service/SendNotificationEventService'

export class SendNotificationEventController {
  static async handle({ auth, params }) {
    try {
      let notification = await SendNotificationEventService.execute(
        auth,
        params.eventId
      )
      if (!notification || notification.error)
        throw new Error('Error sending notification')

      return {
        statusCode: 200,
        notification,
      }
    } catch (error) {
      return {
        statusCode: 400,
        error: error.message,
      }
    }
  }
}
