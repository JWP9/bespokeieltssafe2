export interface BlogPost {
  id: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
  publishedDate: string;
}

export interface BlogRead {
  id?: string;
  user_id?: string | null;
  post_id: string;
  post_title: string;
  created_at?: string;
}

export interface BlogSubscriber {
  id?: string;
  email: string;
  name?: string;
  subscribed_at?: string;
  is_active?: boolean;
}
