import NextLink from "next/link";
import { useDispatch } from "react-redux";
import { Link } from "@mui/material";
import styles from "./styles.module.css";
import { setLanguage } from "@shared/store/slices/languageSlice";

export const LangSwitcher = () => {
  const dispatch = useDispatch();

  const changeLanguage = (lang: string) => {
    dispatch(setLanguage(lang));
  };

  return (
    <div className={styles.lang}>
      <Link href="/en" underline="none" component={NextLink} onClick={() => changeLanguage("en")}>
        EN
      </Link>
      <span> | </span>
      <Link href="/ru" underline="none" component={NextLink} onClick={() => changeLanguage("ru")}>
        RU
      </Link>
    </div>
  );
};
