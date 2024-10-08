export type PageMetaData = null | {
  id: number | null;
  title: string;
  description: string | null;
  permalink: string;
  pageId: string;
};

export type Page = {
  id: string | null;
  title: string;
  content: string | null;
  createdAt?: Date;
  updatedAt?: Date | null;
  published: boolean;
  metadata?: PageMetaData;
};
