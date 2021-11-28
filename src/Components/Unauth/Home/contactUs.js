import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import Alert from 'react-bootstrap/Alert';

import emailImage from "../../../Assets/email-clr.png";
import contactNumber from "../../../Assets/phone-clr.png";
import bullHorn from "../../../Assets/bullhorn.png";
import facebook from "../../../Assets/fb.png";
import instagram from "../../../Assets/insta.png";
import twitter from "../../../Assets/twitter.jpeg";
import userIcon from "../../../Assets/user.png";
import emailIcon from "../../../Assets/email.png";
import contactImg from "../../../Assets/contact_page.PNG";
import Email from '../../../Assets/arroba.png';

const ContactUs = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [isErrorSendingEmail, setErrorSendingEmail] = useState(false);
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_end4pxm', 'template_qkk3ser', form.current, 'user_Lixv7nn8Am6BYI6aiQ1lz')
            .then((result) => {
                setName('');
                setEmail('');
                setSubject('');
                setMessage('');
                setAlertMessage('Email Sent Successfully');
                setTimeout(() => setAlertMessage(''), 5000);
                setErrorSendingEmail(false);
            }, (error) => {
                setAlertMessage('Somthing went wrong');
                setTimeout(() => setAlertMessage(''), 5000);
                setErrorSendingEmail(true);
            });

    }


    return (
        < section id="contactUs" >
            <div className="content">
                <h3 className="content-title left">Let's start a conversation
                </h3>
                <div className="contact_info">

                    <div className="info_flex">
                        <div className="email_image"><img src={emailImage} alt="mail_logo" /></div>
                        <div className="mail_id">
                            <h4>Email Us</h4>
                            <a href="#">abc@instawash.com</a>
                        </div>
                    </div>

                    <div className="info_flex">
                        <div className="email_image"><img src={contactNumber} alt="Contact Number" /></div>
                        <div className="mail_id">
                            <h4>Call Us</h4>
                            <span>+1-(111)-111-1111</span>
                        </div>
                    </div>


                    <div className="info_flex">
                        <div className="email_image"><img src={bullHorn} alt="mail_logo" /></div>
                        <div className="mail_id">
                            <h4>Follow Us</h4>
                            <div className="social-links">
                                <a href="#"> <img className="social-link" src={facebook} alt="facebook" /></a>
                                <a href="#"><img className="social-link" src={instagram} alt="instagram" /></a>
                                <a href="#"><img className="social-link" src={twitter} alt="twitter" /></a>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <h3 className="content-title left">We are up for a feedback !!!</h3>
                <form ref={form} onSubmit={sendEmail}>
                    <div className="auth-form-box-grid">
                        <div className="field-contact">
                            <img className="field-icon" src={userIcon} alt="user" />
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter Full Name" name="name" required />
                        </div>
                        <div className="contact_us_image">
                            <img src={contactImg} />
                        </div>
                        <div className="field-contact">
                            <img className="field-icon" src={Email} alt="email" />
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Enter Email" name="email" required />
                        </div>
                        <div className="field-contact">
                            <img className="field-icon" src={emailIcon} alt="contact" />
                            <input value={subject} onChange={(e) => setSubject(e.target.value)} type="text" placeholder="Enter Subject" name="subject" required />
                        </div>
                        <div className="field_textarea">
                            <textarea rows="6" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your thoughts!!!" name="message"></textarea>
                        </div>
                        <input className="submit-req" type="submit" value="Submit" />
                    </div>
                </form>
            </div>

            {alertMessage.length > 0 && (<Alert variant={isErrorSendingEmail ? 'danger' : 'success'}>
                {alertMessage}            </Alert>)}

        </section>
    );
};
export default ContactUs;