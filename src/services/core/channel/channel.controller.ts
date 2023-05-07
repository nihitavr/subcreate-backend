import { Controller, Get, Query } from '@nestjs/common';
import { FindChannelsDto } from './dto/find-channels.dto';
import { ChannelService } from './channel.service';

@Controller('/channels')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get()
  async findChannels(@Query() findChannelsDto: FindChannelsDto) {
    return this.channelService.findChannels(findChannelsDto);
  }
}
