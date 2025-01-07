import React from 'react'
import { Stack } from 'expo-router'

const Layout = () => {
    return (
        <>
            <Stack>
                <Stack.Screen name="user" options={{ headerShown: false }} />
                <Stack.Screen name="book" options={{ headerShown: false }} />
                <Stack.Screen name="booked-book" options={{ headerShown: false }} />
            </Stack>
        </>
    )
}

export default Layout