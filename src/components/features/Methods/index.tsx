import { Methods } from "@shared/store/model";
import styles from "./styles.module.css";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import useAppDispatch from "@shared/hooks/useAppDispatch";
import useAppSelector from "@shared/hooks/useAppSelector";
import { updateMethod } from "@src/components/shared/store/slices/methodSlice";

export const MethodsBlock = () => {
  const dispatch = useAppDispatch();

  const method = useAppSelector((state) => state.method.method);

  const onChange = (event: SelectChangeEvent) => {
    const method = event.target.value as Methods;
    dispatch(updateMethod(method));
  };

  return (
    <FormControl sx={{ minWidth: "100px" }}>
      <InputLabel>Method</InputLabel>
      <Select className={styles.input} onChange={onChange} value={method}>
        {Object.values(Methods).map((method) => {
          return (
            <MenuItem key={method} value={method}>
              {method}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
