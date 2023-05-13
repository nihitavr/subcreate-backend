import { Thumbnails } from 'src/services/core/video/entities/video.entity';

export class YoutubeVideo {
  videoId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  publishedAt: Date;
}
