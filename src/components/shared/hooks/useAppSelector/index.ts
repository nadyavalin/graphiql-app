import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "@shared/store";

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
