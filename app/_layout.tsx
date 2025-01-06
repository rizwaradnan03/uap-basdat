import { Stack } from "expo-router";
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <>
      <ApplicationProvider {...eva} theme={eva.light}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(app)" options={{ headerShown: false }} />
        </Stack>
      </ApplicationProvider>
      <Toast />
    </>
  )
}
