import {useSelector} from "react-redux";

export const useTimerState = () => useSelector(state => state.timer);
