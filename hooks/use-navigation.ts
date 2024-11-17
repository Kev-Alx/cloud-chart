import { usePathname } from "next/navigation";

export const useNavigation = () => {
  const pathname = usePathname();
  const splittedPathname = pathname.split("/");
  const isChart =
    splittedPathname.length > 3 &&
    splittedPathname[2] === "files" &&
    splittedPathname[3] &&
    splittedPathname[4] === "charts";
  const isDashboard =
    splittedPathname.length > 3 &&
    splittedPathname[2] === "files" &&
    splittedPathname[3] &&
    splittedPathname[4] === "dashboards";
  return { isChart, isDashboard };
};
