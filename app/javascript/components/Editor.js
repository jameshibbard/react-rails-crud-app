/* global window */

import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import Event from './Event';
import EventForm from './EventForm';
import EventList from './EventList';
import Header from './Header';
import PropsRoute from './PropsRoute';
import { success } from '../helpers/notifications';
import { handleAjaxError } from '../helpers/helpers';

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: null,
    };

    this.addEvent = this.addEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
  }

  componentDidMount() {
    axios
      .get('/api/events.json')
      .then(response => this.setState({ events: response.data }))
      .catch(handleAjaxError);
  }

  addEvent(newEvent) {
    axios
      .post('/api/events.json', newEvent)
      .then((response) => {
        success('Event Added!');
        const savedEvent = response.data;
        this.setState(prevState => ({
          events: [...prevState.events, savedEvent],
        }));
        const { history } = this.props;
        history.push(`/events/${savedEvent.id}`);
      })
      .catch(handleAjaxError);
  }

  deleteEvent(eventId) {
    const sure = window.confirm('Are you sure?');
    if (sure) {
      axios
        .delete(`/api/events/${eventId}.json`)
        .then((response) => {
          if (response.status === 204) {
            success('Event deleted successfully');
            const { history } = this.props;
            history.push('/events');

            const { events } = this.state;
            this.setState({ events: events.filter(event => event.id !== eventId) });
          }
        })
        .catch(handleAjaxError);
    }
  }

  updateEvent(updatedEvent) {
    axios
      .put(`/api/events/${updatedEvent.id}.json`, updatedEvent)
      .then(() => {
        success('Event updated');
        const { events } = this.state;
        const idx = events.findIndex(event => event.id === updatedEvent.id);
        events[idx] = updatedEvent;
        const { history } = this.props;
        history.push(`/events/${updatedEvent.id}`);
        this.setState({ events });
      })
      .catch(handleAjaxError);
  }

  render() {
    const { events } = this.state;
    if (events === null) return null;

    const { match } = this.props;
    const eventId = match.params.id;
    const event = events.find(e => e.id === Number(eventId));

    return (
      <div>
        <Header />
        <div className="grid">
          <EventList events={events} activeId={Number(eventId)} />
          <Switch>
            <PropsRoute path="/events/new" component={EventForm} onSubmit={this.addEvent} />
            <PropsRoute
              exact
              path="/events/:id/edit"
              component={EventForm}
              event={event}
              onSubmit={this.updateEvent}
            />
            <PropsRoute
              path="/events/:id"
              component={Event}
              event={event}
              onDelete={this.deleteEvent}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

Editor.propTypes = {
  match: PropTypes.shape(),
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

Editor.defaultProps = {
  match: undefined,
};

export default Editor;
