import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as roomActions from '../actions/roomActions';
import historyService from '../helpers/historyService';
import RoomSummary from './RoomSummary';
import RoomDescription from './RoomDescription';
import deviceHelper from '../helpers/deviceHelper';
import config from '../config';
import Error from '../components/Error';

const styles = () => ({
  root: {
    padding: '16px',
  },
  progress: {
    top: config.appbarHeight + 5,
    position: 'fixed',
    width: '100%',
    left: 0,
  },
});

const RoomDescriptionRoute = ({ props, ...extraProps }) => (
  <Route
    {...extraProps}
    render={routeProps => <RoomDescription {...props} {...routeProps} />}
  />
);

class RoomList extends Component {
  state = {
    isMobile: deviceHelper.isMobile(),
  };
  componentDidMount() {
    const { actions, selectedRoom, location } = this.props;
    // Trigger changeDate action with new date
    actions.changeDate(this.props.match.params.date);
    // Apply event listener for resize
    window.addEventListener('resize', this.handleResize);
    // Check if route contains room,
    // that means room is selected, trigger selectRoom action
    if (location.pathname.indexOf('/room/') > -1) {
      const locationSplit = location.pathname.split('/');
      const roomName = locationSplit[locationSplit.length - 1];
      if (roomName && selectedRoom !== roomName) actions.selectRoom(roomName);
    }
  }
  // On Date change clear selectedRoom and trigger changeDate action
  componentWillReceiveProps({ match }) {
    if (this.props.selectedDate !== match.params.date) {
      this.props.actions.selectRoom(null);
      this.props.actions.changeDate(match.params.date);
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  getSelectedRoomInfo = () => {
    const { rooms, selectedDate, selectedRoom } = this.props;
    return {
      info: rooms[selectedDate].find(({ name }) => selectedRoom === name),
    };
  }
  // Create sidebar of rooms for better UI
  // If room is selected create sidebar of rooms, otherwise spread cards
  getListStyle = () => {
    const { selectedRoom } = this.props;
    const listStyle = { xs: 12 };
    if (this.state.isMobile && selectedRoom) {
      listStyle.style = { display: 'none' };
    } else if (selectedRoom) {
      listStyle.md = 4;
    }
    listStyle.style = {
      ...listStyle.style,
      overflow: 'auto',
      height: deviceHelper.getWindowHeight() - (config.appbarHeight + 16),
    };
    return listStyle;
  }
  handleResize = () => {
    this.setState({
      isMobile: deviceHelper.isMobile(),
    });
  }
  // Change route on room selectiong
  handleRoomSelect = (roomName) => {
    const { match, actions } = this.props;
    actions.selectRoom(roomName);
    historyService.push({
      pathname: `/${match.params.date}/room/${roomName}`,
    });
  }
  // Show loading if room fetch request is in progress
  // Display Error if request throws error
  render() {
    const {
      rooms, selectedDate, areRoomsFetching, match,
      classes, selectedRoom, fetchError,
    } = this.props;
    const { date } = match.params;
    return (
      <div className={classes.root}>
        {
            areRoomsFetching || !selectedDate ? (
              <LinearProgress className={classes.progress} color="secondary" />
            ) : (
              <Grid container spacing={16}>
                <Grid item {...this.getListStyle()}>
                  <Grid
                    container
                    spacing={16}
                  >
                    {
                      fetchError
                        ? (<Error content={fetchError} />)
                        : rooms[selectedDate].map(roomInfo => (
                          <RoomSummary
                            key={roomInfo.name}
                            onRoomSelect={this.handleRoomSelect}
                            shouldStretch={!!(selectedRoom)}
                            isMobile={this.state.isMobile}
                            isSelectedRoom={!!(selectedRoom === roomInfo.name)}
                            {...roomInfo}
                          />
                        ))
                    }
                  </Grid>
                </Grid>
                <Grid item xs={12} md={8}>
                  {
                    !fetchError && selectedRoom ? (
                      <RoomDescriptionRoute
                        path={`/${date}/room/:roomId`}
                        props={{ ...this.getSelectedRoomInfo() }}
                      />
                    ) : null
                  }
                </Grid>
              </Grid>

            )
          }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  rooms: state.rooms,
  areRoomsFetching: state.areRoomsFetching,
  selectedDate: state.selectedDate,
  selectedRoom: state.selectedRoom,
  fetchError: state.fetchError,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(roomActions, dispatch),
});

RoomDescriptionRoute.propTypes = {
  props: PropTypes.object.isRequired,
};

RoomList.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object,
  classes: PropTypes.object.isRequired,
  rooms: PropTypes.object.isRequired,
  areRoomsFetching: PropTypes.bool.isRequired,
  selectedDate: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
  selectedRoom: PropTypes.string.isRequired,
  fetchError: PropTypes.any,
};

RoomList.defaultProps = {
  location: {},
  fetchError: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RoomList));

