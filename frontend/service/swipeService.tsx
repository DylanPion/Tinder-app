import instance from "../api/http";

export const LikeUser = (userId: string) => {
  return instance.post(`/swipe/like/${userId}`);
};

export const DislikeUser = (userId: string) => {
  return instance.post(`/swipe/dislike/${userId}`);
};
