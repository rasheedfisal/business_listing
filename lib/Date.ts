import dayjs from "dayjs";

type props = {
  date: string | null | undefined;
  format: "DD-MM-YYYY" | "MM-DD-YYYY" | "YYYY-DD-MM";
};
const FormatDate = ({ date, format }: props) => {
  if (date === undefined || date === null) return "";
  return dayjs(date).format(format);
};
export default FormatDate;
