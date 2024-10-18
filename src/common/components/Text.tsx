import { StyleSheet, Text as ReactText, TextStyle, View } from "react-native"
import React from "react"

export enum TextType {
    largeTitle = 'largeTitle',
    title1 = 'title1',
    title2 = 'title2',
    title3 = 'title3',
    body = 'body',
    small = 'small',
}

const Text = ({
	children,
	type = TextType.body,
	style,
	textLineHeight = false,
	numberOfLines = undefined,
	...props
}: {
	children?: React.ReactNode | undefined
	type?: TextType
	style?: TextStyle | TextStyle[]
	textLineHeight?: boolean
	numberOfLines?: number | undefined
}) => {
	let styles = null

	switch (type) {
		case TextType.largeTitle:
			styles = StyleSheet.create({
				text: {
					fontSize: 32,
					lineHeight: 45,//textLineHeight ? 32 : undefined,
					marginBottom: -10,
					fontWeight: "700",
				},
			})
			break
		case TextType.title1:
			styles = StyleSheet.create({
				text: {
					fontSize: 28,
					lineHeight: 36,//textLineHeight ? 28 : undefined,
					// marginBottom: -5,
					// fontWeight: "700",
				},
			})
			break
		case TextType.title2:
			styles = StyleSheet.create({
				text: {
					fontSize: 24,
					lineHeight: 32,//textLineHeight ? 24 : undefined,
					// marginBottom: -8,
					// fontWeight: "500",
				},
			})
			break
		case TextType.title3:
			styles = StyleSheet.create({
				text: {
					fontSize: 20,
					lineHeight: 26,//textLineHeight ? 20 : undefined,
					// marginBottom: -10,
					// fontWeight: "300",
				},
			})
			break
		case TextType.small:
			styles = StyleSheet.create({
				text: {
					fontSize: 12,
					lineHeight: 14,//textLineHeight ? 12 : undefined,
					// marginBottom: -5,
                    // fontWeight: "300",
				},
			})
			break
		default: // body
			styles = StyleSheet.create({
				text: {
					fontSize: 16,
					lineHeight: 24,//textLineHeight ? 16 : undefined,
					// marginBottom: -8,
					// fontWeight: "normal",
				},
			})
			break
	}
	return (
		<ReactText
			style={[{ color: '#333333' }, styles?.text, style]}
			numberOfLines={numberOfLines}
			{...props}
		>
			{children}
		</ReactText>
	)
}

export default Text
