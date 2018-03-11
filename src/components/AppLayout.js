import React from 'react';
import PropTypes from 'prop-types';
import DateFilter from './DateFilter';
import config from '../config';

const styles = {
  appContainer: {
    paddingTop: config.appbarHeight,
  },
};

const AppLayout = props => (
  <div>
    <DateFilter />
    <section style={styles.appContainer}>
      {props.children}
    </section>
  </div>
);

AppLayout.propTypes = {
  children: PropTypes.object,
};

AppLayout.defaultProps = {
  children: null,
};

export default AppLayout;
