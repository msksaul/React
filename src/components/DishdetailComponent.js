import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap'

class DishDetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  renderDish(dish) {
      return(
        <Card>
          <CardImg width='100%' src={dish.image} alt={dish.name}/>
          <CardBody>
            <CardTitle><b>{dish.name}</b></CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      );
  }

  getYear(date) {
    return (
      date[0]+date[1]+date[2]+date[3]
    )
  }

  getMonth(date) {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return (
      monthNames[parseInt((date[5]+date[6])-1)]
    )
  }

  getDay(date) {
    return (
      date[8]+date[9]
    )
  }

  renderComments(dish) {
    return(
      <div key={dish.id}>
        <h4 id='header'>Comments</h4>
        {dish.comments.map((comment) =>{
          if (comment != null) {
            return (
              <ul key={comment.id} className='list-unstyled'>
                <li>{comment.comment}</li>
                <li>-- {comment.author}, {this.getMonth(comment.date)} {this.getDay(comment.date)}, {this.getYear(comment.date)}</li>
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

  render() {

    return (
      <div className='container'>
        <div className='row'>
          <div id='card' className='col-12 col-sm-12 col-md-5 m-1'>
            {this.renderDish(this.props.dish)}
          </div>
          <div id='comments' className='col-12 col-sm-12 col-md-5 m-1'>
            {this.renderComments(this.props.dish)}
          </div>
        </div>
      </div>
    );
  }
}

export default DishDetail;