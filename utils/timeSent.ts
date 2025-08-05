import { Timestamp } from "firebase/firestore";
import moment from "moment";

export default function timeSent(time: Timestamp) {
  const date = time.toDate();
  const momentDate = moment(date);
  return momentDate.format("LT");
}
