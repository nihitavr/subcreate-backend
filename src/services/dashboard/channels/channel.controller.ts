import {
  Controller,
  Get,
  Body,
  Param,
  Post,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from 'src/services/auth/guards/jwt.guard';
import { UserChannelAuthorizationGuard } from 'src/services/auth/guards/user-channel-authorization.guard';
import { ChannelService } from './channel.service';
import { ChannelGeneralSettingsDto } from './dto/channel-general-settings.dto';
import { ChannelNavbarDto } from './dto/channel-navbar.dto';
import { CreateChannelDto } from './dto/create-channel.dto';
import { FindChannelsDto } from './dto/find-channels.dto';
import { ChannelAppearance } from './entities/classes/channel-appearance.dto';

@Controller('channels')
@UseGuards(JwtAuthGuard)
export class DashboardViewController {
  constructor(private readonly channelService: ChannelService) {}

  @Post()
  async createChannel(
    @Body() createChannelDto: CreateChannelDto,
    @Req() request: FastifyRequest,
  ) {
    return this.channelService.createChannel(
      createChannelDto,
      (request as any).user,
    );
  }

  @Get()
  async findChannels(@Query() findChannelsDto: FindChannelsDto) {
    return this.channelService.findChannels(findChannelsDto);
  }

  @Get(':channelId')
  @UseGuards(UserChannelAuthorizationGuard)
  findOneChannel(@Param('channelId') channelId: string) {
    return this.channelService.findOneByChannelId(channelId);
  }

  @Get(':channelId/general-settings')
  @UseGuards(UserChannelAuthorizationGuard)
  async findChannelGeneralSettings(@Param('channelId') channelId: string) {
    return await this.channelService.findChannelGeneralSettingsByChannelId(
      channelId,
    );
  }

  @Post(':channelId/general-settings')
  @UseGuards(UserChannelAuthorizationGuard)
  async updateChannelGeneralSettings(
    @Param('channelId') id: string,
    @Body() channelGeneralSettingsDto: ChannelGeneralSettingsDto,
  ) {
    return await this.channelService.updateChannelGeneralSettings(
      id,
      channelGeneralSettingsDto,
    );
  }

  @Get(':channelId/appearance-settings')
  @UseGuards(UserChannelAuthorizationGuard)
  findChannelAppearanceSettings(@Param('channelId') id: string) {
    return this.channelService.findChannelAppearanceSettings(id);
  }

  @Post(':channelId/appearance-settings')
  @UseGuards(UserChannelAuthorizationGuard)
  async updateChannelAppearanceSettings(
    @Param('channelId') id: string,
    @Body() channelAppearanceDto: ChannelAppearance,
  ) {
    return await this.channelService.updateChannelAppearanceSettings(
      id,
      channelAppearanceDto,
    );
  }

  @Get(':channelId/navbar-settings')
  @UseGuards(UserChannelAuthorizationGuard)
  findChannelNavbarSettings(@Param('channelId') id: string) {
    return this.channelService.findChannelNavbarSettings(id);
  }

  @Post(':channelId/navbar-settings')
  @UseGuards(UserChannelAuthorizationGuard)
  updateChannelNavbarSettings(
    @Param('channelId') channelId: string,
    @Body() channelNavbarDto: ChannelNavbarDto,
  ) {
    return this.channelService.updateChannelNavbarSettings(
      channelId,
      channelNavbarDto,
    );
  }

  @Get(':channelId/seo-settings')
  @UseGuards(UserChannelAuthorizationGuard)
  findChannelSeoSettings(@Param('channelId') id: string) {
    return this.channelService.findChannelSeoSettings(id);
  }

  @Get('does-slug-exist')
  doesUsernameExist(@Query('slug') slug: string) {
    return this.channelService.doesSlugExist(slug);
  }
}
