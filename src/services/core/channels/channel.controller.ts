import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from 'src/services/auth/guards/jwt.guard';
import { ChannelService } from './channel.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDashboardDto } from './dto/update-channel.dto';

@UseGuards(JwtAuthGuard)
@Controller('channel')
export class DashboardViewController {
  constructor(private readonly channelService: ChannelService) {}

  @Post()
  createChannel(
    @Body() createChannelDto: CreateChannelDto,
    @Req() request: FastifyRequest,
  ) {
    return this.channelService.create(createChannelDto, (request as any).user);
  }

  @Get(':channelId')
  findOneChannel(@Param('id') id: string) {
    return this.channelService.findOne(+id);
  }

  @Patch(':channelId')
  updateChannel(
    @Param('id') id: string,
    @Body() updateChannelDashboardDto: UpdateChannelDashboardDto,
  ) {
    return this.channelService.update(+id, updateChannelDashboardDto);
  }

  @Delete(':channelId')
  remove(@Param('id') id: string) {
    return this.channelService.remove(+id);
  }

  @Get('does-slug-exist')
  doesUsernameExist(@Query('slug') slug: string) {
    return this.channelService.doesSlugExist(slug);
  }
}
