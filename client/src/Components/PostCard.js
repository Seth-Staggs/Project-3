import React from 'react';
import { Card, Image, Button, Label, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

function PostCard({ post: { body, createdAt, id , username, likeCount, commentCount, likes}}){
    function likePost(){
        console.log('Like Post!');
    };
    function commentOnPost(){
        console.log('Commented');
    }
    return (
        <Card fluid >
      <Card.Content as={Link} to={`/pots/${id}`}>
        <Image
          floated='right'
          size='mini'
          src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.l_1cj46VhFEXmOPf3iUp0QHaHa%26pid%3DApi&f=1'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta >{moment(createdAt).fromNow(true)} ago</Card.Meta>
        <Card.Description >
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
      <Button as='div' labelPosition='right' onClick={likePost}>
      <Button color='green' basic>
        <Icon name='heart' />
      </Button>
      <Label  basic color='green' pointing='left'>
        {likeCount}
      </Label>
    </Button>
    <Button as='div' labelPosition='right' onClick={commentOnPost}>
      <Button color='brown' basic>
        <Icon name='comments' />
      </Button>
      <Label  basic color='brown' pointing='left'>
        {commentCount}
      </Label>
    </Button>
      </Card.Content>
    </Card>
    )
}

export default PostCard;