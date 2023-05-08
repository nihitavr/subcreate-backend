import { YoutubeVideo } from 'src/services/youtube/dto/youtube-video.dto';
import { Video } from './entities/video.entity';
import { Blog } from '../blog/entities/blog.entity';

export class VideoFactory {
  static createYoutubeVideos(
    channelId: string,
    youtubeVideos: YoutubeVideo[],
    videoIdBlogMap: { [key: string]: Blog },
  ): Video[] {
    return youtubeVideos.map((youtubeVideo) => {
      const blogId = videoIdBlogMap[youtubeVideo.videoId].id;

      return {
        channelId: channelId,
        blogId: blogId,
        title: youtubeVideo.title,
        slug: youtubeVideo.videoId,
        tags: [],
        thumbnails: youtubeVideo.thumbnails,
        originalURL: `https://www.youtube.com/watch?v=${youtubeVideo.videoId}`,
        isYoutubeURL: true,
        subscriptionIds: [],
        pageIds: [],
        publishedAt: youtubeVideo.publishedAt,
        isPublished: true,
        isFileUploaded: true,
      };
    });
  }
}
