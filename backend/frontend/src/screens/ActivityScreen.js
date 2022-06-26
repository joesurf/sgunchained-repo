import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';

import { listActivityDetails } from '../actions/activityActions';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';


function ActivityScreen() {
  const match = useParams()
  const navigate = useNavigate()

  const [quantity, setQuantity] = useState(1)

  const dispatch = useDispatch()
  const activityDetails = useSelector(state => state.activityDetails)
  const { loading, error, activity } = activityDetails

  useEffect(() => {
    
    dispatch(listActivityDetails(match.id))
    
  }, [dispatch, match])

  const addToBucketHandler = () => {
    navigate(`/bucket/${match.id}?quantity=${quantity}`)
  }

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

                    {/* <ListGroup.Item>
                      <Rating value={activity.rating} text={`${activity.numReviews} reviews`} color={`#f8e825`} />
                    </ListGroup.Item> */}

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

                      {/* <ListGroup.Item>
                        <Row>
                          <Col>Genre:</Col>
                          <Col>
                            {activity.genre}
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Row>
                          <Col>People:</Col>
                          <Col xs='auto' className='my-1'>
                            <Form.Control 
                              as="select" 
                              value={quantity} 
                              onChange={(e) => setQuantity(Number(e.target.value))}
                            >
                              {
                                [...Array(activity.numPeople).keys()].map((x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                ))
                              }

                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item> */}

                      <ListGroup.Item>
                        <Button 
                          onClick={addToBucketHandler}
                          className='btn-block' 
                          type='button'
                        >Add to Bucket</Button>
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