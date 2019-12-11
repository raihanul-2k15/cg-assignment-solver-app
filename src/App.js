import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import WarningDialog from "./WarningDialog";
import Grid from "@material-ui/core/Grid";
import { APP_NAME } from "./store";
import CoreApp from "./CoreApp";

function App() {
  const [warningOpen, setWarningOpen] = React.useState(true);
  const [entered, setEntered] = React.useState(false);

  const enterApp = () => {
    setWarningOpen(false);
    setEntered(true);
  };
  const leaveApp = () => {
    setWarningOpen(false);
  };

  return (
    <div className="App">
      <WarningDialog open={warningOpen} enter={enterApp} leave={leaveApp} />

      <Container>
        <Typography align="center" variant="h2">
          {APP_NAME}
        </Typography>
        <Divider />

        {!warningOpen && !entered ? (
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "100vh" }}
          >
            <Grid item>
              <Typography>
                You've chosen the leave this app. Refresh this page if you want
                to enter.
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <CoreApp />
        )}
      </Container>
    </div>
  );
}

export default App;
