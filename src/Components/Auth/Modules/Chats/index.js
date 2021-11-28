import TextField from "@material-ui/core/TextField"
import React, { useEffect, useRef, useState } from "react"
import io from "socket.io-client";
import { connect } from 'react-redux';
import { isEqual } from "lodash";

import "../../index.css"
import Cust1 from '../../../../Assets/man.png'

const Chats = ({ currentUser, isManager }) => {
	const [ state, setState ] = useState({ message: "", name: currentUser.name })
	const [ chat, setChat ] = useState([])

	const socketRef = useRef()

	useEffect(
		() => {
			socketRef.current = io.connect("http://localhost:4000")
			console.log(socketRef);
			socketRef.current.on("message", ({ name, message }) => {
				setChat([ ...chat, { name, message } ])
			})
			return () => socketRef.current.disconnect()
		},
		[ chat ]
	)

	const onTextChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value })
	}

	const onMessageSubmit = (e) => {
		const { name, message } = state
		socketRef.current.emit("message", { name, message })
		e.preventDefault()
		setState({ message: "", name })
	}

	const renderChat = () => {
		return chat.map(({ name, message }, index) => {
			return isEqual(name, currentUser.name) ? (
          <div className="sender" key={`${index}-msg`}>
            <img className="profile-image" src={currentUser.img} alt="profile" />
            <div className="user-msg">
              <h4 className="user-name">{currentUser.name}</h4>
              <p className="message">{message}</p>
            </div>
          </div>
        ) : (
          <div className="receiver"  key={`${index}-msg`}>
            <div className="user-msg">
              <h4 className="user-name">receiver</h4>
                <p className="message">{message}</p>
            </div>
            {/* <img className="profile-image" src={receiver.img} alt="profile" /> */}
          </div>
		)})
	}

	return (
		<div className={`chats-container ${isManager ? "manager-container" : ""}`}>
			{isManager && (
				<ul className="user-list">
					<li className="active">
						<a href="#">
							<img src={Cust1} className="profile-image" alt="profile " />
							<h4 className="user-name">John Doe</h4>
						</a>
					</li>
				</ul>
			)}
			<div className="chat-screen">
				<form onSubmit={onMessageSubmit}>
					<div>
						{renderChat()}
					</div>
					<div className={`text-editor ${isManager ? "manager-text-editor" : ""}`}>
						<TextField
							className="message-field"
							name="message"
							onChange={(e) => onTextChange(e)}
							value={state.message}
							id="outlined-multiline-static"
							variant="outlined"
						/>
						<button className="message-snd-btn">Send</button>
					</div>
				</form>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => ({
	currentUser: state.Users.currentUser,
});

export default connect(mapStateToProps)(Chats);

