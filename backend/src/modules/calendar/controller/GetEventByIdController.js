import { GetEventByIdService } from '../service/GetEventByIdService'

export class GetEventByIdController {
  static async handle({ auth, params }) {
    try {
      let event = await GetEventByIdService.execute(auth, params.eventId)
      if (!event || event.error) throw new Error('Error getting event')

      return {
        statusCode: 200,
        event,
      }
    } catch (error) {
      return {
        statusCode: 400,
        error: error.message,
      }
    }
  }
}
