import { Notification } from '../notification/notification';

export abstract class Entity {
  protected notification: Notification;

  constructor(public id: string) {
    this.notification = new Notification();
  }
}
