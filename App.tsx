import { StyleSheet} from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Navigator from './src/navigation/Navigator'
import StateProvider from './src/infrastructure/state-management/StateProvider'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import ToastManager from 'react-native-toast-alert'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

const Stack = createStackNavigator();

const App = () => {
	return (
		<StateProvider>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<BottomSheetModalProvider>
					<ToastManager />
					<NavigationContainer>
						<Navigator />
					</NavigationContainer>
				</BottomSheetModalProvider>
			</GestureHandlerRootView>
		</StateProvider>
	)
}

export default App

const styles = StyleSheet.create({})