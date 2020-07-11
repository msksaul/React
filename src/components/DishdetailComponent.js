import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderDish({dish}) {
  return(
    <Card key={dish.id}>
      <CardImg width='100%' src={dish.image} alt={dish.name}/>
      <CardBody>
        <CardTitle><b>{dish.name}</b></CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  );
};

function GetYear(date) {
  return (
    date[0]+date[1]+date[2]+date[3]
  )
}

function GetMonth(date) {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return (
    monthNames[parseInt((date[5]+date[6])-1)]
  )
}

function GetDay(date) {
  return (
    date[8]+date[9]
  )
}

function RenderComments({comments}) {
  return(
    <div>
      <h4 id='header'>Comments</h4>
      {comments.map((comment) =>{
        if (comment != null) {
          // const options = { year: "numeric", month: "short", day: "numeric" };
          return (
            <ul key={comment.id} className='list-unstyled'>
              <li>{comment.comment}</li>
              <li>-- {comment.author}, {GetMonth(comment.date)} {GetDay(comment.date)}, {GetYear(comment.date)}</li>
              {/* <li>{new Date(comment.date).toLocaleDateString("en-US", options)}</li> */}
            </ul>
          )
          }
        else {
          return (
            <div></div>
          )
        }
      })
    }
    </div>
  );
}

const DishDetail = (props) => {
  if (props.dish !== undefined){
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
            <RenderComments comments={props.comments}/>
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