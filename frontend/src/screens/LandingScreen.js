import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';

const tags = [
  {
    '_id': '1',
    'button': "young, dumb & broke",
    'value': "young-dumb-broke"
  },
  {
    '_id': '2',
    'button': 'just imagine it',
    'value': "just-imagine-it"
  },
  {
    '_id': '3',
    'button': 'perfect strangers',
    'value': "perfect-strangers"
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
              <button
                type="button"
                name="button"
                className="btn-3d-1">
                <h5 className='buttontext'>{tag.button}</h5>
              </button>

              {/* <Button
                variant="warning"
                //onClick={tagSelector}
                className='btn btn-outline' 
                type='button' >
                <h5 className='buttontext'>{tag.value}</h5>
              </Button> */}
            </Link>
          </Col>
        ))}
      </Row>

      <h5 className="normaltext">Here's to an unforgettable experience...</h5>
    </div>
  )
}

export default LandingScreen