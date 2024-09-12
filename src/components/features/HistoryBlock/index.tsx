import { formatDate } from "@shared/utils/formatDataEditor/formatDate";
import Link from "next/link";
import { DateRange as DateRangeIcon } from "@mui/icons-material";
import { Languages } from "@shared/types";
import { useSelector } from "react-redux";
import { RootState } from "@shared/store";
import styles from "./styles.module.css";
import { HistoryRequest } from "@shared/store/slices/historySlice";

interface HistoryBlockProps {
  listRequests: HistoryRequest[];
  title: string;
}

export const HistoryBlock = ({ listRequests, title }: HistoryBlockProps) => {
  const currentLanguage: Languages = useSelector((state: RootState) => state.language.lang);
  return (
    <section className={styles.list}>
      <h2>{title}</h2>
      {listRequests.map((request) => {
        return (
          <Link
            href={`/${currentLanguage}/${request.url}`}
            key={request.date}
            className={styles.listItem}
          >
            <DateRangeIcon />
            {formatDate(request.date)}: {request.url}
          </Link>
        );
      })}
    </section>
  );
};
