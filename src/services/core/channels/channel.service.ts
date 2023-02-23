import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DoesUsernameExistResponse } from 'src/services/users/dto/does-username-exist.response';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDashboardDto } from './dto/update-channel.dto';
import { Channel, ChannelDoc } from './entities/channel.entity';
import { DoesSlugExistResponse } from './dto/does-slug-exist.response';
import { User } from 'src/services/users/entities/user.entity';

@Injectable()
export class ChannelService {
  constructor(
    @InjectModel(Channel.name)
    private channelModel: Model<ChannelDoc>,
  ) {}

  create(createChannelDto: CreateChannelDto, user: User) {
    createChannelDto.userId = user.id;

    return 'This action adds a new channelDashboard';
  }

  findOne(id: number) {
    return `This action returns a #${id} channelDashboard`;
  }

  update(id: number, updateChannelDashboardDto: UpdateChannelDashboardDto) {
    return `This action updates a #${id} channelDashboard`;
  }

  remove(id: number) {
    return `This action removes a #${id} channelDashboard`;
  }

  async doesSlugExist(slug: string): Promise<DoesSlugExistResponse> {
    const channel = await this.channelModel
      .findOne({ username: slug })
      .select({ _id: 1 });

    if (channel) {
      return { doesSlugExist: false };
    }

    return { doesSlugExist: true };
  }
}
