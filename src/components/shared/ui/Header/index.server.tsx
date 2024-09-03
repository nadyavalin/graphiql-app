import styles from "./styles.module.css";
import { Menu } from "./view/Menu";
import { LangSwitcher } from "./view/LangSwitcher";
import { Locale } from "../../../../../i18n-config";

interface HeaderProps {
  params: {
    lang: Locale;
  };
  sticky: boolean;
}

export const HeaderServer = ({ params: { lang }, sticky }: HeaderProps) => {
  return (
    <header className={`${styles.header} ${sticky ? styles.sticky : ""}`}>
      <Menu lang={lang} />
      <LangSwitcher />
    </header>
  );
};
