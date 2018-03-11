import React from 'react';
import PropTypes from 'prop-types';
import Card from 'material-ui/Card';

const styles = {
  error: {
    color: 'red',
    width: '100%',
  },
  card: {
    width: '100%',
    padding: '16px',
  },
};

const Error = ({ content }) => (
  <section style={styles.error}>
    <Card style={styles.card}>
      {JSON.stringify(content)}
    </Card>
  </section>
);

Error.propTypes = {
  content: PropTypes.any,
};

Error.defaultProps = {
  content: null,
};

export default Error;
