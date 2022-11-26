import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat';
import uuid from 'react-uuid';
import * as Speech from 'expo-speech';

export default function App() {
  const [messages, setMessages] = useState([]);
  const OPENING_MESSAGE = 'Hello developer';
  const replies = [
    'How are you?',
    'Nice to chat with you',
    'That is impressive',
    'Excuse me',];
useEffect(() => {
  Speech.speak(OPENING_MESSAGE);
  setMessages([
    {
      _id: 1,
      text: OPENING_MESSAGE,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: '?',
      },
    },
  ])
}, [])

const onSend = useCallback((messages = []) => {
  setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  let messageText = replies[Math.floor(Math.random() * replies.length)]  
  let newMessage = 
  [
      {
          _id: uuid(),
          text: messageText,
          createdAt: new Date(),
          user: {
              _id: 2,
              name: '?'
          },
      },
  ]
  setMessages(previousMessages => GiftedChat.append(previousMessages, newMessage))
  Speech.speak(messageText)
}, [])

return (
  <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
)
}
