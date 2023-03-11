export class VideoResponseData {
  channelId: string;
  title: string;
  description: string;
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

  subscriptions: VideoResSubscriptionDto[];
  pages: VideoResPageDto[];
}

class VideoResPageDto {
  id: string;
  title: string;
}

class VideoResSubscriptionDto {
  id: string;
  title: string;
}
