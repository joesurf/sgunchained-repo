import React from "react";
import { Link } from 'react-router-dom';

import { VisibilityContext } from "react-horizontal-scrolling-menu";

import frame from '../../assets/frame.png';
import './card.css';

export function Card({ title, itemId, activity }) {
  const visibility = React.useContext(VisibilityContext);

  const visible = visibility.isItemVisible(itemId);

  return (
    <div
      role="button"
      style={{
        border: "0px solid",
        display: "inline-block",
        margin: "0 0px",
        width: "300px",
        userSelect: "none"
      }}
      tabIndex={0}
      className="card"
    >
      <div>
        {/* <div>{activity.name}</div>
        <div style={{ backgroundColor: visible ? "transparent" : "gray" }}>
          visible: {JSON.stringify(visible)}
        </div> */}
      </div>
      <div>
        <Link to={`/activity/${activity._id}`}>
          <div className="frame">
            <img className="frame1" src={frame} width="300" height="200" />
            <img className="frame2" src={activity.image} width="285" height="135" />
          </div>
        </Link>
      </div>
    </div>
  );
}
