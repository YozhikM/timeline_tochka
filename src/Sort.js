import React from "react"

import Select from "./Elements/Select"

export const sortOptions = {
  dateAsc: "Сначала новые",
  dateDesc: "Сначала старые",
  transactions: "Только транзакции",
  news: "Только новости"
}

const Sort = ({ sortValue, onChange }) => {
  const options = Object.keys(sortOptions).map(key => sortOptions[key])

  return (
    <Select
      options={options}
      name="sortValue"
      value={sortValue}
      onChange={onChange}
    />
  )
}

export default Sort
