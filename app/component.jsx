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
    this.state={
      liked:true
    }
  }
  doSomething(ev){
    console.log(ev)
    this.setState({
      liked:!this.state.liked
    })
  }
  render () {
    var commentlist = this.props.comments.map(function(item) {
      return <div>{item.body}-{item.author}</div>
    })
    return (
      <div className="comment" style={style}  onClick={(ev)=>{this.doSomething(ev)}}>
        {commentlist}{this.state.liked?"like":"don't like"}
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
