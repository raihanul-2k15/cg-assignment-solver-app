import axios from "axios";

export const APP_NAME = "CG Assignmentificator";

export function submitRoll(roll, done) {
  // this will grant access without asking server
  done({ success: true, roll, auth: true, starsRequired: [], wait: 0 });

  // TODO: If you've set up a server, delete above line and uncomment the below

  /*
  axios
    .get("http://157.245.198.74:3838/permission/" + roll)
    .then(res => {
      done({ success: true, ...res.data });
    })
    .catch(err => {
      console.log(err);
      done({ success: false });
    });
    */
}
