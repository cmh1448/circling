export interface Circle {
  id: number;
  name: string;
  description: string;
  members?: number;
  followers?: number;
}

export interface Follower {
  circle: Circle;

  type: "MEMBER" | "FOLLOWER";
}
