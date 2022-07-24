import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';

import { addToBucket, removeFromBucket } from '../../actions/bucketActions';
import { useDispatch } from 'react-redux';


import { VisibilityContext } from "react-horizontal-scrolling-menu";

import frame from '../../assets/frame.png';
import './card.css';

export function Card({ title, itemId, activity }) {
  const visibility = React.useContext(VisibilityContext);

  const visible = visibility.isItemVisible(itemId);

  const [dropdown, setDropdown] = useState(false);
  const [value, setValue] = useState(0); // integer state


  const dispatch = useDispatch()


  const onMouseEnter = () => {
    setDropdown(true);
  }

  const onMouseLeave = () => {
    setDropdown(false);
  }

  const addToBucketHandler = () => {
    dispatch(addToBucket(activity._id, 1))
    const forceUpdate = setValue(value+1);
  }


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
      className={dropdown ? "dropdown active" : "dropdown"}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div>
        {/* <div>{activity.name}</div>
        <div style={{ backgroundColor: visible ? "transparent" : "gray" }}>
          visible: {JSON.stringify(visible)}
        </div> */}
      </div>
      <div>
        <Link to=''>  {/*to={`/activity/${activity._id}`}*/}
          <div className="frame">
            <img className="frame1" src={frame} width="300" height="200" />
            <img className="frame2" src={activity.image} width="285" height="135" />
          </div>
        </Link>
      </div>
      {dropdown && 
        <div
          className="dropdown__items"
        >
          <Row>
            <Col md={12}>
              <div className="dropdown__item">
                { activity.name }
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Button 
                onClick={addToBucketHandler}
                className='btn-block dropdown__item' 
                type='button'
                disabled=
                { 
                  false && JSON.parse(localStorage.getItem('bucketItems'))
                  .map(element => element.activity).includes(activity._id)
                }
              >
                { 
                  false && JSON.parse(localStorage.getItem('bucketItems'))
                  .map(element => element.activity).includes(activity._id)
                    ? 'Added'
                    : 'Add to Bucket'
                }
              </Button>
            </Col>
          </Row>
        </div>
      }
    </div>
  );
}

