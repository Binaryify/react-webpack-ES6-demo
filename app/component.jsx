import React from 'react';
import $ from 'jquery'
import './app.scss';
var style={
  background:"#eee",
  padding:"20px"
}
class List extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    var commentlist = this.props.comments.map(function(item) {
      return <div onClick={(ev)=>console.log(item.author)}>{item.body}-{item.author}</div>
    })
    return (
      <div className="comment" style={style}>
        {commentlist}
      </div>
    )
  }
}
export default class CommentBox extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      comments: [
        {
          "author": "test",
          "body": "test1"
        }
      ]
    }
  }
  loaddata () {
    setTimeout(()=>{
      $.ajax({
        url: this.props.url,
        dataType: "json",
        success: data => {
          this.setState({comments: data})
        }
      })
    },2000)
  }
  componentDidMount () {
    this.loaddata();
  }
  render () {
    return (
      <div>
        <List comments={this.state.comments}/>
      </div>
    )
  }
}
