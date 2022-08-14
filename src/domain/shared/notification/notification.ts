export type NotificationError = {
  context: string;
  message: string;
};

export class Notification {
  private errors: NotificationError[] = [];

  addError(error: NotificationError) {
    this.errors.push(error);
  }

  messages(context?: string): string {
    let messages = '';
    let query = this.errors;

    if (context) {
      query = query.filter((error) => error.context === context);
    }
    query.forEach((error) => {
      messages += `${error.context}: ${error.message}, `;
    });

    return messages;
  }
}
