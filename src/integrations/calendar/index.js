import { google } from 'googleapis';

class CalendarIntegration {
  constructor(credentials) {
    this.calendar = google.calendar({
      version: 'v3',
      auth: this.getAuth(credentials)
    });
  }

  async createAppointment(details) {
    const event = {
      summary: details.title,
      description: details.description,
      start: { dateTime: details.startTime },
      end: { dateTime: details.endTime }
    };

    return await this.calendar.events.insert({
      calendarId: 'primary',
      resource: event
    });
  }
}