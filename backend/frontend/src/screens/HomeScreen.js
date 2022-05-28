import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import Activity from '../components/Activity';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listActivities } from '../actions/activityActions';

import './style.css';


function HomeScreen() {
  const dispatch = useDispatch()
  const activityList = useSelector(state => state.activityList)
  const { error, loading, activities } = activityList

  useEffect(() => {
    
    dispatch(listActivities())
    
  }, [dispatch])

  return (
    <div>
      <h1>Latest Activities</h1>
      {loading ? <Loader />
        : error ? <Message variant='danger'>{error}</Message>  
          :
          <Row>
            {activities.map(activity => (
              <Col key={activity._id} sm={12} md={6} lg={4} xl={3}>
                <Activity activity={activity} />
              </Col>
            ))}
          </Row>
      }
      
    </div>
  )
}

export default HomeScreen