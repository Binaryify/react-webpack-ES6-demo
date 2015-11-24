import React from 'react';
import $ from 'jquery'
import './app.scss';
var style={
  background:"#eee",
  padding:"20px"
}
class ComponentForm extends React.Component{
  handleSubmit(ev){
    ev.preventDefault();
    console.log(this.refs.author.value.trim())  //trim 去除两边空格
    const author=this.refs.author.value.trim()
    const comment=this.refs.comment.value.trim()
    this.props.onSubmit({author:author,comment:comment})
  }
  render(){
    return(
        <form ref="form" className="comment-form" onSubmit={(ev)=>{this.handleSubmit(ev)}}>
        <input type="text" placeholder="your name" ref="author"/>
        <input type="text" placeholder="input your comment" ref="comment"/>
        <input type="submit" value="add comment" />
        </form>
    )
  }
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
      return <div>{item.comment}  -{item.author}</div>
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
          "comment": "test1"
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
  handleNewComent(data){
    console.log(data)
    // ajax业务逻辑
    const comment=this.state.comments;
    const newComment=comment.concat(data)
    this.setState({comments:newComment})
  }
  render () {
    return (
      <div>
        <List comments={this.state.comments}/>
        <ComponentForm onSubmit={(data)=>{this.handleNewComent(data)}}/>
      </div>
    )
  }
}
