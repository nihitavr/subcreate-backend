import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Channel } from 'diagnostics_channel';
import { Model } from 'mongoose';
import { UnauthorisedException } from 'src/lib/exceptions/exceptions/custom.exceptions';
import { ChannelDoc } from 'src/services/core/channel/entities/channel.entity';

@Injectable()
export class UserChannelAuthorizationGuard implements CanActivate {
  constructor(
    @InjectModel(Channel.name)
    private channelModel: Model<ChannelDoc>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const userId = request.user?.id;
    const channelId = request.params.channelId;

    if (!userId || !channelId) {
      throw new UnauthorisedException();
    }

    const isUserChannel = await this.channelModel.exists({
      _id: channelId,
      userId: userId,
    });

    if (!isUserChannel) {
      throw new UnauthorisedException();
    }

    return true;
  }
}
