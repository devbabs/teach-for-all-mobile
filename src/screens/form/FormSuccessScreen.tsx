import { StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Toast } from 'react-native-toast-alert'
import { Colors } from '../../common/utils/colors'
import Text, { TextType } from '../../common/components/Text'
import { ScrollView } from 'react-native-gesture-handler'
import { CheckCircleIcon } from 'react-native-heroicons/outline'
import Button from '../../common/components/Button'

const FormSuccessScreen = ({navigation, route}) => {
    console.log("Props", route.params.formValues)
    useEffect(() => {
        // Toast.success("Form submitted successfully")
    }, [])
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{padding: 20}}>
                <Text type={TextType.title2} style={{textAlign: 'center', marginTop: 20}}>
                    Your submission was successful!
                </Text>
                <CheckCircleIcon color={Colors.primary} size={100} style={{alignSelf: 'center', marginVertical: 20}} />

                <Text style={{textAlign: 'center', marginBottom: 20}}>
                    Here are the details you submitted:
                </Text>

                <View style={styles.formValuesContainer}>
                    {
                        Object.keys(route.params.formValues).map((eachFormField, index) => {
                            return (
                                <View key={index} style={styles.formValueContainer}>
                                    <Text style={{fontWeight: 'bold', textTransform: 'capitalize'}}>{eachFormField}: </Text>
                                    <Text style={{flex: 1}}>{route.params.formValues[eachFormField]}</Text>
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>

            <Button
                label={'Return to home'}
                onPress={() => {
                    navigation.popToTop()
                }}
                style={{margin: 20}}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    formValuesContainer: {
        backgroundColor: Colors.gray100,
        borderRadius: 5,
    },
    formValueContainer: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: Colors.white
    }
})

export default FormSuccessScreen