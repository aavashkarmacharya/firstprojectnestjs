import { IsNotEmpty, MinLength } from 'class-validator';

export class inputdata {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  @MinLength(3)
  password: string;
}
export type returndata = {
  id: number;
  username: string;
};

export type signindata = {
  accesstoken: string;
  id: number;
  username: string;
};
