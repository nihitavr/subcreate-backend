import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UnauthorisedException } from 'src/lib/exceptions/exceptions/custom.exceptions';
import {
  Video,
  VideoDoc,
} from 'src/services/dashboard/videos/entities/video.entity';

@Injectable()
export class ChannelVideoAuthorizationGuard implements CanActivate {
  constructor(
    @InjectModel(Video.name)
    private videoModel: Model<VideoDoc>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const channelId = request.params.channelId;
    const videoId = request.params.videoId;

    if (!channelId || !videoId) {
      throw new UnauthorisedException('Video not found for the channel');
    }

    const isChannelVideo = await this.videoModel.exists({
      _id: videoId,
      channelId: channelId,
    });

    if (!isChannelVideo) {
      throw new UnauthorisedException('Video not found for the channel');
    }

    return true;
  }
}
