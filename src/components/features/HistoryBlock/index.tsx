import Link from "next/link";
import { DateRange as DateRangeIcon } from "@mui/icons-material";
import { Languages } from "@shared/types";
import { useSelector } from "react-redux";
import { RootState } from "@shared/store";
import styles from "./styles.module.css";
import { HistoryRequest } from "@shared/store/slices/historySlice";
import { formatDate } from "@shared/utils/formatDate";
import { sortArrayDate } from "@shared/utils/sortArray";

interface HistoryBlockProps {
  listRequests: HistoryRequest[];
  title: string;
}

export const HistoryBlock = ({ listRequests, title }: HistoryBlockProps) => {
  const currentLanguage: Languages = useSelector((state: RootState) => state.language.lang);

  return (
    <section className={styles.list}>
      <h2>{title}</h2>
      {sortArrayDate(listRequests).map((request) => {
        return (
          <Link
            href={`/${currentLanguage}/${request.encodeUrl}`}
            key={request.date}
            className={styles.listItem}
          >
            <span>
              <DateRangeIcon />
              {formatDate(request.date)}
            </span>
            {request.url}
          </Link>
        );
      })}
    </section>
  );
};
