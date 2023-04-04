import { Video } from './entities/video.entity';

export class VideoFactory {
  static createYoutubeVideos(channelId: string, youtubeVideos: any[]): Video[] {
    return youtubeVideos.map((youtubeVideo) => {
      return {
        channelId: channelId,
        title: youtubeVideo.title,
        description: youtubeVideo.description,
        tags: [],
        thumbnailURL: youtubeVideo.thumbnail,
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
