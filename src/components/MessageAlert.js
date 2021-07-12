/* eslint-disable react/prop-types */
import React from "react"
import { Alert } from "react-bootstrap"

const style = {
  marginTop: "20px"
}

const MessageAlert = ({ message, messageVariant }) => {
  return (
    <div id="message-alert"style={style}>
      {message && <Alert variant={messageVariant}>{message}</Alert>}
    </div>
  )
}


export default MessageAlert