import React from 'react';
import PropTypes from 'prop-types';

const Event = ({ event }) => (
  <div className="eventContainer">
    <h2>
      {event.event_date}
      {' - '}
      {event.event_type}
    </h2>
    <ul>
      <li>
        <strong>Type:</strong>
        {' '}
        {event.event_type}
      </li>
      <li>
        <strong>Date:</strong>
        {' '}
        {event.event_date}
      </li>
      <li>
        <strong>Title:</strong>
        {' '}
        {event.title}
      </li>
      <li>
        <strong>Speaker:</strong>
        {' '}
        {event.speaker}
      </li>
      <li>
        <strong>Host:</strong>
        {' '}
        {event.host}
      </li>
      <li>
        <strong>Published:</strong>
        {' '}
        {event.published ? 'yes' : 'no'}
      </li>
    </ul>
  </div>
);

Event.propTypes = {
  event: PropTypes.shape(),
};

Event.defaultProps = {
  event: undefined,
};

export default Event;
