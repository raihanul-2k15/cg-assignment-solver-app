import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  formElement: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: "100%"
  }
});

class RollForm extends Component {
  state = {
    roll: "",
    validInput: false
  };

  onChange = e => {
    const str = e.target.value;
    this.setState({ roll: str });
    if (str.length !== 7) {
      this.setState({ validInput: false });
      return;
    }
    const full = +str;
    if (Number.isNaN(full)) {
      this.setState({ validInput: false });
      return;
    } else {
      const dept = +str.substring(2, 4);
      if (dept !== 7) {
        console.log(dept);
        this.setState({ validInput: false });
        return;
      }
      const roll = +str.substring(4, 7);
      if (roll > 121) {
        this.setState({ validInput: false });
        return;
      }
    }
    this.setState({ validInput: true });
  };

  render() {
    const { roll, validInput } = this.state;
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          if (this.state.validInput) {
            this.props.submitRoll(roll);
          }
        }}
      >
        <FormGroup row>
          <TextField
            className={this.props.classes.formElement}
            error={!validInput && roll.length !== 0}
            label="Roll"
            margin="normal"
            value={roll}
            onChange={this.onChange}
            autoFocus
          />
        </FormGroup>
        <FormGroup row>
          <Button
            className={this.props.classes.formElement}
            type="submit"
            variant="contained"
            disabled={!validInput}
            color="primary"
          >
            Go
          </Button>
        </FormGroup>
      </form>
    );
  }
}

export default withStyles(styles)(RollForm);
