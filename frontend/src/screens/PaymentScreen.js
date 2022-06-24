import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';

import { savePaymentMethod } from '../actions/bucketActions';


function PaymentScreen() {

  const bucket = useSelector(state => state.bucket)
  const { subscriptionDetails } = bucket

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [paymentMethod, setPaymentMethod] = useState('Paypal')

  if (!subscriptionDetails.email) {
    navigate('/experience')
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/')
  }

  return (
    <FormContainer>
      <Form onSubmit={submitHandler}>

        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
          <Form.Check
            type="radio"
            label="PayPal or Credit Card"
            id="paypal"
            name="paymentMethod"
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          >

          </Form.Check>
            
          </Col>

        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
      
    </FormContainer>
  )
}

export default PaymentScreen