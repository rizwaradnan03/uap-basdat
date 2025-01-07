import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Input } from '@ui-kitten/components'
import { ScreenWidth } from '@/config'
import { UseCreateUser, UseFetchFindOneByUserId, UseUpdateUserByUserId } from '@/api/user'
import Toast from "react-native-toast-message"
import { router, useLocalSearchParams } from 'expo-router'
import { BookInterface } from '@/interface/schemaInterface'
import { UseUpdateBookByBookId } from '@/api/book'


const UpdateBook = () => {
  const { id } = useLocalSearchParams()

  const [releaseDate, setReleaseDate] = useState<string | undefined>(undefined)
  const [title, setTitle] = useState<string>("")
  const [author, setAuthor] = useState<string>("")
  const [stock, setStock] = useState<string>("")

  const fetchUser = async () => {
    try {
      const fetch: BookInterface = await UseFetchFindOneByUserId({ id: id as string })
      setReleaseDate(fetch.releaseDate.toISOString())
      setTitle(fetch.title)
      setAuthor(fetch.author)
      setStock(fetch.stock.toString())
    } catch {
      Toast.show({ type: "error", text1: "Failed To Fetch User" })
    }
  }

  const handleSubmit = async () => {
    if (!releaseDate || !title || !author || !stock) {
      Toast.show({
        type: "error",
        text1: "Tanggal Rilis, Judul, Author & Stok Dibutuhkan!"
      })

      return
    }

    try {
      await UseUpdateBookByBookId({ id: id as string, data: { releaseDate: new Date(releaseDate), title: title, author: author, stock: parseInt(stock)} })
      router.push('/(tabs)/book')

      Toast.show({
        type: "success",
        text1: "Berhasil Meng Update Buku!"
      })
    } catch (error) {
      console.log("error membaut user ", error)
      Toast.show({
        type: "error",
        text1: `Gagal Meng Update Buku : ${error}`
      })
    }
  }

  useEffect(() => {
    fetchUser()
  }, [id])

  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View style={{flex: 0, flexDirection: 'column', gap: 18, width: ScreenWidth * 0.8}}>
                <Text style={{fontSize: 20, textAlign: 'center'}}>Edit Data Buku</Text>
                <Input value={releaseDate} onChangeText={(value) => setReleaseDate(value)} placeholder='Release Date (YYYY-MM-DD)' />
                <Input value={title} onChangeText={(value) => setTitle(value)} placeholder='Username' />
                <Input value={author} onChangeText={(value) => setAuthor(value)} placeholder='Password' />
                <Input value={stock} onChangeText={(value) => setStock(value)} placeholder='Stock' />
                <Button onPress={() => handleSubmit()}>Submit</Button>
              </View>
            </View>
    </>
  )
}

export default UpdateBook