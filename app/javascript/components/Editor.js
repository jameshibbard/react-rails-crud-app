import React from 'react';
import axios from 'axios';
import Header from './Header';
import EventList from './EventList';

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: null,
    };
  }

  componentDidMount() {
    axios
      .get('/api/events.json')
      .then(response => this.setState({ events: response.data }))
      .catch(e => console.log(e));
  }

  render() {
    const { events } = this.state;
    if (events === null) return null;

    return (
      <div>
        <Header />
        <EventList events={events} />
      </div>
    );
  }
}

export default Editor;
