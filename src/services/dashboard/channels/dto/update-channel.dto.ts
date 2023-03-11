import { PartialType } from '@nestjs/mapped-types';
import { CreateChannelDto } from './create-channel.dto';

export class UpdateChannelDashboardDto extends PartialType(CreateChannelDto) {}
