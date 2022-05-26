import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap';

import { listActivityDetails } from '../actions/activityActions';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';


function ActivityScreen() {
  const match = useParams()

  const dispatch = useDispatch()
  const activityDetails = useSelector(state => state.activityDetails)
  const { loading, error, activity } = activityDetails

  useEffect(() => {
    
    dispatch(listActivityDetails(match.id))
    
  }, [dispatch, match.id])

  return (
    <div>
      <Link to='/' className='btn btn-light my-3'>Go Back</Link>
      {loading ? <Loader />
        : error ? <Message variant='danger'>{error}</Message>  
          : (
              <Row>
                <Col md={6}>
                  <Image src={activity.image} alt={activity.name} fluid />
                </Col>

                <Col md={3}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h3>{activity.name}</h3>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Rating value={activity.rating} text={`${activity.numReviews} reviews`} color={`#f8e825`} />
                    </ListGroup.Item>

                    <ListGroup.Item>
                      Price: ${activity.price}
                    </ListGroup.Item>

                    <ListGroup.Item>
                      Description: {activity.description}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>

                <Col md={3}>
                  <Card>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                          <Col>Price:</Col>
                          <Col>
                            <strong>${activity.price}</strong>  
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Row>
                          <Col>Genre:</Col>
                          <Col>
                            {activity.genre}
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Button className='btn-block' type='button'>Add to Experience</Button>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
            )
      }
    </div>
  )
}

export default ActivityScreen