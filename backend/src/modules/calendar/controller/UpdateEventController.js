import { UpdateEventService } from '../service/UpdateEventService'

export class UpdateEventController {
  static async handle({ auth, body, params }) {
    try {
      let eventUpdated = await UpdateEventService.execute(
        auth,
        body,
        params.eventId
      )
      if (!eventUpdated || eventUpdated.error)
        throw new Error('Error updating event!')

      return {
        statusCode: 200,
        eventUpdated,
      }
    } catch (error) {
      return {
        statusCode: 400,
        error: error.message,
      }
    }
  }
}
