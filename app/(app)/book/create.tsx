import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { Button, Input } from '@ui-kitten/components';
import { ScreenWidth } from '@/config';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';
import { UseCreateBook } from '@/api/book';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const CreateBook = () => {
  const [releaseDate, setReleaseDate] = useState<Date>(new Date());
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [stock, setStock] = useState<string>('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!title || !author || !releaseDate || !stock) {
      Toast.show({
        type: 'error',
        text1: 'Judul, Penulis, Tanggal Perilisan, dan Stok Dibutuhkan!',
      });
      return;
    }

    try {
      await UseCreateBook({
        releaseDate: new Date(releaseDate),
        title,
        author,
        stock: parseInt(stock),
      });
      router.push('/(tabs)');

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

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date: Date) => {
    setReleaseDate(date);
    hideDatePicker();
  };

  console.log("rilis dat", releaseDate)

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ flex: 0, flexDirection: 'column', gap: 18, width: ScreenWidth * 0.8 }}>
        <Text style={{ fontSize: 20, textAlign: 'center' }}>Input Data Buku</Text>

        {/* Tanggal Perilisan */}
        <Button onPress={showDatePicker}>Pilih Tanggal Perilisan</Button>
        <Text style={{ textAlign: 'center', marginVertical: 10 }}>
          Tanggal yang dipilih: {releaseDate.toLocaleString()}
        </Text>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirmDate}
          onCancel={hideDatePicker}
        />

        {/* Input Fields */}
        <Input
          value={title}
          onChangeText={setTitle}
          placeholder="Judul Buku"
        />
        <Input
          value={author}
          onChangeText={setAuthor}
          placeholder="Penulis"
        />
        <Input
          value={stock}
          onChangeText={setStock}
          placeholder="Stok (Jumlah)"
          keyboardType="numeric"
        />

        {/* Tombol Submit */}
        <Button onPress={handleSubmit}>Submit</Button>
      </View>
    </View>
  );
};

export default CreateBook;
