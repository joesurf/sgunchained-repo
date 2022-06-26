import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Activity from '../components/Activity';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listActivities } from '../actions/activityActions';

import HorizontalScrollbar from '../components/HorizontalScrollbar';
import MusicPlayer from '../components/MusicPlayer';


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
  },
  {
    '_id': '4',
    'button': 'chasing the sun',
    'value': "chasing-the-sun"
  },
  {
    '_id': '5',
    'button': 'me, myself and i',
    'value': "me-myself-and-i"
  }
]


function LandingScreen() {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const [tag, setTag] = useState('')

  const activityList = useSelector(state => state.activityList)
  const { error, loading, activities } = activityList

  useEffect(() => {

    dispatch(listActivities(tag))
    
  }, [dispatch, tag])


  return (
    <div>
      <h1 className="title">What's the vibe today?</h1>

      <Row>
        {shuffle(tags).slice(0, 3).map(tag => (
          <Col key={tag._id} >
            <button
              type="button"
              name="button"
              className="btn-3d-1"
              onClick={() => setTag(tag.value)}
            >
              <h5 className='buttontext'>{tag.button}</h5>
            </button>

              {/* <Button
                variant="warning"
                //onClick={tagSelector}
                className='btn btn-outline' 
                type='button' >
                <h5 className='buttontext'>{tag.value}</h5>
              </Button> */}
          </Col>
        ))}
      </Row>

      <h5 className="normaltext">Here's to an unforgettable experience...</h5>

      <Row>
        {loading ? <Loader />
          : error ? <Message variant='danger'>{error}</Message>  
            :
            <HorizontalScrollbar items={shuffle(activities).slice(0, 9)} />
        }
      </Row>
      <MusicPlayer></MusicPlayer>
    </div>
  )
}

export default LandingScreen


function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex != 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}