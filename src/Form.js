import React, { Component } from "react"

import Button from "./Elements/Button"
import Label from "./Elements/Label"
import Select from "./Elements/Select"

import { eventTypes, options } from "./eventTypes"
import { generateUniqueId } from "./utils"

export default class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 0,
      eventType: "transaction",
      necessaryFields: []
    }
    this.onChange = this.onChange.bind(this)
    this.goNextStep = this.goNextStep.bind(this)
    this.renderStep = this.renderStep.bind(this)
    this.goPrevStep = this.goPrevStep.bind(this)
    this.createEvent = this.createEvent.bind(this)
    this.applyAutoFields = this.applyAutoFields.bind(this)
    this.setDefaultStateForSelect = this.setDefaultStateForSelect.bind(this)
  }

  goPrevStep() {
    this.setState(prevState => {
      return {
        step: prevState.step - 1
      }
    })
  }

  goNextStep() {
    this.setState(prevState => {
      return {
        step: prevState.step + 1
      }
    })
  }

  onChange(event) {
    let value = event.target.value
    const filteredNecessaryFields = this.state.necessaryFields.filter(
      fieldName => fieldName !== event.target.name
    )
    const selectedEvent = eventTypes[this.state.eventType]
    const fields = Object.keys(selectedEvent).map(key => {
      return {
        ...selectedEvent[key],
        fieldName: key
      }
    })

    const field = fields.find(f => f.fieldName === event.target.name)

    const isTypedField = !!field.type
    if (isTypedField) {
      if (field.type === "number") {
        value = parseFloat(value)
      }
    }
    this.setState({
      [event.target.name]: value,
      necessaryFields: filteredNecessaryFields
    })
  }

  setDefaultStateForSelect(field) {
    if (!this.state[field.fieldName]) {
      this.setState({ [field.fieldName]: field.enum[0] })
    }
  }

  applyAutoFields(event) {
    return {
      ...event,
      date: Date.now(),
      eventType: this.state.eventType,
      id: generateUniqueId()
    }
  }

  createEvent() {
    const selectedEvent = eventTypes[this.state.eventType]
    const fields = Object.keys(selectedEvent).map(key => {
      return {
        ...selectedEvent[key],
        fieldName: key
      }
    })

    const hasRequiredFields = fields
      .filter(field => field.required)
      .every(field => !!this.state[field.fieldName])

    if (!hasRequiredFields) {
      const necessaryFields = fields
        .filter(field => field.required && !this.state[field.fieldName])
        .map(field => field.fieldName)
      this.setState({ necessaryFields })
    }

    if (hasRequiredFields) {
      const fullfilledFields = fields
        .map(field => ({ [field.fieldName]: this.state[field.fieldName] }))
        .reduce((acc, curr) => {
          return { ...acc, ...curr }
        }, {})
      const event = this.applyAutoFields(fullfilledFields)
      this.setState({ step: 0 }, () => {
        this.props.onSubmit(event)
      })
    }
  }

  renderStep(step) {
    if (step === 0) {
      return <Button onClick={this.goNextStep} title="Создать событие" />
    }
    if (step === 1) {
      return (
        <div className="step">
          <Label text="Выберите тип события" />
          <Select
            name="eventType"
            value={this.state.eventType}
            onChange={this.onChange}
            options={options}
          />
          <div className="step_buttons_wrapper">
            <Button onClick={this.goPrevStep} title="Назад" />
            <Button onClick={this.goNextStep} title="Вперед" />
          </div>
        </div>
      )
    }
    if (step === 2) {
      const selectedEvent = eventTypes[this.state.eventType]
      const fields = Object.keys(selectedEvent)
        .map(key => {
          return {
            ...selectedEvent[key],
            fieldName: key
          }
        })
        .filter(field => {
          return !field.auto
        })

      return (
        <div className="step">
          {fields.map(field => {
            if (field.enum) {
              this.setDefaultStateForSelect(field)
              return (
                <div className="step" key={field.label}>
                  <Label text={field.label} />
                  <Select
                    value={this.state[field.fieldName]}
                    onChange={this.onChange}
                    options={field.enum}
                    name={field.fieldName}
                  />
                </div>
              )
            }
            const isRequiredError = this.state.necessaryFields.some(
              fieldName => fieldName === field.fieldName
            )
            const errorBorderStyle = {
              borderColor: "red"
            }
            return (
              <div className="step" key={field.label}>
                <Label text={field.label} />
                <input
                  name={field.fieldName}
                  value={this.state[field.fieldName] || ""}
                  onChange={this.onChange}
                  className="form_input"
                  style={isRequiredError ? errorBorderStyle : {}}
                />
              </div>
            )
          })}
          <div className="step_buttons_wrapper">
            <Button onClick={this.goPrevStep} title="Назад" />
            <Button onClick={this.createEvent} title="Создать" />
          </div>
        </div>
      )
    }
    return null
  }

  render() {
    const { step } = this.state
    return <div className="form_wrapper">{this.renderStep(step)}</div>
  }
}
