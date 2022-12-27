import { GetEventsService } from '../service/GetEventsService'

export class GetEventsController {
  static async handle({ auth }) {
    try {
      let events = await GetEventsService.execute(auth)
      if (!events) throw new Error('Error getting events!')

      return {
        statusCode: 200,
        events,
      }
    } catch (error) {
      return {
        statusCode: 400,
        error: error.message,
      }
    }
  }
}
