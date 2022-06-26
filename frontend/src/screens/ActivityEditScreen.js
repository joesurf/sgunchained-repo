import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';

import { listActivityDetails, updateActivity } from '../actions/activityActions';
import { ACTIVITY_UPDATE_RESET } from '../constants/activityConstants'


function ActivityEditScreen() {

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState('')
  const [uploading, setUploading] = useState(false)

  const match = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const activityId = match.id

  const activityDetails = useSelector(state => state.activityDetails)
  const { error, loading, activity } = activityDetails

  const activityUpdate = useSelector(state => state.activityUpdate)
  const { error:errorUpdate, loading:loadingUpdate, success:successUpdate } = activityUpdate

  useEffect(() => {

    if (successUpdate) {
      dispatch({ type: ACTIVITY_UPDATE_RESET })
      navigate('/admin/activitylist')
    } else {
      if (!activity.name || activity._id !== Number(activityId)) {
        dispatch(listActivityDetails(activityId))
      } else {
        setName(activity.name)
        setPrice(activity.price)
        setImage(activity.image)
        setDescription(activity.description)
        setTags(activity.tags)
      }
    }

  }, [dispatch, activity, activityId, successUpdate, navigate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateActivity({
      _id: activityId,
      name,
      price,
      image,
      description,
      tags,
    }))
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()

    formData.append('image', file)
    formData.append('activity_id', activityId)

    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      const { data } = await axios.post(
        `/api/activities/upload/`,
        formData,
        config
      )

      setImage(data)
      setUploading(false)

    } catch (error) {
      setUploading(false)
    }
  }

  return (
    <div>
      <Link to='/admin/activitylist'>
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit Activity</h1>
        {loadingUpdate && <Loader/>}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

        {loading 
          ? <Loader/> : 
            error 
              ? <Message variant='danger'>{error}</Message> :
                (
                  <Form onSubmit={submitHandler}>

                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type='name'
                          placeholder='Enter Name'
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId='image'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                          type='text'
                          value={image}
                          disabled
                        >
                        </Form.Control>
                        <Form.Control
                          type='file'
                          label='Choose File'
                          onChange={uploadFileHandler}
                        >
                        </Form.Control>

                        {uploading && <Loader />}

                      </Form.Group>

                      <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='Enter description'
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        >
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId='price'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                          type='number'
                          placeholder='Enter price'
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        >
                        </Form.Control>
                      </Form.Group>

                      {/* <Form.Group controlId='tags'>
                        <Form.Label>Tags</Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='Enter tags'
                          value={tags}
                          onChange={(e) => setTags(e.target.value)}
                        >
                        </Form.Control>
                      </Form.Group> */}

                      <Button type='submit' variant='primary'>
                        Update
                      </Button>
                      
                    </Form>
                )
        }
        

      </FormContainer>
    </div>
  )
}

export default ActivityEditScreen;