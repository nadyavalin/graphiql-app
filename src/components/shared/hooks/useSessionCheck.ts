import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { setDateToken } from "@shared/store/slices/userSlice";
import { isTokenValid } from "@shared/utils/tokenDateCheck";
import { auth } from "@config/firebaseConfig";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Languages } from "@shared/types";
import { useDictionary } from "@shared/providers/DictionaryProvider";
import { RootState } from "@shared/store";

const useSessionCheck = () => {
  const user = useSelector((state: RootState) => state.user);
  const currentLanguage: Languages = useSelector((state: RootState) => state.language.lang);
  const dispatch = useDispatch();
  const router = useRouter();
  const dictionary = useDictionary();
  const hasLoggedOutRef = useRef(false);

  useEffect(() => {
    const checkTokenValidity = () => {
      if (hasLoggedOutRef.current) return;

      if (user.dateToken && !isTokenValid(user.dateToken)) {
        signOut(auth).then(() => {
          dispatch(setDateToken(""));
          toast.error(dictionary.logout.tokenExpired);
          router.push(`/${currentLanguage}`);
          hasLoggedOutRef.current = true;
        });
      }
    };

    checkTokenValidity();
    const interval = setInterval(checkTokenValidity, 10000);

    return () => clearInterval(interval);
  }, [
    currentLanguage,
    dictionary.logout.tokenExpired,
    dictionary.titles.variable,
    dispatch,
    router,
    user.dateToken,
  ]);
};

export default useSessionCheck;
