import { Blog } from 'src/services/core/blog/entities/blog.entity';

export class VideoResponse {
  id: string;
  channelId: string;
  blogId: string;
  blog?: Blog;
  title: string;
  description: string;
  descriptionSync: string;
  durationInSecs: number;
  tags: string[];
  thumbnailURL: string;
  originalURL: string;
  isYoutubeURL: boolean;
  subscriptionIds: string[];
  pageIds: string[];
  publishedAt: Date;
  isPublished: boolean;
  isFileUploaded: boolean;

  subscriptions: VideoResponseSubscription[];
  pages: VideoResponsePage[];
}

class VideoResponsePage {
  id: string;
  title: string;
}

class VideoResponseSubscription {
  id: string;
  title: string;
}
