import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false
        }}>
            <Tabs.Screen name="HomeScreen"
                options={{
                    tabBarLabel: 'Trang chủ',
                    tabBarIcon: ({ colors, size }) => (
                        <Ionicons name="home-sharp" size={24} color="black" />
                    )
                }}
            />
            <Tabs.Screen name="DiaryScreen"
                options={{
                    tabBarLabel: 'Nhật ký canh tác',
                    tabBarIcon: ({ colors, size }) => (
                        <Ionicons name="newspaper-sharp" size={24} color="black" />
                    )
                }}
            />
            <Tabs.Screen name="TechniqueScreen"
                options={{
                    tabBarLabel: 'Kỹ thuật canh tác',
                    tabBarIcon: ({ colors, size }) => (
                        <Ionicons name="library-sharp" size={24} color="black" />
                    )
                }}
            />
            <Tabs.Screen name="ProfileScreen"
                options={{
                    tabBarLabel: 'Tôi',
                    tabBarIcon: ({ colors, size }) => (
                        <Ionicons name="person-sharp" size={24} color="black" />
                    )
                }}
            />
        </Tabs>
    )
}