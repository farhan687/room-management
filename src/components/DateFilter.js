import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';
import { connect } from 'react-redux';
import moment from 'moment';
import historyService from '../helpers/historyService';

const styles = {
  dateContainer: {
    flex: 1,
    textAlign: 'center',
  },
};

class DateFilter extends Component {
  selectPreviousDay = () => {
    const { selectedDate } = this.props;
    const newDate = selectedDate === 'today'
      ? moment().subtract(1, 'days')
      : moment(parseInt(selectedDate, 10)).subtract(1, 'days');
    historyService.push({
      pathname: `/${newDate}`,
    });
  }
  selectNextDay = () => {
    const { selectedDate } = this.props;
    const newDate = selectedDate === 'today'
      ? moment().add(1, 'days')
      : moment(parseInt(selectedDate, 10)).add(1, 'days');
    historyService.push({
      pathname: `/${newDate}`,
    });
  }
  render() {
    const { classes, selectedDate } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.dateContainer}>
              <IconButton color="secondary" aria-label="Previous" onClick={this.selectPreviousDay}>
                <KeyboardArrowLeft />
              </IconButton>
              {
                selectedDate === 'today'
                  ? 'Today'
                  : moment(parseInt(selectedDate, 10)).format('YYYY-MM-DD')
                }
              <IconButton color="secondary" aria-label="next" onClick={this.selectNextDay}>
                <KeyboardArrowRight />
              </IconButton>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedDate: state.selectedDate,
});

DateFilter.propTypes = {
  classes: PropTypes.object,
  selectedDate: PropTypes.string.isRequired,
};

DateFilter.defaultProps = {
  classes: {},
};

export default connect(mapStateToProps)(withStyles(styles)(DateFilter));
