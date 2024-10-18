import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import SplashScreen from '../screens/SplashScreen'
import FormScreen from '../screens/form/FormScreen'
import Text from '../common/components/Text'
import FormSuccessScreen from '../screens/form/FormSuccessScreen'

const Stack = createStackNavigator()

const Navigator = () => {
    
    return (
        <Stack.Navigator>
            <Stack.Screen
                component={SplashScreen}
                name={"SplashScreen"}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                component={FormScreen}
                name={"FormScreen"}
                options={{
                    title: "Dynamic Form"
                }}
            />
            <Stack.Screen
                component={FormSuccessScreen}
                name={"FormSuccessScreen"}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default Navigator