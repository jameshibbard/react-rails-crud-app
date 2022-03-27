/* global window */

import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header';
import Event from './Event';
import EventForm from './EventForm';
import EventList from './EventList';
import { success } from '../helpers/notifications';
import { handleAjaxError } from '../helpers/helpers';

const Editor = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.fetch('/api/events.json');
        if (!response.ok) throw Error(response.statusText);

        const data = await response.json();
        setEvents(data);
      } catch (error) {
        handleAjaxError(error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const addEvent = async (newEvent) => {
    try {
      const response = await window.fetch('/api/events.json', {
        method: 'POST',
        body: JSON.stringify(newEvent),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw Error(response.statusText);

      const savedEvent = await response.json();
      const newEvents = [...events, savedEvent];
      setEvents(newEvents);
      success('Event Added!');
      navigate(`/events/${savedEvent.id}`);
    } catch (error) {
      handleAjaxError(error);
    }
  };

  const deleteEvent = async (eventId) => {
    const sure = window.confirm('Are you sure?');

    if (sure) {
      try {
        const response = await window.fetch(`/api/events/${eventId}.json`, {
          method: 'DELETE',
        });

        if (!response.ok) throw Error(response.statusText);

        if (response.status === 204) {
          success('Event deleted');
          navigate('/events');
          setEvents(events.filter(event => event.id !== eventId));
        }
      } catch (error) {
        handleAjaxError(error);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="grid">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <EventList events={events} />

            <Routes>
              <Route path="new" element={<EventForm onSave={addEvent} />} />
              <Route path=":id" element={<Event events={events} onDelete={deleteEvent} />} />
            </Routes>
          </>
        )}
      </div>
    </>
  );
};

export default Editor;
