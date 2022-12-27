import { CreateEventService } from '../service/CreateEventService'

export class CreateEventController {
  static async handle({ auth, body }) {
    try {
      let eventCreated = await CreateEventService.execute(auth, body)
      if (!eventCreated || eventCreated.error)
        throw new Error('Error creating event!')

      return {
        statusCode: 201,
        eventCreated,
      }
    } catch (error) {
      return {
        statusCode: 400,
        error: error.message,
      }
    }
  }
}
