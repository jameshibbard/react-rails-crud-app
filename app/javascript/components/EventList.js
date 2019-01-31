import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class EventList extends React.Component {
  renderEvents() {
    const { activeId, events } = this.props;
    events.sort((a, b) => new Date(b.event_date) - new Date(a.event_date));

    return events.map(event => (
      <li key={event.id}>
        <Link to={`/events/${event.id}`} className={activeId === event.id ? 'active' : ''}>
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
        <h2>
          Events
          <Link to="/events/new">New Event</Link>
        </h2>
        <ul>{this.renderEvents()}</ul>
      </section>
    );
  }
}

EventList.propTypes = {
  activeId: PropTypes.number,
  events: PropTypes.arrayOf(PropTypes.object),
};

EventList.defaultProps = {
  activeId: undefined,
  events: [],
};

export default EventList;
