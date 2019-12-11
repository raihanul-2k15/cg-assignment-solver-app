import axios from "axios";

export const APP_NAME = "CG Assignmentificator";

export function submitRoll(roll, done) {
  console.log(roll);
  axios
    .get("http://157.245.198.74:3838/permission/" + roll)
    .then(res => {
      done({ success: true, ...res.data });
    })
    .catch(err => {
      console.log(err);
      done({ success: false });
    });
}
