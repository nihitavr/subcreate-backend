import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { HTTPFetcher } from 'src/lib/utils/axios.utils';
import { YoutubeConfig } from './youtube.config';

@Injectable()
export class YoutubeService extends HTTPFetcher {
  constructor(readonly httpService: HttpService) {
    super(httpService, 'https://www.googleapis.com/youtube/v3');
  }

  private readonly logger = new Logger(YoutubeService.name);

  async fetchChannelVideos(youtubeChannelId: string) {
    const videos = [];

    const fetchVideosRecursive = async (pageToken = '') => {
      try {
        const data = await this.get('search', {
          queryParams: {
            part: 'id,snippet',
            type: 'video',
            maxResults: '50',
            order: 'date',
            channelId: youtubeChannelId,
            key: YoutubeConfig.API_KEY,
            pageToken,
          },
        });

        videos.push(
          ...data.items.map((item) => {
            return {
              videoId: item.id.videoId,
              ...item.snippet,
            };
          }),
        );

        if (data.nextPageToken) {
          // Recursively fetch the next page using the nextPageToken
          await fetchVideosRecursive(data.nextPageToken);
        }
      } catch (error) {
        this.logger.error(
          `Error fetching videos for channel (${youtubeChannelId}), Error: ${error}`,
        );
      }
    };

    await fetchVideosRecursive();

    return videos;
  }
}
