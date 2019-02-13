import React, { Component } from "react"

import { formatDate } from "../utils"

class TransactionElement extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isCollapsed: true
    }
    this.onRemove = this.onRemove.bind(this)
    this.onChangeCollapsedStatus = this.onChangeCollapsedStatus.bind(this)
  }

  onRemove() {
    this.props.onRemove(this.props.event.id)
  }

  onChangeCollapsedStatus() {
    this.setState(prevState => ({ isCollapsed: !prevState.isCollapsed }))
  }

  render() {
    const { event } = this.props
    const eventTypeSymbol = event.type === "Приход" ? "+" : "-"
    const backgroundColor = event.type === "Приход" ? "#43A047" : "#E53935"
    return (
      <div className="timeline_item">
        <div className="timeline_item_milestone" />
        <div
          className="timeline_item_entry"
          style={{ backgroundColor }}
          onClick={this.onChangeCollapsedStatus}
        >
          <div className="timeline_item_header">
            <p className="timeline_item_heading">Транзакция</p>
            {!this.state.isCollapsed && (
              <p className="timeline_action_link" onClick={this.onRemove}>
                Удалить
              </p>
            )}
          </div>
          <p>{`${eventTypeSymbol}${event.sum}${event.currency}`}</p>
          <p>{formatDate(event.date)}</p>
          <p>{event.from}</p>
          {!this.state.isCollapsed && <p>{event.desc}</p>}
        </div>
      </div>
    )
  }
}

export default TransactionElement
