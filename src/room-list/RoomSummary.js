import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardHeader, CardMedia, CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import config from '../config';
import TimeBar from '../components/TimeBar';
import './room.css';

const RoomSummary = (props) => {
  const {
    name, avail, images, size, location, onRoomSelect,
    shouldStretch, isSelectedRoom, isMobile,
  } = props;
  const itemWidth = shouldStretch ? { xs: 12 } : {
    xs: 12, sm: 6, md: 4, lg: 3,
  };
  return (
    <Grid item {...itemWidth}>
      <Card
        className={`room-summary ${isSelectedRoom ? ' active' : ''}`}
        onClick={() => onRoomSelect(name)}
      >
        <CardHeader
          title={name}
          subheader={<TimeBar height="10px" availableTime={avail} />}
        />
        <CardMedia
          style={{ height: shouldStretch || isMobile ? '100px' : '200px' }}
          image={config.baseURL + images[0]}
          title={name}
        />
        <CardContent>
          <dl className="room-property">
            <Grid container spacing={16}>
              <Grid item xs={6}>
                <dt>Size</dt>
                <dd>{size}</dd>
              </Grid>
              <Grid item xs={6} className="room-property-location">
                <dt>Location</dt>
                <dd>{location}</dd>
              </Grid>
            </Grid>
          </dl>
        </CardContent>
      </Card>
    </Grid>
  );
};

RoomSummary.propTypes = {
  name: PropTypes.string.isRequired,
  onRoomSelect: PropTypes.func.isRequired,
  avail: PropTypes.array.isRequired,
  images: PropTypes.array.isRequired,
  size: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  shouldStretch: PropTypes.bool,
  isSelectedRoom: PropTypes.bool,
  isMobile: PropTypes.bool,
};

RoomSummary.defaultProps = {
  shouldStretch: false,
  isSelectedRoom: false,
  isMobile: false,
};

export default RoomSummary;
