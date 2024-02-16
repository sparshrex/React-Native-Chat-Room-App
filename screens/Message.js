import { View, Text } from 'react-native'
import React from 'react'

const Message = ({ message, user }) => {
  return (
    <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
      }}>
        <Text style={{ fontWeight: 'bold', marginRight: 5 }}>{user.name}</Text>
        <Text>{message.text}</Text>
      </View>
  )
}

export default Message