import React, {Component} from 'react'
import {connect} from 'react-redux'
import selectMessages from '../Selectors/messages'


class Messages extends Component {


  displayMessages = (messages) => {
    if(typeof messages === 'string') {
      return <li>{messages}</li>
    }

    let a = []
    for (var key in messages) {
      const name = <p className = "message_name">{messages[key].user}</p>
      const text = <p className = "message_text">{messages[key].text}</p>
      a.push(<li className = "message">{name}{text}</li>)
    }
    return a
    console.log(a)
  }

  render() {
    return (
      <div className = "messages">
      <ul>{this.displayMessages(this.props.messages)}
      </ul>
      </div>
    )
  }
}


const mapStateToProps = (state, props) => ({
  messages: selectMessages(state.rooms, props.roomName)
})

export default connect(mapStateToProps)(Messages)
