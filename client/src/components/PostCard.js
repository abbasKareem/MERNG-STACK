import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Button, Card, Grid, Icon, Image, Label } from 'semantic-ui-react'
const PostCard = ({
  post: { body, createdAt, username, likeCount, commentCount, likes, id },
}) => {
  const likePost = () => {
    console.log('like Post')
  }
  const commentOnPost = () => {
    console.log('commentOnPost')
  }
  return (
    <Grid.Column>
      <Card fluid>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='https://react.semantic-ui.com/images/avatar/large/molly.png'
          />
          <Card.Header>{username}</Card.Header>
          <Card.Meta as={Link} to={`/posts/${id}`}>
            {moment(createdAt).fromNow(true)}
          </Card.Meta>
          <Card.Description>{body}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button as='div' labelPosition='right'>
            <Button color='teal' basic onClick={likePost}>
              <Icon name='heart' />
            </Button>
            <Label basic color='teal' pointing='left'>
              {likeCount}
            </Label>
          </Button>
          <Button as='div' labelPosition='right'>
            <Button color='blue' basic onClick={commentOnPost}>
              <Icon name='comments' />
            </Button>
            <Label basic color='blue' pointing='left'>
              {commentCount}
            </Label>
          </Button>
        </Card.Content>
      </Card>
    </Grid.Column>
  )
}

export default PostCard
