import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link } from 'expo-router'
import Toast from 'react-native-toast-message'
import { ScreenWidth } from '@/config'
import { UserInterface } from '@/interface/schemaInterface'
import { UseFetchFindManyUser } from '@/api/user'

const UserScreen = () => {
  const [users, setUsers] = useState<UserInterface[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const fetchUser = async () => {
    try {
      setLoading(true)
      const fetch = await UseFetchFindManyUser()
      setUsers(fetch)
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Gagal Melakukan Fetch Data' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  console.log("isi users ", users)

  return (
    <View style={styles.screenContainer}>
      <View style={styles.container}>
        <Link href={'/(app)/user/create'} style={styles.addButton}>
          Tambah
        </Link>

        <View style={[styles.row, styles.header]}>
          {/* <Text style={[styles.cell, styles.headerText]}>ID</Text> */}
          <Text style={[styles.cell, styles.headerText]}>Username</Text>
          <Text style={[styles.cell, styles.headerText]}>Email</Text>
          <Text style={[styles.cell, styles.headerText]}>Aksi</Text>
        </View>

        <View style={styles.dataContainer}>
          {/* Data Rows */}
          {users && users.length > 0 ? (
            users.map((item) => (
              <View key={item.id} style={styles.row}>
                {/* <Text style={styles.cell}>{item.id}</Text> */}
                <Text style={styles.cell}>{item.username}</Text>
                <Text style={styles.cell}>{item.email}</Text>
                <Link style={styles.cell} href={{pathname: '/user/update/[id]', params: {id: item.id}}}>Update</Link>
              </View>
            ))
          ) : (
            <Text style={styles.noData}>Tidak ada data pengguna</Text>
          )}
        </View>
      </View>
    </View>
  )
}

export default UserScreen

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
