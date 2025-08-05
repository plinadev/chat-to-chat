import { Timestamp } from "firebase/firestore";
import moment from "moment";

export default function timeAgo(time: Timestamp) {
  const date = time.toDate();
  const momentDate = moment(date);
  return momentDate.fromNow();
}
