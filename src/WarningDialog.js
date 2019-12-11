import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function WarningDialog(props) {
  return (
    <div>
      <Dialog
        open={props.open}
        aria-labelledby="Warning"
        aria-describedby="Enter at your own risk"
        disableBackdropClick
        disableEscapeKeyDown
      >
        <DialogTitle id="alert-dialog-title">{"Warning"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This app is built to help you verify and correct your{" "}
            <b>CSE 4207 Computer Graphics</b> assignment given for <b>2k15</b>
            batch. <br />
            If you misuse this app to complete your assignment, you might miss
            out on a great opportunity to learn the topics covered by the
            assignment. <br />
            <b>
              The author of this app is not, in any way, responsible for any
              boka jhoka or cancellation of your assignment.
            </b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.leave} color="primary">
            Leave Now
          </Button>
          <Button
            onClick={props.enter}
            color="primary"
            variant="contained"
            autoFocus
          >
            I understand
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
