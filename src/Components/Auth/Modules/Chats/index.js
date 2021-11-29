import TextField from "@material-ui/core/TextField"
import React, { useEffect, useRef, useState } from "react"
import io from "socket.io-client";
import { connect } from 'react-redux';
import { cloneDeep, isEmpty, isEqual, map } from "lodash";
import { bindActionCreators } from "redux";

import { chatBaseURL } from "../../../../Utils/baseUrl";
import "../../index.css"
import { showAllCustomersOperation } from '../../../../State/Customers/operations';
import { getConversationOperation, getAllMessagesOperations, saveMessageOperations } from "../../../../State/Chats/operations";

const Chats = ({ currentUser, isManager, actions, manager }) => {
	const [ state, setState ] = useState({ message: "", name: currentUser.name })
	const [ chat, setChat ] = useState([]);
	const socketRef = useRef();
	const [receiver, setReceiver] = useState(isManager ? {} : manager);
	const [allCustomers, setAllCustomers] = useState([]);
	const [conversationId, setConversationId] = useState(0);

	useEffect(
		() => {
			if (!isManager) getConversation(manager);
			actions.showAllCustomersOperation()
			.then((res) => {
				setAllCustomers(res);
			})
			socketRef.current = io.connect(chatBaseURL)
			socketRef.current.on("message", ({ name, message }) => {
				setChat([ ...chat, { name, message } ])
			})
			return () => socketRef.current.disconnect()
		},
		[]
	)

	const onTextChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value })
	}

	const onMessageSubmit = (e) => {
		const { name, message } = state;
		socketRef.current.emit("message", { name, message });
		e.preventDefault();
		setState({ message: "", name });
		const msgObj = { author: parseInt(currentUser.id, 10), message, conversationId, isFile: false };
		actions.saveMessageOperations(msgObj)
		.then((res) => {
			const date = new Date();
			msgObj['timestamp'] = date.getTime();
			if (res) setChat([...chat, msgObj])
		})
	}


	const getConversation = (receiver) => {
		setReceiver(receiver);
		actions.getConversationOperation({ senderId: currentUser.id, receiverId: receiver.id })
		.then((res) => {
			setConversationId(parseInt(res.id, 10));
			actions.getAllMessagesOperations({ conversationId: parseInt(res.id, 10) })
			.then((resp) => {
				console.log('in resp messages', resp);
				setChat(resp);
			})
		})
	}

	const renderChat = () => {
		return chat.map(({ author, name, message, timestamp }, index) => {
			const date = new Date(parseInt(timestamp, 10));
			return (isEqual(name, currentUser.name) || isEqual(author, parseInt(currentUser.id, 10))) ? (
          <div className="sender" key={`${index}-msg`}>
            <div className="user-msg">
	            <h4 className="user-name">{(index > 0 && !isEqual(chat[index - 1].author, currentUser.id) || isEqual(index, 0)) && currentUser.name}</h4>							
              <p className="message">{message}</p>
							<span className="msg-time">{date.toLocaleString()}</span>
            </div>
						{(index > 0 && !isEqual(chat[index - 1].name, currentUser.name) || isEqual(index, 0)) ? (
							<img className="profile-image" src={currentUser.img} alt="profile" />
						) : <div className='profile-image' />}
					</div>
        ) : (
          <div className="receiver"  key={`${index}-msg`}>
						{isEqual(index, 0) || (index > 0 && !isEqual(chat[index - 1].author, receiver.id)) ? (
							<img className="profile-image" src={receiver.img} alt="profile" />
						) : <div className='profile-image-div' />}
            <div className="user-msg">
							<h4 className="user-name">{(index > 0 && !isEqual(chat[index - 1].name, receiver.name) || isEqual(index, 0)) && receiver.name}</h4>
              <p className="message">{message}</p>
							<span className="msg-time">{date.toLocaleString()}</span>

            </div>
          </div>
		)})
	}

	return (
		<div className={`chats-container ${isManager ? "manager-container" : ""}`}>
			{isManager && (<ul className="user-list">
				{map(allCustomers, (customer, index) => (
					<li key={`users-list-chat-${index}`} className={isEqual(receiver.id, customer.id) ? "active" : ''}>
						<button onClick={() => getConversation(customer)}>
							<img src={customer.img} className="profile-image" alt="profile " />
							<h4 className="user-name">{customer.name}</h4>
						</button>
					</li>
					))}
			</ul>)}
			<div className="chat-screen">
				{isEmpty(receiver) ? (
					<h3> Select Customer to chat </h3>
				) : (
					<form onSubmit={onMessageSubmit}>
						<h3> Connect with {receiver.name.toUpperCase()} {receiver.type && `(${receiver.type.toUpperCase()})`} </h3>
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
				)}
			</div>
		</div>
	)
}

const mapStateToProps = (state) => ({
	currentUser: state.Users.currentUser,
});

const mapDispatchToProps = (disptach) => ({
	actions: bindActionCreators({
		showAllCustomersOperation,
		getConversationOperation,
		getAllMessagesOperations,
		saveMessageOperations,
	}, disptach),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chats);

