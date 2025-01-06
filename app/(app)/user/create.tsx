import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Button, Input } from '@ui-kitten/components'
import { ScreenWidth } from '@/config'
import { UseCreateUser } from '@/api/user'
import Toast from "react-native-toast-message"
import { router } from 'expo-router'


const CreateUser = () => {
  const [email, setEmail] = useState<string>("")
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const handleSubmit = async () => {
    if(!username || !password || !email){
      Toast.show({
        type: "error",
        text1: "Username, Email & Password Dibutuhkan!"
      })

      return
    }

    try {
      await UseCreateUser({email: email, username: username, password: password})
      router.push('/(tabs)')

      Toast.show({
        type: "success",
        text1: "Berhasil Membuat User!"
      })
    } catch (error) {
      console.log("error membaut user ", error)
      Toast.show({
        type: "error",
        text1: `Gagal Membuat User : ${error}`
      })
    }
  }

  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{flex: 0, flexDirection: 'column', gap: 18, width: ScreenWidth * 0.8}}>
          <Text style={{fontSize: 20, textAlign: 'center'}}>Input Pengguna</Text>
          <Input value={email} onChangeText={(value) => setEmail(value)} placeholder='Email' />
          <Input value={username} onChangeText={(value) => setUsername(value)} placeholder='Username' />
          <Input value={password} onChangeText={(value) => setPassword(value)} placeholder='Password' />
          <Button onPress={() => handleSubmit()}>Submit</Button>
        </View>
      </View>
    </>
  )
}

export default CreateUser