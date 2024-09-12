import { useDispatch } from "react-redux";

import { AppDispatch } from "../";

const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;
