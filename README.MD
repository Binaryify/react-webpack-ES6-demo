This is a demo for webpack-react demo using ES6;
#start
```
git clone git@github.com:zhuangtongfa/react-webpack-ES6-demo.git

npm install

npm run dev

open '127.0.0.1:8080'
```



# main.js
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
```
