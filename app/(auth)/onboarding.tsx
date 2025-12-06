
import React from 'react'
import { Button, Text, ThemedView, ThemeToggle } from '../../src/components/atoms'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

const onboarding = () => {
  return (
    <ThemedView className='flex-1 justify-center align-middle px-4 gap-4'>
      <Text className='text-9xl text-center font-inter-extrabold' lightClassName='text-primary' darkClassName='text-primary'>PATH</Text>
      <Text varient='title' className='text-center'>Welcome!</Text>
      <Text varient='subheader' className='text-center line'>step into the world of health & fitness to embark on your Path.</Text>
      <Button className='py-2' textClassName='text-white text-lg' label='Get Started' onPress={() => router.push("/(auth)/login")} />
        <ThemeToggle />
    </ThemedView>
  )
}

export default onboarding