import { ExecutionContext, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { firebaseAuth } from 'src/lib/firebase/initialize.firebase';
import { User, UserDoc } from 'src/services/users/entities/user.entity';

@Injectable()
export class JwtAuthGuard {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDoc>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization.split(' ')[1];

    const user = await firebaseAuth.verifyIdToken(token);

    if (user) {
      request.user = await this.userModel.findOne({ uid: user?.user_id });
      return true;
    }

    return false;
  }
}
