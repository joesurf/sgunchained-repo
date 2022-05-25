import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

import axios from 'axios';

import Activity from '../components/Activity';

function HomeScreen() {
  const [activities, setActivities] = useState([])

  useEffect(() => {
    
    async function fetchActivities() {
      const { data } = await axios.get('/api/activities/')
      setActivities(data)
    }

    fetchActivities()
    
  }, [])

  return (
    <div>
      <h1>Latest Activities</h1>
      <Row>
        {activities.map(activity => (
          <Col key={activity._id} sm={12} md={6} lg={4} xl={3}>
            <Activity activity={activity} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default HomeScreen