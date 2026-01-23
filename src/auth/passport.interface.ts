import { roles } from '../common/enums/roles.enum';
export interface jwtpayload {
  sub: number;
  username: string;
  roles: roles;
}
