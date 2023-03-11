import { VideoResponseData } from './video-response.dto';

export class VideoResponseDto {
  data: VideoResponseData[];
  pagination: { page: number; limit: number; total: number; size: number };
}
