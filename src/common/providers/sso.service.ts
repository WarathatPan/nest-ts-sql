import { CantConnectToSSO, DeniedPermission } from '@common/constants';
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SsoService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}
  public async getUserData(token: string): Promise<any> {
    // const authUrl = '';
    // return await this.httpService
    //   .get(authUrl, {
    //     headers: { Authorization: 'Bearer ' + token },
    //   })
    //   .toPromise()
    //   .then(async ({ data }: any) => {
    //     if (!data)
    //       throw new UnauthorizedException(`SSO can't get user detail.`);
    //     return data;
    //   })
    //   .catch((err) => {
    //     if (err.response.status === 401)
    //       throw new UnauthorizedException(`(SSO) ${err.response.data.error}`);
    //     else if (
    //       err.response.message &&
    //       err.response.message.includes('ECONNREFUSED')
    //     )
    //       throw new ServiceUnavailableException(err.response.message);
    //     else throw new BadRequestException(CantConnectToSSO);
    //   });
  }
}
