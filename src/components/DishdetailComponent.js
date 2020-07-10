import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap'

class DishDetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    console.log('Dishdetail component componentDidMount is invoked')
  }

  componentDidUpdate() {
    console.log('Dishdetail component componentDidUpdate is invoked')
  }

  renderDish(dish) {
    if (dish !== undefined) {
      return(
        <Card key={dish.id}>
          <CardImg width='100%' src={dish.image} alt={dish.name}/>
          <CardBody>
            <CardTitle><b>{dish.name}</b></CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      );
    }
    else {
      return (
        <div></div>
      )
    }
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
    if (dish !== undefined) {
    return(
      <div key={dish.id}>
        <h4 id='header'>Comments</h4>
        {dish.comments.map((comment) =>{
          if (comment != null) {
            // const options = { year: "numeric", month: "short", day: "numeric" };
            return (
              <ul key={comment.id} className='list-unstyled'>
                <li>{comment.comment}</li>
                <li>-- {comment.author}, {this.getMonth(comment.date)} {this.getDay(comment.date)}, {this.getYear(comment.date)}</li>
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
  else {
    return (
      <div></div>
    )
  }
}

  render() {

    console.log('Dishdetail component render is invoked');

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