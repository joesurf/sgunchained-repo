import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import Activity from '../components/Activity';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listActivities } from '../actions/activityActions';
import HorizontalScrollbar from '../components/HorizontalScrollbar';

function HomeScreen() {

  const match = useParams()
  const dispatch = useDispatch()
  const activityList = useSelector(state => state.activityList)
  const { error, loading, activities } = activityList

  useEffect(() => {

    const tag = match.tag ? match.tag : "";    
    dispatch(listActivities(tag))
    
  }, [dispatch, match])

  return (
    <div>
      <Row>
        {
          match.tag ? <h1 className="font">{match.tag}</h1>
            : <h1 className="font">Seize the day</h1>
        }
      </Row>
      <Row>
        {loading ? <Loader />
          : error ? <Message variant='danger'>{error}</Message>  
            :
            <HorizontalScrollbar items={activities} />

            // <Row>
            //   {activities.map(activity => (
            //     <Col key={activity._id} sm={12} md={6} lg={4} xl={3}>
            //       <Activity activity={activity} />
            //     </Col>
            //   ))}
            // </Row>
        }
      </Row>
      <Row>
        <h5 className="font">Here's to an unforgettable experience...</h5>
      </Row>
    </div>
  )
}

export default HomeScreen