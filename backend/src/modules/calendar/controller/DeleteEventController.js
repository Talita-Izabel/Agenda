import { DeleteEventService } from '../service/DeleteEventService'

export class DeleteEventController {
  static async handle({ auth, params }) {
    try {
      let eventDeleted = await DeleteEventService.execute(auth, params.eventId)
      if (!eventDeleted || eventDeleted.error)
        throw new Error('Error deleting event!')

      return {
        statusCode: 200,
        eventDeleted,
      }
    } catch (error) {
      return {
        statusCode: 400,
        error: error.message,
      }
    }
  }
}
