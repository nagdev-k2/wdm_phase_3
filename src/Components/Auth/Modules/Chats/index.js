import TextField from "@material-ui/core/TextField"
import React, { useEffect, useRef, useState } from "react"
import io from "socket.io-client";
import { connect } from 'react-redux';
import { isEmpty, isEqual, map } from "lodash";
import { bindActionCreators } from "redux";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from  'react-bootstrap/Tooltip';

import Camera from '../../../../Assets/camera.png'
import baseURL, { chatBaseURL } from "../../../../Utils/baseUrl";
import "../../index.css"
import { showAllCustomersOperation } from '../../../../State/Customers/operations';
import { getConversationOperation, getAllMessagesOperations, saveMessageOperations } from "../../../../State/Chats/operations";
import { Spinner } from "react-bootstrap";

const Chats = ({ currentUser, isManager, actions, manager }) => {
	const [ state, setState ] = useState({ message: "", name: currentUser.name })
	const [ chat, setChat ] = useState([]);
	const socketRef = useRef();
	const [receiver, setReceiver] = useState(isManager ? {} : manager);
	const [allCustomers, setAllCustomers] = useState([]);
	const [conversationId, setConversationId] = useState(0);
	const [isLoading, setLoading] = useState(false);
	const [img, setImg] = useState({});
	
	useEffect(
		() => {
			if (!isManager) getConversation(manager);
			actions.showAllCustomersOperation()
			.then((res) => {
				setAllCustomers(res);
			})
			socketRef.current = io.connect(chatBaseURL)
			const date = new Date();
			const timestamp = date.getTime();
			const author = currentUser.id;
			socketRef.current.on("message", ({  message, isFile, author, conversationId, timestamp }) => {
				
				getAllMessagesF(conversationId);
			})
			return () => socketRef.current.disconnect()
		},
		[]
	)

	useEffect(() => { 
		uploadImg();
	}, [img]);

	useEffect(() => { 
		scrollToBottom();
	}, [chat]);

	const scrollToBottom = () => {
		if (!isEmpty(chat)) {
			const element = document.getElementById('chat-screen');
			element.scrollTop = element.scrollHeight - element.clientHeight;
		}
	}

	const onTextChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value })
	}

	const onMessageSubmit = (e) => {
		const { name, message } = state;
		if (message.trim().length > 0) {
			const date = new Date();
			socketRef.current.emit("message", { message, isFile: false, timestamp:date.getTime(), author: currentUser.id, conversationId });
			e.preventDefault();
			setState({ message: "", name });
			const msgObj = { author: parseInt(currentUser.id, 10), message, conversationId, isFile: false };
			actions.saveMessageOperations(msgObj)
			.then((res) => {
				msgObj['timestamp'] = date.getTime();
				if (res) setChat([...chat, msgObj])
			})
		}
	}

	const uploadImg = () => {
		if (img.name) {
			const formData = new FormData();
			formData.append('img', img);
			setLoading(true);
			fetch(baseURL+"/api.php", {
				method: 'POST',
				body: formData
			})
			.then((res) => res.json())
			.then((resp) => {
				setLoading(false);
				socketRef.current.emit("message", { name: currentUser.name, message: resp.url, isFile:true });
				const msgObj = { author: parseInt(currentUser.id, 10), message:resp.url, conversationId, isFile: true };
				actions.saveMessageOperations(msgObj)
				.then((res) => {
					const date = new Date();
					msgObj['timestamp'] = date.getTime();
					if (res) setChat([...chat, msgObj]);
				})
			})
		} 
  }

	const getConversation = (receiver) => {
		setReceiver(receiver);
		actions.getConversationOperation({ senderId: currentUser.id, receiverId: receiver.id })
		.then((res) => {
			getAllMessagesF(parseInt(res.id, 10));
		})
	}

	const getAllMessagesF = (id) => {
		setConversationId(id);
		actions.getAllMessagesOperations({ conversationId: id })
		.then((resp) => {
			setChat(resp);
		})
	}

	const renderTooltip = (props) => (
		<Tooltip id="button-tooltip" {...props}>
			Open image in new tab.
		</Tooltip>
	);

	const renderChat = () => {
		return chat.map(({ author, name, message, timestamp, isFile, conversationId }, index) => {
			const date = new Date(parseInt(timestamp, 10));
			return (isEqual(name, currentUser.name) || isEqual(author, parseInt(currentUser.id, 10))) ? (
          <div className="sender" key={`${index}-msg`}>
            <div className="user-msg">
	            <h4 className="user-name">{(index > 0 && !isEqual(chat[index - 1].author, parseInt(currentUser.id, 10)) || isEqual(index, 0)) && currentUser.name}</h4>							
              {isEqual(isFile, 'true') ? (
								<OverlayTrigger
									placement="bottom"
									delay={{ show: 250, hide: 400 }}
									overlay={renderTooltip}
								>
									<button onClick={() => window.open(message)}>
										<img src={message} alt="img" className="msg-img" />
									</button>
								</OverlayTrigger>
							) : (
								<p className="message">{message}</p>
							)}
							<span className="msg-time">{date.toLocaleString()}</span>
            </div>
						{(index > 0 && !isEqual(chat[index - 1].author, parseInt(currentUser.id, 10)) || isEqual(index, 0)) ? (
							<img className="profile-image" src={currentUser.img} alt="img" />
						) : <div className='profile-image' />}
					</div>
        ) : (
          <div className="receiver"  key={`${index}-msg`}>
						{isEqual(index, 0) || (index > 0 && !isEqual(chat[index - 1].author, parseInt(receiver.id, 10))) ? (
							<img className="profile-image" src={receiver.img} alt="img" />
						) : <div className='profile-image-div' />}
            <div className="user-msg">
							<h4 className="user-name">{(index > 0 && !isEqual(chat[index - 1].author, parseInt(receiver.id, 10))|| isEqual(index, 0)) && receiver.name}</h4>
							{isEqual(isFile, 'true') ? (
								<OverlayTrigger
									placement="bottom"
									delay={{ show: 250, hide: 400 }}
									overlay={renderTooltip}
								>
									<button onClick={() => window.open(message)}>
										<img src={message} alt="img" className="msg-img" />
									</button>
								</OverlayTrigger>
							) : (
								<p className="message">{message}</p>
							)}
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
							<img src={customer.img} className="profile-image" alt="img " />
							<h4 className="user-name">{customer.name}</h4>
						</button>
					</li>
					))}
			</ul>)}
			<div className="chat-screen" id="chat-screen">
				{isEmpty(receiver) ? (
					<h3> Select Customer to chat </h3>
				) : (
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
							{state.message ? (
								<button className="message-snd-btn">Send</button>
							) : (
									<label className="message-snd-btn">
										{isLoading ? (
											<Spinner />
										) : (
											<>
												<input type="file" accept="image/*" name="img" onChange={(e) => setImg(e.target.files[0])} />
												<img src={Camera} alt="camera" className="camera-btn" />
											</>
										)}
										
									</label>
							)}
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

