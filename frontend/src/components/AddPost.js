import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import {addPostRequest} from "../actions/posts";
import Col from 'react-bootstrap/lib/Col';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Button from 'react-bootstrap/lib/Button';

class AddPost extends React.Component{
  handleSubmit = (e) => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });
    values.id = ""+Math.floor((Math.random() * 100000) + 1);
    values.timestamp = ""+Date.now();
    this.props.addPostRequest(values,()=>{
      this.props.history.push('/'+values.category)
    });
  };
  goBack = ()=>{
    this.props.history.goBack();
  };
  render(){
    const {categories} = this.props;
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <div>
              <Col componentClass={ControlLabel}>
                <h4>Author</h4>
              </Col>
              <Col>
                <input required type='text' name='author' placeholder='Author'/>
              </Col>
            </div>
            <div>
              <Col componentClass={ControlLabel}>
                <h4>Title</h4>
              </Col>
              <Col>
                <input required type='text' name='title' placeholder='Title'/>
              </Col>
            </div>
            <div>
              <Col componentClass={ControlLabel}>
                <h4>Body</h4>
              </Col>
              <Col>
                <textarea type='text' name='body' placeholder='Body'/>
              </Col>
            </div>
            <div>
              <Col componentClass={ControlLabel}>
                <h4>Category</h4>
              </Col>
              <Col>
                {
                  categories && categories.map((value,index)=>(
                    <label key={index}>
                      <input required type="radio" name="category" value={value.name} style={{marginLeft:'10px'}}/><span style={{paddingLeft:'5px'}}>{value.name}</span>
                    </label>
                  ))
                }
              </Col>
            </div>
            <div>
              <Col componentClass={ControlLabel}>
                <Button bsStyle="success" type='submit'>Add Post</Button>
              </Col>
            </div>
            <div>
              <Col componentClass={ControlLabel}>
                <Button onClick={this.goBack}>Discard</Button>
              </Col>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state,ownProps){
  return {
    categories: state.categories.categories,
    history : ownProps.history
  }
}
export default connect(mapStateToProps,{addPostRequest})(AddPost)
