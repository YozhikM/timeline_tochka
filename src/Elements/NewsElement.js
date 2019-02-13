import React, { Component } from "react"

class NewsElement extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isCollapsed: true
    }
    this.onToggleVisibility = this.onToggleVisibility.bind(this)
    this.onChangeCollapsedStatus = this.onChangeCollapsedStatus.bind(this)
  }

  onToggleVisibility() {
    this.props.onToggleVisibility(this.props.event.id)
  }

  onChangeCollapsedStatus() {
    this.setState(prevState => ({ isCollapsed: !prevState.isCollapsed }))
  }

  render() {
    const { event } = this.props
    const backgroundColor = event.isHided ? "#64B5F6" : "#1E88E5"
    return (
      <div className="timeline_item">
        <div className="timeline_item_milestone" />
        <div
          className="timeline_item_entry"
          style={{ backgroundColor }}
          onClick={this.onChangeCollapsedStatus}
        >
          <div className="timeline_item_header">
            <p className="timeline_item_heading">Новость</p>
            {!this.state.isCollapsed && (
              <p
                className="timeline_action_link"
                onClick={this.onToggleVisibility}
              >
                {event.isHided ? "Показать" : "Скрыть"}
              </p>
            )}
          </div>
          <p>{event.title}</p>
          {!this.state.isCollapsed && <p className="news_desc">{event.desc}</p>}
        </div>
      </div>
    )
  }
}

export default NewsElement
