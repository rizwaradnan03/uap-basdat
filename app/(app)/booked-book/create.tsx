import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, Input, Select } from '@ui-kitten/components';
import { ScreenWidth } from '@/config';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';
import { UseCreateBook, UseFetchFindManyBook } from '@/api/book';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { BookInterface, UserInterface } from '@/interface/schemaInterface';
import { UseFetchFindManyUser } from '@/api/user';
import { Picker } from '@react-native-picker/picker';
import { UseCreateBookedBook } from '@/api/bookedBook';

const CreateBookedBook = () => {
  const [borrowingDate, setBorrowingDate] = useState<Date>(new Date());
  const [borrowingDatePickerVisibility, setBorrowingDatePickerVisibility] = useState<boolean>(false);

  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [dueDatePickerVisibility, setDueDatePickerVisibility] = useState<boolean>(false);

  const [users, setUsers] = useState<UserInterface[]>([])
  const [books, setBooks] = useState<BookInterface[]>([])

  const [selectedUserId, setSelectedUserId] = useState<string>("")
  const [selectedBookId, setSelectedBookId] = useState<string>("")

  const fetchUser = async () => {
    try {
      const fetch: UserInterface[] = await UseFetchFindManyUser()
      setUsers(fetch)
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Gagal Fetch Data User',
      });
    }
  }

  const fetchBook = async () => {
    try {
      const fetch: BookInterface[] = await UseFetchFindManyBook()
      setBooks(fetch)
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Gagal Fetch Data User',
      });
    }
  }

  useEffect(() => {
    fetchBook()
    fetchUser()
  }, [])

  const handleSubmit = async () => {
    if (!borrowingDate || !dueDate || !selectedBookId || !selectedUserId) {
      Toast.show({
        type: 'error',
        text1: 'Waktu Peminjaman, Waktu Selesai, Pilihan Buku, Pilihan Pengguna Harus Diisi!',
      });
      return;
    }

    try {
      await UseCreateBookedBook({book_id: selectedBookId, user_id: selectedUserId, borrowing_date: borrowingDate, due_date: dueDate})
      router.push('/(tabs)/bookedBook');

      Toast.show({
        type: 'success',
        text1: 'Berhasil Menambahkan Buku!',
      });
    } catch (error) {
      console.error('Error saat membuat buku:', error);
      Toast.show({
        type: 'error',
        text1: `Gagal Menambahkan Buku: ${error.message}`,
      });
    }
  };

  const handleConfirmBorrowingDate = (date: Date) => {
    setBorrowingDate(date);

    setBorrowingDatePickerVisibility(false)
  };

  const handleConfirmDueDate = (date: Date) => {
    setDueDate(date);

    setDueDatePickerVisibility(false)
  };

  // console.log("borrow dat", borrowingDate)
  // console.log("due dat", dueDate)

  console.table(selectedBookId)

  console.log("set books ", books)

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ flex: 0, flexDirection: 'column', gap: 18, width: ScreenWidth * 0.8 }}>
        <Text style={{ fontSize: 20, textAlign: 'center' }}>Input Data Buku</Text>

        {/* Tanggal Perilisan */}
        <Button onPress={() => setBorrowingDatePickerVisibility(true)}>Pilih Tanggal Pinjam</Button>
        <Text style={{ textAlign: 'center', marginVertical: 10 }}>
          Tanggal yang dipilih: {borrowingDate.toLocaleString()}
        </Text>
        <DateTimePickerModal
          isVisible={borrowingDatePickerVisibility}
          mode="datetime"
          onConfirm={handleConfirmBorrowingDate}
          onCancel={() => setBorrowingDatePickerVisibility(false)}
        />

        <Button onPress={() => setDueDatePickerVisibility(true)}>Pilih Tanggal Tenggat</Button>
        <Text style={{ textAlign: 'center', marginVertical: 10 }}>
          Tanggal yang dipilih: {dueDate.toLocaleString()}
        </Text>
        <DateTimePickerModal
          isVisible={dueDatePickerVisibility}
          mode="datetime"
          onConfirm={handleConfirmDueDate}
          onCancel={() => setDueDatePickerVisibility(false)}
        />

        <Picker
          selectedValue={selectedBookId}
          onValueChange={(itemValue) => {
            setSelectedBookId(itemValue);
          }}
        >
          {books.map((book) => (
            <Picker.Item key={book.id} label={book.title} value={book.id} />
          ))}
        </Picker>

        <Picker
          selectedValue={selectedUserId}
          onValueChange={(itemValue) => {
            setSelectedUserId(itemValue);
          }}
        >
          {users.map((user) => (
            <Picker.Item key={user.id} label={user.username} value={user.id} />
          ))}
        </Picker>

        {/* Tombol Submit */}
        <Button style={{ backgroundColor: "green" }} onPress={handleSubmit}>Submit</Button>
      </View>
    </View>
  );
};

export default CreateBookedBook;
