import dayjs from "dayjs";
/**
 * Gets current date in various formats
 * @param short - "YYMMDD"
 * @param normal - "YYMMDDHHmmss" (default format)
 * @param full - "YYYY-MM-DD HH:mm:ss"
 * @param date - "YYYY-MM-DD"
 * @param ms - "YYYY-MM-DD HH:mm:ss.SSS"
 * @returns Formatted date string
 */
export function getDateTime(format: "normal" | "full" | "short" | "date" | "ms" = "normal"): string {
  const now = dayjs();

  switch (format) {
    case "short":
      return now.format("YYMMDD");
    case "normal":
      return now.format("YYMMDDHHmmss");
    case "full":
      return now.format("YYYY-MM-DD HH:mm:ss");
    case "date":
      return now.format("YYYY-MM-DD");
    case "ms":
      return now.format("YYMMDDHHmmssSSS");
    default:
      return now.format("YYMMDDHHmmss");
  }
}
