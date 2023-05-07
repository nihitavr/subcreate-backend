import { YoutubeVideo } from 'src/services/youtube/dto/youtube-video.dto';
import { Blog } from './entities/blog.entity';

export class BlogFactory {
  static createVideoIdBlogMapFromYoutubeVideos(
    channelId: string,
    youtubeVideos: YoutubeVideo[],
  ) {
    const videoIdBlogMap: { [key: string]: Blog } = {};
    youtubeVideos.forEach((youtubeVideo) => {
      videoIdBlogMap[youtubeVideo.videoId] = {
        channelId: channelId,
        isVideoBlog: true,
        editorData: {
          blocks: [
            {
              type: 'paragraph',
              data: {
                text: youtubeVideo.description,
              },
            },
          ],
        },
      };
    });

    return videoIdBlogMap;
  }
}
