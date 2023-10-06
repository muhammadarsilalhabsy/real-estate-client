import { useSelector } from "react-redux";
export const getCurrentUser = () => {
  const { currentUser } = useSelector((state) => state.persistedReducer.user);

  return currentUser;
};
