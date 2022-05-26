import React, { useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import { addToExperience, removeFromExperience } from '../actions/experienceActions';


function ExperienceScreen() {
  const match = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  
  const quantity = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const experience = useSelector(state => state.experience)
  const { experienceItems } = experience

  useEffect(() => {
    if (match.id) {
      dispatch(addToExperience(match.id, quantity))
    }
  }, [dispatch, match, quantity])

  const removeFromExperienceHandler = (id) => {
    dispatch(removeFromExperience(id))
  }

  const checkoutHandler = () => {
    navigate('/login?redirect=trip')
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Experience Bucket</h1>
        {experienceItems.length === 0 ? (
          <Message variant='info'>
            Your bucket is empty. <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {experienceItems.map(item => (
              <ListGroup.Item key={item.activity}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>

                  <Col md={3}>
                    <Link to={`/product/${item.activity}`}>{item.name}</Link>
                  </Col>

                  <Col md={2}>
                    ${item.price}
                  </Col>

                  <Col md={3}>
                    <Form.Control 
                      as="select" 
                      value={item.quantity} 
                      onChange={(e) => dispatch(addToExperience(item.activity, Number(e.target.value)))}
                    >
                      {
                        [...Array(item.numPeople).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))
                      }

                    </Form.Control>
                  </Col>

                  <Col md={1}>
                    <Button 
                      type='button' 
                      variant='light' 
                      onClick={() => removeFromExperienceHandler(item.activity)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )
      }
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Subtotal ({experienceItems.reduce((acc, item) => acc + item.quantity, 0)}) items</h2>
              {experienceItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}
            </ListGroup.Item>
          </ListGroup>

          <ListGroup.Item>
            <Button 
              type='button' 
              className='btn-block'
              disabled={experienceItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed to Checkout
            </Button>
          </ListGroup.Item>
        </Card>
      </Col>
    </Row>
  )
}

export default ExperienceScreen