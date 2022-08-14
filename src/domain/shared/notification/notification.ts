export type NotificationErrorProps = {
  context: string;
  message: string;
};

export class Notification {
  private errors: NotificationErrorProps[] = [];

  addError(error: NotificationErrorProps) {
    this.errors.push(error);
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  getErrors(): NotificationErrorProps[] {
    return this.errors;
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
