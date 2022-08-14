import { Notification } from '../notification/notification';

export abstract class Entity {
  public notification: Notification;

  constructor(public id: string) {
    this.notification = new Notification();
  }
}
