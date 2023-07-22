import React from 'react';
import { Dimensions, StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ReactNativeTab from '../components/BottomTabs/ReactNativeTab';
import ReactTab from '../components/BottomTabs/ReactTab';
import NodeTab from '../components/BottomTabs/NodeTab';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
	return (
		<Tab.Navigator
			initialRouteName="react-native"
			backBehavior="initialRoute"
			screenOptions={{
				tabBarStyle: {
					backgroundColor: 'black',
				},
				tabBarActiveTintColor: '#00b7ff',
				tabBarInactiveTintColor: 'white',
				tabBarActiveBackgroundColor: '#ffffff1a',
			}}
		>
			<Tab.Screen
				name="react"
				component={ReactTab}
				options={{
					tabBarLabel: 'React',
					tabBarLabelStyle: styles.tabLabel,
					tabBarIcon: () => (
						<Image source={require('../../assets/React-Logo.png')} style={styles.reactImageStyle} />
					),
					headerShown: false,
				}}
			/>
			<Tab.Screen
				name="react-native"
				component={ReactNativeTab}
				options={{
					tabBarLabel: 'React Native',
					tabBarLabelStyle: styles.tabLabel,
					tabBarIcon: () => (
						<Image source={require('../../assets/React-Logo.png')} style={styles.reactImageStyle} />
					),
					headerShown: false,
				}}
			/>
			<Tab.Screen
				name="NodeJs"
				component={NodeTab}
				options={{
					tabBarLabel: 'Node',
					tabBarLabelStyle: styles.tabLabel,
					tabBarIcon: () => (
						<Image source={require('../../assets/Node-Logo.png')} style={styles.nodeImageStyle} />
					),
					headerShown: false,
				}}
			/>
		</Tab.Navigator>
	);
}

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default BottomTabNavigator;

const styles = StyleSheet.create({
	tabLabel: {
		fontWeight: 'bold',
		textAlign: 'center',
		justifyContent: 'center',
		marginBottom: (deviceHeight * 0.2) / 100,
		fontSize: 12,
	},
	reactImageStyle: {
		height: 26,
		width: 26,
		marginTop: (deviceHeight * 0.5) / 100,
	},
	nodeImageStyle: {
		height: 26,
		width: 30,
		marginTop: (deviceHeight * 0.5) / 100,
	},
});
