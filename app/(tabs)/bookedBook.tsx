import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link } from 'expo-router'
import Toast from 'react-native-toast-message'
import { ScreenWidth } from '@/config'
import { BookedBookInterface, UserInterface } from '@/interface/schemaInterface'
import { UseFetchFindManyUser } from '@/api/user'
import { UseFetchFindManyBookedBook } from '@/api/bookedBook'

const BookedBookScreen = () => {
    const [bookedBooks, setBookedBooks] = useState<BookedBookInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
  
    const fetchUser = async () => {
      try {
        setLoading(true);
        const fetch: BookedBookInterface[] = await UseFetchFindManyBookedBook();
        setBookedBooks(fetch);
      } catch (error) {
        Toast.show({ type: 'error', text1: 'Gagal Melakukan Fetch Data' });
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchUser();
    }, []);
  
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    };
  
    return (
      <View style={styles.screenContainer}>
        <View style={styles.container}>
          <Link href={'/(app)/booked-book/create'} style={styles.addButton}>
            Tambah
          </Link>
  
          <View style={[styles.row, styles.header]}>
            <Text style={[styles.cell, styles.headerText]}>Nama Buku</Text>
            <Text style={[styles.cell, styles.headerText]}>Peminjam</Text>
            <Text style={[styles.cell, styles.headerText]}>Mulai</Text>
            <Text style={[styles.cell, styles.headerText]}>Selesai</Text>
          </View>
  
          <View style={styles.dataContainer}>
            {bookedBooks && bookedBooks.length > 0 ? (
              bookedBooks.map((item) => (
                <View key={item.id} style={styles.row}>
                  <Text style={styles.cell}>{item.Books?.title}</Text>
                  <Text style={styles.cell}>{item.User?.username}</Text>
                  <Text style={styles.cell}>{formatDate(item.borrowingDate)}</Text>
                  <Text style={styles.cell}>{formatDate(item.dueDate)}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noData}>Tidak ada data pengguna</Text>
            )}
          </View>
        </View>
      </View>
    );
  };
  

export default BookedBookScreen

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
