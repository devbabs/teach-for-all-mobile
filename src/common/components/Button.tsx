import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import React, { Component } from 'react'
import { RectButton } from 'react-native-gesture-handler'
import Text, { TextType } from './Text'
import { Colors } from '../utils/colors'

const Button = ({label, size = 'medium', style, textStyle = {}, mode = 'primary', onPress, disabled, icon, contentReversed = false, children}: {
    label?: string,
    size?: 'small' | 'medium' | 'large',
    style?: ViewStyle,
    textStyle?: TextStyle,
    mode?: 'primary' | 'secondary' | 'outlined',
    onPress: () => void,
    disabled?: boolean,
    icon?: Component,
    contentReversed?: boolean,
    children?: any
}) => {
    let buttonStyles: ViewStyle = {
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: disabled ? Colors.primaryLight : Colors.primary
    }
    
    if (mode == 'primary') {
        buttonStyles.backgroundColor = disabled ? Colors.primaryLight : Colors.primary
        buttonStyles.borderColor = disabled ? Colors.primaryLight : Colors.primary
    } else if (mode == 'secondary') {
        buttonStyles.backgroundColor = disabled ? Colors.secondaryLight : Colors.secondary
        buttonStyles.borderColor = disabled ? Colors.secondaryLight : Colors.secondary
    } else {
        buttonStyles.backgroundColor = Colors.transparent
        buttonStyles.borderColor = Colors.primary
    }

    switch (size) {
        case 'small':
            buttonStyles.height = 40
            buttonStyles.padding = 4
            buttonStyles.minWidth = 80
            break;
        case 'large':
            buttonStyles.height = 65       
            buttonStyles.padding = 10
            buttonStyles.minWidth = 120
            break;
        default:
            buttonStyles.height = 57
            buttonStyles.padding = 10
            buttonStyles.minWidth = 100
            break;
    }

    return (
        <RectButton
            style={[buttonStyles, style]}
            onPress={() => disabled ? null : onPress()}
            rippleColor={disabled ? Colors.transparent : undefined}
            underlayColor={disabled ? Colors.transparent : undefined}
        >
            <View style={{ flexDirection: contentReversed ? 'row-reverse' : 'row', alignItems: 'center' }}>
                <Text type={TextType.body}
                    style={[{
                        color: (mode == 'primary' || mode == 'secondary')? Colors.white : (disabled ? Colors.primaryLight : Colors.primary),
                        fontSize: size == 'small' ? 12 : (size == 'large' ? 20 : 16),
                        marginHorizontal: icon ? 5 : 0,
                        fontFamily: "GothamBold",
                    }, textStyle]}>
                    {label ? label : children}
                </Text>
                {icon}
            </View>
        </RectButton>
    )
}

const styles = StyleSheet.create({})

export default Button