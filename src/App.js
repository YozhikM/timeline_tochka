import React, { Component } from "react"
import "./Timeline.css"

import Form from "./Form"
import Timeline from "./Timeline"

import { mockEvents } from "./mocks"

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: mockEvents
    }
    this.onRemove = this.onRemove.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onToggleVisibility = this.onToggleVisibility.bind(this)
  }

  onRemove(eventId) {
    this.setState(prevState => {
      const events = prevState.events.slice().filter(ev => ev.id !== eventId)
      return { events }
    })
  }

  onToggleVisibility(eventId) {
    this.setState(prevState => {
      const events = prevState.events.slice()
      const event = events.find(ev => ev.id === eventId)
      const eventIndex = events.findIndex(ev => ev.id === eventId)
      const newEvent = { ...event, isHided: !event.isHided }
      events.splice(eventIndex, 1, newEvent)

      return { events }
    })
  }

  onSubmit(event) {
    this.setState(prevState => ({
      events: [event, ...prevState.events]
    }))
  }

  render() {
    return (
      <div className="timeline_container">
        <Form onSubmit={this.onSubmit} />
        <Timeline
          events={this.state.events}
          onToggleVisibility={this.onToggleVisibility}
          onRemove={this.onRemove}
        />
      </div>
    )
  }
}
