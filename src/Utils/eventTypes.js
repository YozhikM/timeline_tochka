export const eventTypes = {
  transaction: {
    sum: {
      label: "Сумма транзакции",
      required: true,
      auto: false,
      type: "number"
    },
    currency: {
      label: "Валюта",
      enum: ["RUB", "USD", "EUR"],
      required: true,
      auto: false
    },
    from: {
      label: "От кого транзакция",
      required: true,
      auto: false
    },
    desc: {
      label: "Описание",
      required: false,
      auto: false
    },
    type: {
      label: "Приход или расход",
      enum: ["Приход", "Расход"],
      required: true,
      auto: false
    },
    date: {
      label: "Дата",
      required: false,
      auto: true
    },
    eventType: {
      label: "Тип события",
      required: false,
      auto: true
    }
  },
  news: {
    title: {
      label: "Заголовок новости",
      required: true,
      auto: false
    },
    desc: {
      label: "Содержание новости",
      required: false,
      auto: false
    },
    date: {
      label: "Дата",
      required: false,
      auto: true
    },
    eventType: {
      label: "Тип события",
      required: false,
      auto: true
    }
  }
};

function getOptionsFromEventTypes() {
  return Object.keys(eventTypes).map(key => key);
}

export const options = getOptionsFromEventTypes();
