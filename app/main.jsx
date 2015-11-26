import React from 'react';
import ReactDOM from 'react-dom'
import CommentBox from './component.jsx';
import $ from 'jquery'

var commentBox = ReactDOM.render( < CommentBox url = "comments.json" / > , $('#app').get(0));
console.log(commentBox.state.comments)
setTimeout(()=>{
  commentBox.setState({
      comments:[]
  })
},1000)
