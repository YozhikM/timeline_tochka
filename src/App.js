import React, { Component } from "react";

import Form from "./Components/Form";
import Timeline from "./Components/Timeline";
import Sort, { sortOptions } from "./Components/Sort";

import { mockEvents } from "./Utils/mocks";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: mockEvents,
      showedEvents: mockEvents,
      sortValue: sortOptions.dateAsc
    };
    this.onRemove = this.onRemove.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.applySort = this.applySort.bind(this);
    this.onChangeSortValue = this.onChangeSortValue.bind(this);
    this.onToggleVisibility = this.onToggleVisibility.bind(this);
  }

  componentDidMount() {
    this.applySort(this.state.events);
  }

  applySort(events) {
    const { sortValue } = this.state;
    if (sortValue === sortOptions.dateAsc) {
      const showedEvents = events.sort(
        (eventA, eventB) => eventB.date - eventA.date
      );
      this.setState({ showedEvents });
    }
    if (sortValue === sortOptions.dateDesc) {
      const showedEvents = events.sort(
        (eventA, eventB) => eventA.date - eventB.date
      );
      this.setState({ showedEvents });
    }
    if (sortValue === sortOptions.news) {
      const showedEvents = events.filter(event => event.eventType === "news");
      this.setState({ showedEvents });
    }
    if (sortValue === sortOptions.transactions) {
      const showedEvents = events.filter(
        event => event.eventType === "transaction"
      );
      this.setState({ showedEvents });
    }
  }

  onChangeSortValue(event) {
    this.setState({ sortValue: event.target.value }, () =>
      this.applySort(this.state.events)
    );
  }

  onRemove(eventId) {
    this.setState(prevState => {
      const events = prevState.events.slice().filter(ev => ev.id !== eventId);
      this.applySort(events);
      return { events };
    });
  }

  onToggleVisibility(eventId) {
    this.setState(prevState => {
      const events = prevState.events.slice();
      const event = events.find(ev => ev.id === eventId);
      const eventIndex = events.findIndex(ev => ev.id === eventId);
      const newEvent = { ...event, isHided: !event.isHided };
      events.splice(eventIndex, 1, newEvent);
      this.applySort(events);

      return { events };
    });
    this.applySort();
  }

  onSubmit(event) {
    this.setState(prevState => {
      const events = [event, ...prevState.events];
      this.applySort(events);
      return { events };
    });
  }

  render() {
    return (
      <div className="timeline_container">
        <Form onSubmit={this.onSubmit} />
        <Sort
          onChange={this.onChangeSortValue}
          sortValue={this.state.sortValue}
        />
        <Timeline
          events={this.state.showedEvents}
          onToggleVisibility={this.onToggleVisibility}
          onRemove={this.onRemove}
        />
      </div>
    );
  }
}
