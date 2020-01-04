import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Assignment from "./assignment";
import {} from "./store";
import RollForm from "./RollForm";
import { submitRoll } from "./store";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import EmojiEmotions from "@material-ui/icons/EmojiEmotions";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import StarIcon from "@material-ui/icons/Star";
import TimerIcon from "@material-ui/icons/Timer";

const styles = theme => ({
  btn: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: "100%"
  },
  inlineIcon: {
    verticalAlign: "middle"
  }
});

class CoreApp extends Component {
  state = {
    requestingServer: false,
    connError: false,
    roll: "",
    authed: false,
    starsRequired: [],
    wait: 0
  };

  waitTimer = () => {
    const currentWait = this.state.wait;
    if (currentWait > 0) {
      setTimeout(() => {
        this.setState(prevState => ({ wait: currentWait - 1 }));
        this.waitTimer();
      }, 1000);
    }
  };

  onAuthReqCompleted = response => {
    const { success, roll, auth, starsRequired, wait } = response;
    if (success) {
      this.setState({
        authed: auth,
        connError: false,
        starsRequired,
        roll,
        wait,
        requestingServer: false
      });
      this.waitTimer();
    } else {
      this.setState({ requestingServer: false, connError: true });
    }
  };

  render() {
    const { classes } = this.props;
    const {
      requestingServer,
      wait,
      roll,
      authed,
      starsRequired,
      connError
    } = this.state;

    return (
      <div>
        {requestingServer ? (
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "100vh" }}
          >
            <Grid item lg={4} xs={12}>
              <Typography variant="h4">Loading...</Typography>
            </Grid>
          </Grid>
        ) : authed ? (
          <Assignment roll={roll} />
        ) : (
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "100vh" }}
          >
            <Grid item lg={4} xs={12}>
              {roll === "" && (
                <>
                  <RollForm
                    submitRoll={r => {
                      this.setState({ requestingServer: true });
                      submitRoll(r, this.onAuthReqCompleted);
                    }}
                  />
                  {connError && (
                    <Typography variant="h6" color="error">
                      Could not connect to server.
                    </Typography>
                  )}
                </>
              )}
              {Array.isArray(starsRequired) && starsRequired.length > 0 && (
                <>
                  <Typography variant="h4" align="center">
                    Roll: {roll}
                  </Typography>
                  <Typography variant="body1" align="center">
                    <GitHubIcon fontSize="large"></GitHubIcon>
                    <StarIcon fontSize="large"></StarIcon>
                  </Typography>
                  <Typography variant="body1" align="center">
                    You have to star the following repositories on author's
                    Github profile:
                  </Typography>
                  <Card>
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        Repositories:
                      </Typography>
                      <List dense component="nav">
                        {starsRequired.map((val, i) => (
                          <ListItem
                            key={i}
                            component="a"
                            href={val.link}
                            target="_blank"
                          >
                            <ListItemText>
                              {i + 1 + ". " + val.name}
                            </ListItemText>
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                  <Typography variant="body1" align="center">
                    For each repository name above, click to open in new tab and
                    then Star.
                  </Typography>
                  <br />
                  <Typography variant="body1" align="center">
                    <LinkedInIcon fontSize="large" />
                  </Typography>
                  <Typography variant="body1" align="center">
                    Optionally, you may Endorse skills on my LinkedIn profile{" "}
                    <EmojiEmotions className={classes.inlineIcon} />
                  </Typography>
                  <Button
                    className={classes.btn}
                    variant="outlined"
                    color="primary"
                    onClick={() =>
                      window.open(
                        "https://www.linkedin.com/in/raihanul-islam-refat-ba09a1195/",
                        "_blank"
                      )
                    }
                  >
                    Endorse Now!
                  </Button>
                  <Typography variant="body1" align="center">
                    When complete, click 'Done!' below!
                  </Typography>
                  <Button
                    disabled={wait > 0}
                    className={classes.btn}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      this.setState({ requestingServer: true });
                      submitRoll(roll, this.onAuthReqCompleted);
                    }}
                  >
                    {wait > 0 ? (
                      <>
                        {Math.floor(wait / 60)}:{wait % 60}{" "}
                        <TimerIcon className={classes.inlineIcon} />
                      </>
                    ) : (
                      "Done"
                    )}
                  </Button>
                  {wait > 0 && (
                    <Typography variant="h6" align="center"></Typography>
                  )}
                </>
              )}
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(CoreApp);
