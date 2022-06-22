import React from "react";
import ReactDOM from "react-dom";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";

import { LeftArrow, RightArrow } from "../components/scrollbar/arrows";
import { Card } from "../components/scrollbar/card";
import "../components/scrollbar/globalStyles.css";
import usePreventBodyScroll from "../components/scrollbar/usePreventBodyScroll";

// NOTE: for hide scrollbar
import "../components/scrollbar/hideScrollbar.css";
// import "./firstItemMargin.css";

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

const elemPrefix = "test";
const getId = (index: number) => `${elemPrefix}${index}`;

const getItems = () =>
  Array(20)
    .fill(0)
    .map((_, ind) => ({ id: getId(ind) }));

const Arrows = () => (
  <div
    style={{
      width: "100%",
      display: "flex",
      justifyContent: "center"
    }}
  >
    Some other content
    <div style={{ marginLeft: "10px", display: "flex" }}>
      <LeftArrow /> <RightArrow />
    </div>
  </div>
);





function HorizontalScrollbar({items}) {
  const { disableScroll, enableScroll } = usePreventBodyScroll();

  return (
    <div>
      <div className="example" style={{ paddingTop: "50px", height: "30vh" }}>
        <div onMouseEnter={disableScroll} onMouseLeave={enableScroll}>
          <ScrollMenu
            // or on top
            // Header={Arrows}
            // Footer={Arrows}
            onWheel={onWheel}
          >
            {items.map(item => (
              <Card
                title={item._id}
                itemId={item._id} // NOTE: itemId is required for track items
                key={item._id}
                activity={item}
              />
            ))}
          </ScrollMenu>
        </div>
      </div>
    </div>
    
  )
}

export default HorizontalScrollbar;

function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}