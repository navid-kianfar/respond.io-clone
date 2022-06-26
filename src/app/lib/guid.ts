import { v4 as uuidv4 } from 'uuid';

export default class Guid {
  static NewGuid(): string {
    return uuidv4();
  }

  static Empty(): string {
    return '00000000-0000-0000-0000-000000000000';
  }
}
