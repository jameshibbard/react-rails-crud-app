import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class EventList extends React.Component {
  renderEvents() {
    const { events } = this.props;
    events.sort((a, b) => new Date(b.event_date) - new Date(a.event_date));

    return events.map(event => (
      <li key={event.id}>
        <Link to={`/events/${event.id}`}>
          {event.event_date}
          {' - '}
          {event.event_type}
        </Link>
      </li>
    ));
  }

  render() {
    return (
      <section className="eventList">
        <h2>Events</h2>
        <ul>{this.renderEvents()}</ul>
      </section>
    );
  }
}

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object),
};

EventList.defaultProps = {
  events: [],
};

export default EventList;
