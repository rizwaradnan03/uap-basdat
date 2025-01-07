import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link } from 'expo-router'
import Toast from 'react-native-toast-message'
import { ScreenWidth } from '@/config'
import { BookInterface, UserInterface } from '@/interface/schemaInterface'
import { UseFetchFindManyUser } from '@/api/user'
import { UseFetchFindManyBook } from '@/api/book'

const BookScreen = () => {
  const [books, setBooks] = useState<BookInterface[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const fetchBook = async () => {
    try {
      setLoading(true)
      const fetch = await UseFetchFindManyBook()
      setBooks(fetch)
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Gagal Melakukan Fetch Data' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBook()
  }, [])

  console.log("isi books ", books)

  return (
    <View style={styles.screenContainer}>
      <View style={styles.container}>
        <Link href={'/(app)/book/create'} style={styles.addButton}>
          Tambah
        </Link>

        <View style={[styles.row, styles.header]}>
          <Text style={[styles.cell, styles.headerText]}>Title</Text>
          <Text style={[styles.cell, styles.headerText]}>Author</Text>
          <Text style={[styles.cell, styles.headerText]}>Aksi</Text>
        </View>

        <View style={styles.dataContainer}>
          {/* Data Rows */}
          {books && books.length > 0 ? (
            books.map((item) => (
              <View key={item.id} style={styles.row}>
                <Text style={styles.cell}>{item.title}</Text>
                <Text style={styles.cell}>{item.author}</Text>
                <Link style={styles.cell} href={{pathname: '/book/update/[id]', params: {id: item.id}}}>Update</Link>
              </View>
            ))
          ) : (
            <Text style={styles.noData}>Tidak ada data buku</Text>
          )}
        </View>
      </View>
    </View>
  )
}

export default BookScreen

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    width: ScreenWidth * 0.9,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  addButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#344CB7',
    color: 'white',
    borderRadius: 5,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 12,
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#f4f4f4',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: 'black',
    fontSize: 14,
    paddingVertical: 8,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  dataContainer: {
    flex: 1,
    width: '100%',
  },
  noData: {
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
    fontSize: 16,
  },
})
