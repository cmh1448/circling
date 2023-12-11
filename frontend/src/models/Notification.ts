export interface Notification {
  id: string;
  title: string;
  content: string;
  targetEmail: string;
  createdAt: string;
  link?: string;
}

export interface NotificationRequest {
  title: string;
  content: string;
  targetEmail: string;
}
