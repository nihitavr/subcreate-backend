import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthConfig } from 'src/config/auth.config';
import { UsersService } from 'src/services/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: AuthConfig.firebaseJwtTokenSecret,
    });
  }

  async validate(payload: any) {
    console.log('payload: ', payload);

    return await this.userService.findOneByUid(payload?.user_id);
  }
}
