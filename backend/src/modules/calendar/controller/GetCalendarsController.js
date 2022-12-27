import { GetCalendarsService } from '../service/GetCalendarsService'

export class GetCalendarsController {
  static async handle({ auth }) {
    try {
      let calendars = await GetCalendarsService.execute(auth)
      if (!calendars || calendars.error)
        throw new Error('Error getting calendars!')

      return {
        statusCode: 200,
        calendars,
      }
    } catch (error) {
      return {
        statusCode: 400,
        error: error.message,
      }
    }
  }
}
