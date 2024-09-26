import { RolesEnum } from '@common/decorators/roles.decorator';

export interface JwtDecodeResponse {
  id: string;
  email: string;
  role: RolesEnum;
  iat: number;
  exp: number;
}
