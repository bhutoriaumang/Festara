import { useAuthContext } from "./useAuthContext";
import { useEventsContext } from "./useEventsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: eventsDispatch } = useEventsContext();

  const logout = () => {
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });
    eventsDispatch({ type: "SET_EVENTS", payload: null });
  };

  return { logout };
};
