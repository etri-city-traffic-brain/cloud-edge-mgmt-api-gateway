import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  margin: {
    margin: theme.spacing.unit * 2,
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`,
  },
});

class BadgeVisibility extends Component {
  state = {
    invisible: false,
  };

  handleBadgeVisibility = () =>
   {
    this.setState(prevState => 
        (
            { invisible: !prevState.invisible }
        )
    );
  };

  render() {
    const { classes } = this.props;
    const { invisible } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.margin}>
            <Badge className={classes.margin} color="primary" badgeContent={4} invisible={invisible}>
                <MailIcon />
            </Badge>
            <Badge className={classes.margin} color="secondary" badgeContent={4} invisible={invisible}>
                <MailIcon />
            </Badge>
            <Badge className={classes.margin} color="secondary" badgeContent={4} invisible={invisible}>
                <MailIcon />
            </Badge>
            <Badge color="primary" badgeContent={4} className={classes.margin}>
                <button className= "btn_confirm" >Button</button>
            </Badge>
        </div>
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch color="primary" checked={!invisible} onChange={this.handleBadgeVisibility} />
            }
            label="Show Badge"
          />
        </FormGroup>
      </div>
    );
  }
}

BadgeVisibility.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BadgeVisibility);