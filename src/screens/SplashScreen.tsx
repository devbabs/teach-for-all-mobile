import { Animated, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Text, { TextType } from '../common/components/Text'
import { Toast } from 'react-native-toast-alert'

const SplashScreen = ({navigation}) => {
    const [splashAnimationOpacity, setSplashAnimationOpacity] = useState(new Animated.Value(0))

    useEffect(() => {
        showAnimatedText()
    }, [])
    
    const showAnimatedText = () => {
        Animated.timing(splashAnimationOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start(() => {
            leaveSplashScreen()
        })
    }

    const leaveSplashScreen = () => {
        navigation.reset({
            index: 0,
            routes: [{name: "FormScreen"}]
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <Animated.View style={[{padding: 10, opacity: splashAnimationOpacity}]}>
                <Text type={TextType.largeTitle} style={{textAlign: 'center'}}>
                    Welcome
                </Text>
            </Animated.View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default SplashScreen