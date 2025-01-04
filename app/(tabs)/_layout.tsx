import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'

const TabsLayout = () => {
  return (
    <>
        <Tabs screenOptions={{tabBarActiveBackgroundColor: "white", headerShown: false}}>
            <Tabs.Screen name='index' options={{
                title: 'User',
                tabBarIcon: () => <FontAwesome size={28} name='user' color={'blue'} />
            }} />
        </Tabs>
    </>
  )
}

export default TabsLayout