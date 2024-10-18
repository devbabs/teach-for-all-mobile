import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import React, { Component, forwardRef } from 'react'
import { BottomSheetModal, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet'
import Text, { TextType } from './Text';
import { IconButton, List } from 'react-native-paper';
import { RectButton } from 'react-native-gesture-handler';
import { Colors } from '../utils/colors';
import { XMarkIcon } from 'react-native-heroicons/outline';

const CustomBottomSheet = forwardRef(function CustomBottomSheet({
    children,
    dismissible = true,
    snapPoints = [450],
    sheetTitle,
    sheetTitleStyle = {},
    LeftActionComponent,
    RightActionComponent,
    loading = false,
    hasBottomTabs = false,
    scrollable = false,
    onOpen,
    customComponent,
    handleStyle = {}
}: {
    dismissible?: boolean
    children?: any
    snapPoints?: any[]
    sheetTitle?: string
    sheetTitleStyle?: TextStyle
    LeftActionComponent?: Component
    RightActionComponent?: Component
    loading?: boolean
    hasBottomTabs?: boolean
    scrollable?: boolean
    onOpen?: () => void,
    customComponent?: any
    handleStyle?: ViewStyle
}, ref) {
    const ContentComponent = scrollable ? BottomSheetScrollView : BottomSheetView
    
    const dismissBottomSheet = () => {
        ref?.current?.close()
    }
    
    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            // onChange={handleSheetChanged}
            handleStyle={[{backgroundColor: loading ? 'rgba(0, 0, 0, 0.3)' : Colors.transparent}, handleStyle]}
            style={{
                overflow: 'hidden',
                borderRadius: 20
            }}
            enablePanDownToClose={dismissible && !scrollable}
            enableDismissOnClose={true}
            backdropComponent={({ style }) => (
                <View style={[style, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
                    <RectButton
                        onPress={() => dismissible && dismissBottomSheet()}
                        style={{flex: 1}}
                        rippleColor={Colors.transparent}
                        underlayColor={Colors.transparent}
                    />
                </View>
            )}
        >
            <ContentComponent style={styles.contentContainer}>
                {
                    (dismissible || LeftActionComponent || RightActionComponent) ? (
                        <List.Item
                            title={() => <Text type={TextType.title3} style={[{fontSize: 16}, sheetTitleStyle]}>{sheetTitle}</Text>}
                            style={{
                                paddingLeft: LeftActionComponent ? 15 : 5,
                                paddingRight: 15,
                                paddingBottom: 0,
                                paddingTop: 0,
                                position: 'absolute',
                                zIndex: 10000,
                                width: '100%',
                            }}
                            left={() => (
                                <View
                                    style={{
                                        justifyContent: 'center'
                                    }}
                                >
                                    {LeftActionComponent}
                                </View>
                            )}
                            right={() => (
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        gap: 20
                                    }}
                                >
                                    {RightActionComponent && <View
                                        style={{
                                            justifyContent: 'center'
                                        }}
                                    >
                                        {RightActionComponent}
                                    </View>}
                                    {dismissible && (
                                        <IconButton
                                            icon={() => <XMarkIcon color={Colors.black} size={20} />}
                                            size={20}
                                            style={{ alignSelf: 'flex-end', backgroundColor: '#f4f4f4', marginRight: 0, borderRadius: 8 }}
                                            onPress={() => dismissBottomSheet()}
                                        />
                                    )}
                                </View>
                            )}
                        />
                    ) : null
                }
                <View style={{paddingTop: (dismissible || LeftActionComponent || RightActionComponent) ? 50 : 0}}>
                    {children}
                </View>
            </ContentComponent>
        </BottomSheetModal>
    )
})

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        backgroundColor: Colors.white
    }
})

export default CustomBottomSheet