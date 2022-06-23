import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';

import { saveSubscriptionDetails } from '../actions/bucketActions';


function ExperienceScreen() {

  const bucket = useSelector(state => state.bucket)
  const { subscriptionDetails } = bucket

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState(subscriptionDetails.name)
  const [email, setEmail] = useState(subscriptionDetails.email)

  const submitHandler = (e) => {
    e.preventDefault()
    
    dispatch(saveSubscriptionDetails({ name, email }))
    navigate('/')
  }

  return (
    <FormContainer>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
      <Form.Group controlId='name'>
          <Form.Control
            required
            type='text'
            placeholder='Enter name'
            value={name ? name : ''}
            onChange={(e) => setName(e.target.value)}
          >

          </Form.Control>
        </Form.Group>

        <Form.Group controlId='name'>
          <Form.Control
            required
            type='text'
            placeholder='Enter email'
            value={email ? email : ''}
            onChange={(e) => setEmail(e.target.value)}
          >

          </Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ExperienceScreen