import {
    StyleSheet,
    View,
    ViewStyle,
    TextInput as NativeTextInput,
    KeyboardTypeOptions,
    ReturnKeyTypeOptions,
    TextStyle,
    TextInputFocusEventData,
    NativeSyntheticEvent,
} from 'react-native';
import React, {forwardRef, useState} from 'react';
import { Colors } from '../utils/colors';
  
export interface ITextInput {
    onChangeText: any;
    onFocus?: () => void;
    secureTextEntry?: boolean;
    value: string;
    defaultValue?: string;
    placeholder?: string;
    style?: ViewStyle | ViewStyle[];
    inputStyle?: TextStyle | TextStyle[];
    keyboardType?: KeyboardTypeOptions | undefined;
    textContentType?:
        | 'none'
        | 'URL'
        | 'addressCity'
        | 'addressCityAndState'
        | 'addressState'
        | 'countryName'
        | 'creditCardNumber'
        | 'emailAddress'
        | 'familyName'
        | 'fullStreetAddress'
        | 'givenName'
        | 'jobTitle'
        | 'location'
        | 'middleName'
        | 'name'
        | 'namePrefix'
        | 'nameSuffix'
        | 'nickname'
        | 'organizationName'
        | 'postalCode'
        | 'streetAddressLine1'
        | 'streetAddressLine2'
        | 'sublocality'
        | 'telephoneNumber'
        | 'username'
        | 'password'
        | 'newPassword'
        | 'oneTimeCode';
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
    disabled?: boolean;
    autoFocus?: boolean;
    returnKeyType?: ReturnKeyTypeOptions;
    onEndEditing?: () => void;
    left?: any;
    right?: any;
    maxLength?: number | undefined;
    multiline?: any;
    numberOfLines?: number | undefined;
    onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}
  
const TextInput = forwardRef(
    (
        {
            onChangeText,
            onFocus,
            value,
            defaultValue = '',
            placeholder = '',
            style,
            inputStyle,
            keyboardType,
            textContentType,
            autoCapitalize,
            secureTextEntry = false,
            disabled = false,
            autoFocus = false,
            returnKeyType = 'done',
            onEndEditing,
            left,
            right,
            maxLength,
            multiline,
            numberOfLines,
            onBlur,
        }: ITextInput,
        ref,
    ) => {
        const [inputFocused, setInputFocused] = useState(false);
    
        return (
            <View
                style={[
                    styles.container,
                    {
                        borderColor: inputFocused ? Colors.primary : Colors.gray900,
                    },
                    style,
                ]}>
                {left ? (
                    <View style={{marginRight: 5, justifyContent: 'center'}}>{left}</View>
                ) : null}
                <NativeTextInput
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={'#2D2D2D80'} // TODO: change if need be
                    value={value}
                    defaultValue={defaultValue}
                    style={[
                        styles.input,
                        {
                            minHeight: numberOfLines ? 30 * numberOfLines - 30 : 30,
                            // paddingVertical: 100,
                        },
                        inputStyle,
                    ]}
                    keyboardType={keyboardType}
                    textContentType={textContentType}
                    autoCapitalize={autoCapitalize}
                    secureTextEntry={secureTextEntry}
                    editable={!disabled}
                    returnKeyType={returnKeyType}
                    onEndEditing={onEndEditing}
                    onFocus={() => {
                        if (onFocus) onFocus();
                        setInputFocused(true);
                    }}
                    onBlur={e => {
                        setInputFocused(false);
                        if (onBlur) onBlur(e);
                    }}
                    maxLength={maxLength}
                    ref={ref}
                    autoFocus={autoFocus}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                />
                {right ? (
                    <View style={{marginLeft: 5, justifyContent: 'center'}}>{right}</View>
                ) : null}
            </View>
        );
    },
);
  
const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.gray900,
        backgroundColor: '#F1F1F1',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        color: Colors.black,
        height: 40,
        flex: 1,
        fontSize: 12, //14
        fontFamily: 'Montserrat-Regular',
    },
});
  
export default TextInput;
  