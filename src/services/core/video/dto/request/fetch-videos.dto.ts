import { VideoResponse } from '../response/video-response.dto';

export class VideoResponseDto {
  data: VideoResponse[];
  pagination: { page: number; limit: number; total: number; size: number };
}
