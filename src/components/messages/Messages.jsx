import React, { useState, useRef } from "react";

import {
  ArrowLeft,
  Paperclip,
  Camera,
  Mic,
  Send,
  Image as ImageIcon,
} from "lucide-react";

import "./Messages.css";

function Messages({ onBack }) {

  const [selectedContact, setSelectedContact] = useState(null);
  const [messageText, setMessageText] = useState("");

  const fileInputRef = useRef(null);

  // DEMO CONTACTS

  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Alicia Rochefort",
      avatar: "👩🏻‍🦰",
      time: "09.10",
      unread: 1,
      preview: "Hey Tonald, we have to attend our daily stand up...",
    },
    {
      id: 2,
      name: "Jessica Tan",
      avatar: "👩🏻",
      time: "09.10",
      unread: 0,
      preview: "Ey Tonald, let's do the design sprint at friday 10.00...",
    },
    {
      id: 3,
      name: "Lolita Xue",
      avatar: "👩🏻‍🦱",
      time: "09.10",
      unread: 0,
      preview: "Ey Tonald, let's do the design sprint at friday 10.00...",
    },
    {
      id: 4,
      name: "Eaj Prakk",
      avatar: "👩🏻",
      time: "09.10",
      unread: 0,
      preview: "Hey Tonald, don't forget the meeting.",
    },
    {
      id: 5,
      name: "Jason",
      avatar: "👨🏻",
      time: "09.10",
      unread: 0,
      preview: "Let's discuss the project tomorrow.",
    },
    {
      id: 6,
      name: "Kimberly",
      avatar: "👩🏼",
      time: "09.10",
      unread: 0,
      preview: "Thanks for your help!",
    },
    {
      id: 7,
      name: "Wang",
      avatar: "👨🏽",
      time: "09.10",
      unread: 0,
      preview: "See you at the office.",
    },
    {
      id: 8,
      name: "James",
      avatar: "👨🏻",
      time: "09.10",
      unread: 0,
      preview: "The report is ready.",
    },
    {
      id: 9,
      name: "Bella",
      avatar: "👩🏻",
      time: "09.10",
      unread: 0,
      preview: "Okay, thank you!",
    },
  ]);


  // DEMO CONVERSATIONS

  const initialMessages = {

    1: [
      {
        id: 1,
        text: "Hey Tonald, we have to attend our daily stand up",
        time: "09.10",
        sender: "other",
      },
      {
        id: 2,
        text: "Sure, when will daily stand up starts?",
        time: "09.12",
        sender: "me",
      },
      {
        id: 3,
        text: "It's around 11.00, in the meeting room",
        time: "09.13",
        sender: "other",
      },
      {
        id: 4,
        text: "btw, don't forget bring the sunday report ya",
        time: "09.13",
        sender: "other",
      },
      {
        id: 5,
        text: "See you there!",
        time: "09.13",
        sender: "other",
      },
      {
        id: 6,
        text: "Okay Alicia, I'll make sure to attend the daily stand up and make sure everything goes well, and bring the sunday report to you, see you there at 11.00 Alicia!",
        time: "09.14",
        sender: "me",
      },
    ],

    2: [
      {
        id: 1,
        text: "Hey Tonald, send me picture of our teamwork for IG post",
        time: "09.10",
        sender: "other",
      },
      {
        id: 2,
        text: "Sure, wait, I'll send you",
        time: "09.12",
        sender: "me",
      },
      {
        id: 3,
        text: "Thanks Tonald!",
        time: "09.13",
        sender: "other",
      },
      {
        id: 4,
        text: "you're welcome jess!",
        time: "09.14",
        sender: "me",
      },
    ],

  };


  const [conversations, setConversations] = useState(initialMessages);


  // OPEN CHAT

  const openChat = (contact) => {

    setSelectedContact(contact);

    setContacts((previous) =>
      previous.map((item) =>
        item.id === contact.id
          ? { ...item, unread: 0 }
          : item
      )
    );

  };


  // SEND MESSAGE

  const sendMessage = () => {

    if (!messageText.trim() || !selectedContact) return;

    const now = new Date();

    const time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const newMessage = {
      id: Date.now(),
      text: messageText.trim(),
      time,
      sender: "me",
    };

    setConversations((previous) => ({
      ...previous,
      [selectedContact.id]: [
        ...(previous[selectedContact.id] || []),
        newMessage,
      ],
    }));

    setContacts((previous) =>
      previous.map((contact) =>
        contact.id === selectedContact.id
          ? {
              ...contact,
              preview: messageText.trim(),
              time,
            }
          : contact
      )
    );

    setMessageText("");

  };


  // SEND IMAGE

  const handleImageUpload = (event) => {

    const file = event.target.files?.[0];

    if (!file || !selectedContact) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image.");
      return;
    }

    const imageURL = URL.createObjectURL(file);

    const newMessage = {
      id: Date.now(),
      image: imageURL,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      sender: "me",
    };

    setConversations((previous) => ({
      ...previous,
      [selectedContact.id]: [
        ...(previous[selectedContact.id] || []),
        newMessage,
      ],
    }));

    event.target.value = "";

  };


  // BACK TO CONTACT LIST

  const handleBack = () => {

    if (selectedContact) {
      setSelectedContact(null);
    } else {
      onBack?.();
    }

  };


  // GET CURRENT MESSAGES

  const currentMessages = selectedContact
    ? conversations[selectedContact.id] || []
    : [];


  return (

    <div className="messages-page">

      {!selectedContact ? (

        /* =================================
           MESSAGES CONTACT LIST
        ================================= */

        <>

          <header className="messages-header">

            <button
              className="messages-back-button"
              onClick={handleBack}
              aria-label="Go back"
            >
              <ArrowLeft size={20} />
            </button>

            <h1>Messages</h1>

          </header>


          <main className="messages-contact-list">

            {contacts.map((contact) => (

              <button
                className="message-contact"
                key={contact.id}
                onClick={() => openChat(contact)}
              >

                <div className="contact-avatar">
                  {contact.avatar}
                </div>

                <div className="contact-information">

                  <h3>{contact.name}</h3>

                  <p>{contact.preview}</p>

                </div>

                <div className="contact-message-meta">

                  <span>{contact.time}</span>

                  {contact.unread > 0 && (
                    <span className="unread-badge">
                      {contact.unread}
                    </span>
                  )}

                </div>

              </button>

            ))}

          </main>

        </>

      ) : (

        /* =================================
           INDIVIDUAL CHAT SCREEN
        ================================= */

        <>

          <header className="chat-header">

            <button
              className="messages-back-button"
              onClick={handleBack}
              aria-label="Back to messages"
            >
              <ArrowLeft size={20} />
            </button>

            <h1>{selectedContact.name}</h1>

          </header>


          <main className="chat-messages">

            {currentMessages.map((message) => (

              <div
                key={message.id}
                className={`chat-message ${
                  message.sender === "me"
                    ? "my-message"
                    : "other-message"
                }`}
              >

                <div className="chat-bubble">

                  {message.text && (
                    <p>{message.text}</p>
                  )}

                  {message.image && (
                    <img
                      src={message.image}
                      alt="Shared attachment"
                      className="chat-image"
                    />
                  )}

                  <span className="chat-time">
                    {message.time}
                  </span>

                </div>

              </div>

            ))}

          </main>


          {/* MESSAGE INPUT */}

          <form
            className="chat-input-area"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
          >

            <div className="chat-input-box">

              <input
                type="text"
                placeholder="Type a message..."
                value={messageText}
                onChange={(event) =>
                  setMessageText(event.target.value)
                }
              />


              <button
                type="button"
                className="chat-attachment-button"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Attach image"
              >
                <Paperclip size={19} />
              </button>


              <button
                type="button"
                className="chat-attachment-button"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Open camera or select image"
              >
                <Camera size={18} />
              </button>


              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                hidden
                onChange={handleImageUpload}
              />

            </div>


            <button
              type={messageText.trim() ? "submit" : "button"}
              className="chat-send-button"
              onClick={!messageText.trim() ? () => {} : undefined}
              aria-label="Send message"
            >

              {messageText.trim()
                ? <Send size={19} />
                : <Mic size={20} />
              }

            </button>

          </form>

        </>

      )}

    </div>

  );

}

export default Messages;