export interface Notification {
  id: string;
  title: string;
  content: string;
  targetEmail: string;
  createdAt: string;
}

export interface NotificationRequest {
  title: string;
  content: string;
  targetEmail: string;
}
