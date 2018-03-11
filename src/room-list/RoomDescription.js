import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import TimeBar from '../components/TimeBar';
import Carousel from '../components/Carousel';
import './room.css';

const styles = () => ({
  media: {
    height: 194,
  },
  actions: {
    display: 'flex',
  },
  roomSize: {
    width: '50%',
  },
  roomLocation: {
    textAlign: 'right',
    width: '50%',
  },
  roomCard: {
    width: '100%',
  },
});

const RoomDescription = ({ info, classes }) => {
  const {
    name, avail, images, size, capacity, location, equipment,
  } = info;
  return (
    <Card className={classes.roomCard}>
      <CardHeader
        title={name}
        subheader={<TimeBar height="10px" availableTime={avail} />}
      />
      <CardContent>
        <Carousel images={images} />
        <header className="room-description-title">
          Room Information
        </header>
        <table className="room-description-table">
          <tbody>
            <tr>
              <th>Size</th>
              <td>{size}</td>
            </tr>
            <tr>
              <th>Capacity</th>
              <td>{capacity}</td>
            </tr>
            <tr>
              <th>Room location</th>
              <td>{location}</td>
            </tr>
          </tbody>
        </table>
        <Divider />
        <header className="room-description-title">
          Room Equipments
        </header>
        <table className="room-description-table">
          <tbody>
            {
              equipment.map(item => (
                <tr key={item} ><td>{item}</td></tr>
              ))
            }
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

RoomDescription.propTypes = {
  info: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RoomDescription);
