import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import {COLORS} from "@/constants"
const TabLayout = () => {
  return (
    <Tabs
    screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: "#cdcde0",
        tabBarShowLabel: false,
        tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#f0f0f0',
            height: 56,
            paddingTop: 8,
        }
    }}
    >
        <Tabs.Screen name="index" options={{
            tabBarIcon: ({color, focused}) => <Ionicons name={focused ? 'home' : 'home-outline'} color={color} size={26} /> 
        }} />        <Tabs.Screen name="favorites" options={{
            tabBarIcon: ({color, focused}) => <Ionicons name={focused ? 'heart' : 'heart-outline'} color={color} size={26} /> 
        }} />
        <Tabs.Screen name="cart" options={{
            tabBarIcon: ({color, focused}) => <Ionicons name={focused ? 'cart' : 'cart-outline'} color={color} size={26} /> 
        }} />
        <Tabs.Screen name="profile" options={{
            tabBarIcon: ({color, focused}) => <Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={26} /> 
        }} />   
    </Tabs>
  )
}

export default TabLayout