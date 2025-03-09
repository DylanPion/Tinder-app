import instance from "../api/http";

// Get all users for the swipe screen
export const GetAllUser = () => {
  return instance.get("/users/allUsers");
};
