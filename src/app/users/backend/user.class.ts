import { Record } from 'immutable';

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: any;
  phone: string;
  website: string;
  company: any;
}

const DEFAULT_VALUES = {
  id: 0,
  name: '',
  username: '',
  email: '',
  address: {},
  phone: '',
  website: '',
  company: {},
};

export class User extends Record(DEFAULT_VALUES) {
  public readonly id: number;
  public readonly name: string;
  public readonly username: string;
  public readonly email: string;
  public readonly address: any;
  public readonly phone: string;
  public readonly website: string;
  public readonly company: any;

  get firstname(): string {
    return this.name.split(' ')[0];
  }

  get lastname(): string {
    return this.name.split(' ')[1];
  }
}
