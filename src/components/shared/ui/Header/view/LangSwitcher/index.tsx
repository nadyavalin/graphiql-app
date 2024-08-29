import NextLink from "next/link";
import { useDispatch } from "react-redux";
import { Link } from "@mui/material";
import styles from "./styles.module.css";
import { setLanguage } from "@shared/store/slices/languageSlice";
import { usePathname } from "next/navigation";

enum Languages {
  EN = "en",
  RU = "ru",
}

export const LangSwitcher = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const changeLanguage = (lang: Languages) => {
    dispatch(setLanguage(lang));
  };

  const getNewPath = (lang: Languages) => {
    return pathname.replace(/\/(en|ru)(\/|$)/, `/${lang}/`);
  };

  return (
    <div className={styles.lang}>
      <Link
        href={getNewPath(Languages.EN)}
        className={styles.lang}
        underline="none"
        component={NextLink}
        onClick={() => changeLanguage(Languages.EN)}
        passHref
      >
        EN
      </Link>
      <span> | </span>
      <Link
        href={getNewPath(Languages.RU)}
        className={styles.lang}
        underline="none"
        component={NextLink}
        onClick={() => changeLanguage(Languages.RU)}
        passHref
      >
        RU
      </Link>
    </div>
  );
};
