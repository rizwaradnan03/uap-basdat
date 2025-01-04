import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Button, Input } from '@ui-kitten/components'
import { ScreenWidth } from '@/config'

const UserScreen = () => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const handleSubmit = async () => {
    try {
      
    } catch (error) {
      
    }
  }

  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{flex: 0, flexDirection: 'column', gap: 15, width: ScreenWidth * 0.8}}>
          <Text style={{fontSize: 20, textAlign: 'center'}}>Input Pengguna</Text>
          <Input value={username} onChangeText={(value) => setUsername(value)} placeholder='Username' />
          <Input value={password} onChangeText={(value) => setPassword(value)} placeholder='Password' />
          <Button>Submit</Button>
        </View>
      </View>
    </>
  )
}

export default UserScreen