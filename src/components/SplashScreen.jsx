import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';

const SplashScreen = ({ navigation }) => {
	useEffect(() => {
		setTimeout(() => {
			navigation.replace('HomeScreen');
		}, 2000);
	}, []);

	return (
		<View style={styles.mainContainer}>
			<Text style={styles.title}>Stack Overflow</Text>
		</View>
	);
};

export default SplashScreen;

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#000000',
	},
	title: {
		fontWeight: 'bold',
		color: '#ffffff',
		fontSize: 20,
	},
});
