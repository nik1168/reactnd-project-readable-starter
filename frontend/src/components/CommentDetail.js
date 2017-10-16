import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import LikeIcon from 'react-icons/lib/md/thumb-up'
import DislikeIcon from 'react-icons/lib/md/thumb-down'
import EditIcon from 'react-icons/lib/md/mode-edit'
import DeleteIcon from 'react-icons/lib/md/delete'
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer'

class CommentDetail extends React.Component{

  voteOnComment = (comment,vote)=>{
    this.props.voteOnComment(comment,vote);
  };

  deleteComment = (id)=>{
    this.props.deleteComment(id);
  };

  render(){
    const {comment} = this.props;
    const BUTTON_GROUP_ICON_SIZE = 14;

    return(
      <div>
          <h4>{comment.author}</h4>
          <p>{comment.body}</p>
          <strong> VoteScore</strong>:{comment.voteScore}
        <br/>
        <ButtonGroup>
          <Button bsSize="small" onClick={() => this.voteOnComment(comment.id,'upVote')}><LikeIcon size={BUTTON_GROUP_ICON_SIZE}/> VoteUp</Button>
          <Button bsSize="small" onClick={() => this.voteOnComment(comment.id,'downVote')}><DislikeIcon size={BUTTON_GROUP_ICON_SIZE}/> VoteDown</Button>
          <LinkContainer to={'/editComment/'+comment.id+''}>
            <Button bsSize="small"><EditIcon size={BUTTON_GROUP_ICON_SIZE}/> Edit</Button>
          </LinkContainer>
          <Button bsSize="small" bsStyle="danger" onClick={() => this.deleteComment(comment.id)}><DeleteIcon size={BUTTON_GROUP_ICON_SIZE}/> Delete</Button>
        </ButtonGroup>

      </div>
    )
  }
}

export default CommentDetail
