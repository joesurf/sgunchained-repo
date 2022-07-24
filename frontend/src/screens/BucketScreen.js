import React, { useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import { addToBucket, removeFromBucket } from '../actions/bucketActions';

import jsPDF from 'jspdf';
import travel from '../assets/travel.jpeg';
import note from '../assets/note.jpeg';


function BucketScreen() {
  const match = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  
  const quantity = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const bucket = useSelector(state => state.bucket)
  const { bucketItems } = bucket

  useEffect(() => {
    if (match.id) {
      dispatch(addToBucket(match.id, quantity))
    }
  }, [dispatch, match, quantity])

  const removeFromBucketHandler = (id) => {
    dispatch(removeFromBucket(id))
  }

  const pdfGenerate = () => {
    const doc = new jsPDF('portrait', 'px', 'a4', 'false')
    doc.addImage(travel, 'jpeg', 0, 0, 1080, 1350)
    doc.setFont('calibri', 'bold')
    doc.text(130, 40, 'An Amazing Journey Awaits You')

    let x = 110

    for (let i = 0; i < bucketItems.length; i++) {

      if (i % 3 == 0 && i != 0) {
        doc.addPage('portrait', 'a4')
        doc.addImage(travel, 'jpeg', 0, 0, 1080, 1350)
      }
      
      const activity = bucketItems[i]

      doc.addImage(note, 'jpeg', 15, 70+(i%3)*x, 160, 90)
      doc.setFontSize(15)
      doc.text(activity.name, 
        180, 80+(i%3)*x, {maxWidth: 250})
      doc.setFontSize(10)
      doc.text(activity.name, 
        180, 90+(i%3)*x, {maxWidth: 250})

    }
    doc.save('unchained.pdf')
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Bucket</h1>
        {bucketItems.length === 0 ? (
          <Message variant='info'>
            Your bucket is empty. <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {bucketItems.map(item => (
              <ListGroup.Item key={item.activity}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>

                  <Col md={3}>
                    <Link to={`/activity/${item.activity}`}>{item.name}</Link>
                  </Col>

                  <Col md={2}>
                    ${item.price}
                  </Col>

                  <Col md={3}>
                    <Form.Control 
                      as="select" 
                      value={item.quantity} 
                      onChange={(e) => dispatch(addToBucket(item.activity, Number(e.target.value)))}
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
                      onClick={() => removeFromBucketHandler(item.activity)}
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
              <h2>Subtotal ({bucketItems.reduce((acc, item) => acc + item.quantity, 0)}) items</h2>
              {bucketItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}
            </ListGroup.Item>
          </ListGroup>

          <ListGroup.Item>
            <Button 
              type='button' 
              className='btn-block'
              disabled={bucketItems.length === 0}
              onClick={pdfGenerate}
            >
              Download PDF
            </Button>
          </ListGroup.Item>
        </Card>
      </Col>
    </Row>
  )
}

export default BucketScreen;