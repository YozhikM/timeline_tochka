import React, { Fragment } from "react";

import TransactionElement from "../Elements/TransactionElement";
import NewsElement from "../Elements/NewsElement";

const Timeline = ({ events, onToggleVisibility, onRemove }) => (
  <Fragment>
    {events.map(event => {
      if (event.eventType === "transaction") {
        return (
          <TransactionElement
            key={event.id}
            event={event}
            onRemove={onRemove}
          />
        );
      }
      if (event.eventType === "news") {
        return (
          <NewsElement
            key={event.id}
            event={event}
            onToggleVisibility={onToggleVisibility}
          />
        );
      }
      return null;
    })}
  </Fragment>
);

export default Timeline;
