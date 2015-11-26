This is a demo for webpack-react demo using ES6;

#Features
* Equip with React 0.14, ES6 & Babel 6
* Lint with ESlint and Airbnb's .eslintrc
* Build with Webpack
* Support hot module replacement
* Auto Open a new browser tab when Webpack loads, and reload the page when you modified the code
* Support git pre-commit hook used to lint and test your code

![](http://zhuangtongfa.gitcafe.io/img/webpack.png)

#start
```
$ git clone git@github.com:zhuangtongfa/react-webpack-ES6-demo.git

$ npm install

$ npm start

```

You should see a new browser tap opening and a demo in http://127.0.0.1:8080.

# main.jsx
```js
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
```
# component.jsx
```js
import React from 'react';
import $ from 'jquery'
import './app.scss';
var style={
  background:"#eee",
  padding:"20px"
}
class CommentForm extends React.Component{
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
        <h1>CommentForm</h1>
        <input type="text" placeholder="your name" ref="author"/>
        <input type="text" placeholder="input your comment" ref="comment"/>
        <input type="submit" value="add comment" />
        </form>
    )
  }
}
class CommentFormB extends React.Component{
  constructor(){
    super()
    this.state={
      value:""
    }
  }
  handleInput(ev){
    this.setState({
      value:ev.target.value
    })
  }
  render(){
    var value=this.state.value;
    return(
      <form className="comment-form">
        <h1>CommentFormB</h1>
          <input type="text" value={value} placeholder="please input some content" onChange={ev=>{this.handleInput(ev)}}/>
          <p>{value}</p>
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
    var commentlist = this.props.comments.map(function(item,index) {
      return <div key={index}>{item.comment}  -{item.author}</div>
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
        <CommentForm onSubmit={(data)=>{this.handleNewComent(data)}}/>
        <CommentFormB/>
      </div>
    )
  }
}


```

# app.scss
```css
body {
  background: #fff;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 1.7;
  margin: 0;
  padding: 30px;
}
.comment-form {
  margin: 10px 0px;
  background: #eee;
  padding: 10px;
}

.comment-form {
  input[type=text] {
    display: block;
    padding: 6px;
    margin: 10px 0px;
    min-width: 300px;
  }
  input[type=submit] {
    background: #fff;
    border: 1px solid #ccc;
    padding: 6px;
  }
}

```
# this is also have a react-demo

[github](https://github.com/zhuangtongfa/react-demos)

try it!
