import { Model } from '../../utils/model';

export interface IUser {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}

export class User extends Model<IUser> {
  public readonly id: number;
  public readonly firstname: string;
  public readonly lastname: string;
  public readonly email: string;

  get name(): string {
    return `${this.firstname} ${this.lastname}`;
  }

  constructor(params?: IUser) {
    if (!params) {
      params = { id: 0, firstname: '', lastname: '', email: '' };
    }
    super(params);
  }
}
