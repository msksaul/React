import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, 
         Modal, ModalHeader, ModalBody, FormGroup, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isModalOpen: false
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    this.props.postComment(this.props.dishId, values.rating, values.author, values.comment)
    this.toggleModal()
  } 

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }
  render(){
    return(
      <div>
        <Button onClick={this.toggleModal} outline color='secondary'>
          <span className='fa fa-pencil'></span> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label htmlFor='rating'>Rating</Label>
                <Control.select model='.rating' name='rating'
                  className='form-control'>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Control.select>
              </FormGroup>
              <FormGroup>
                <Label htmlFor='author'>Your Name</Label>
                <Control.text model='.author' id='author' name='author'
                  className='form-control'
                  validators={{
                      required, minLength: minLength(3), maxLength: maxLength(15)
                  }} 
                  placeholder='Your Name'/>
                <Errors className='text-danger' model='.author' show='touched'
                  messages={{
                      required:'Required ',
                      minLength: 'Must be greater the 2 characteres ',
                      maxLength: 'Must be 15 characteres or less'
                  }}>
                </Errors>
              </FormGroup>
              <FormGroup>
                <Label htmlFor='comment'>Comment</Label>
                <Control.textarea model='.comment' id='comment' name='comment' 
                  rows='6'
                  className='form-control'/>
              </FormGroup>
              <Button type='submit' value='submit' color='primary'>Submit</Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

function RenderDish({dish}) {
  return(
    <FadeTransform in
        transformProps={{
          exitTransform: 'scale(0.5) translateY(-50%)'
        }}>
      <Card key={dish.id}>
        <CardImg width='100%' src={baseUrl + dish.image} alt={dish.name}/>
        <CardBody>
          <CardTitle><b>{dish.name}</b></CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </FadeTransform>
  );
};

function RenderComments({comments, postComment, dishId}) {
  return(
    <div>
      <h4 id='header'>Comments</h4>
      <Stagger in>
      {comments.map((comment) =>{
        if (comment != null) {
          const options = { year: "numeric", month: "short", day: "numeric" };
          return (
            <Fade in>
            <ul key={comment.id} className='list-unstyled'>
              <li>{comment.comment}</li>
              <li>-- {comment.author}, {new Date(comment.date).toLocaleDateString("en-US", options)}</li>
            </ul>
            </Fade>
          )
          }
        else {
          return (
            <div></div>
          )
        }
      })
      }
      </Stagger>
      <CommentForm dishId={dishId} postComment={postComment}/>
    </div>
  );
}

const DishDetail = (props) => {
  if (props.isLoading) {
    return(
      <div className='container'>
        <div className='row'>
          <Loading/>
        </div>
      </div>
    );
  }
  else if (props.errMess) {
    return(
      <div className='container'>
        <div className='row'>
          <h4>{props.errMess}</h4>
        </div>
      </div>
    )
  }
  else if (props.dish !== undefined){
    return (
      <div className='container'>
        <div className='row'>
          <Breadcrumb>
            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className='col-12'>
            <h3>{props.dish.name}</h3>
            <hr/>
          </div>
        </div>
        <div className='row'>
          <div id='card' className='col-12 col-sm-12 col-md-5 m-1'>
            <RenderDish dish={props.dish}/>
          </div>
          <div id='comments' className='col-12 col-sm-12 col-md-5 m-1'>
            <RenderComments comments={props.comments} 
                            postComment={props.postComment}
                            dishId={props.dish.id}/>
          </div>
        </div>
      </div>
    );
  }
  else {
    return (
      <div></div>
    )
  }
  }

export default DishDetail;