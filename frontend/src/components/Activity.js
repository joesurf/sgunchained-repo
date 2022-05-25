import React from "react";
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

function Activity({ activity }) {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/activity/${activity._id}`}>
        <Card.Img src={activity.image} />
      </Link>

      <Card.Body>
        <Link to={`/activity/${activity._id}`}>
          <Card.Title as="div">
            <strong>{activity.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <div className="my-3">
            {activity.rating} from {activity.numReviews} reviews
            <Rating value={activity.rating} text={`${activity.numReviews} reviews`} color={'#f8e825'} />
          </div>
        </Card.Text>

        <Card.Text as="h3">
          ${activity.price}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Activity;