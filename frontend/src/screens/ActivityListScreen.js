import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../components/Loader';
import Message from '../components/Message';

import { listActivities, deleteActivity, createActivity } from '../actions/activityActions';
import { ACTIVITY_CREATE_RESET } from '../constants/activityConstants'


function ActivityListScreen() {

  const match = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const activityList = useSelector(state => state.activityList)
  const { loading, error, activities } = activityList

  const activityDelete = useSelector(state => state.activityDelete)
  const { loading:loadingDelete, error:errorDelete, success:successDelete } = activityDelete

  const activityCreate = useSelector(state => state.activityCreate)
  const { loading:loadingCreate, error:errorCreate, success:successCreate, product:createdActivity } = activityCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin


  useEffect(() => {
    dispatch({ type: ACTIVITY_CREATE_RESET })

    if (!userInfo.isAdmin) {
      navigate('/login')
    }

    if (successCreate) {
      navigate(`/admin/activity/${createdActivity._id}/edit`)
    } else {
      dispatch(listActivities())
    }
  }, [dispatch, navigate, userInfo, successDelete, successCreate, createdActivity])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteActivity(id))
    }
  }

  const createActivityHandler = () => {
    dispatch(createActivity())
  }


  return (
    <div>
      <Row className='align-items-center'>
        <Col>
          <h1>Activities</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createActivityHandler}>
            <i className='fas fa-plus'></i>Create Activity
          </Button>
        </Col>
      </Row>

      {loadingDelete && <Loader/>}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

      {loadingCreate && <Loader/>}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

      {loading
        ? (<Loader />)
        : error
          ? (<Message variant='danger'>{error}</Message>)
          : (
              <Table striped bordered hover responsive className='table-sm'>

                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>TAGS</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {activities.map(activity => (
                    <tr key={activity._id}>
                      <td>{activity._id}</td>
                      <td>{activity.name}</td>
                      <td>{activity.price}</td>
                      <td>{activity.tags}</td>

                      <td>
                        <LinkContainer to={`/admin/activity/${activity._id}/edit`}>
                          <Button variant='light' className='btn-sm'>
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>

                        <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(activity._id)}>
                          <i className='fas fa-trash'></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </Table>
          )
      }
    </div>
  )
}

export default ActivityListScreen