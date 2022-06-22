import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';

const tags = [
  {
    '_id': '1',
    'value': "popular"
  },
  {
    '_id': '2',
    'value': "cheap"
  },
  {
    '_id': '3',
    'value': "unconventional"
  }
]



function LandingScreen() {
  const navigate = useNavigate()

  const tagSelector = () => {

    // Maybe dispatch the tag name
  }

  return (
    <div>
      <h1 className="title">What's the vibe today?</h1>

      <Row>
        {tags.map(tag => (
          <Col key={tag._id} >
            <Link to={`/home/${tag.value}`}>
              <Button
                variant="warning"
                //onClick={tagSelector}
                className='btn btn-outline' 
                type='button' >
                <h5 className='buttontext'>{tag.value}</h5>
              </Button>
            </Link>
          </Col>
        ))}
      </Row>

      <h5 className="normaltext">Here's to an unforgettable experience...</h5>
    </div>
  )
}

export default LandingScreen