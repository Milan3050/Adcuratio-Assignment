import {
	ActivityIndicator,
	Dimensions,
	FlatList,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Linking,
	Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AxiosRequest from '../api/AxiosRequest';
import he from 'he';

function RenderTiles(props) {
	const [questionsData, setQuestionsData] = useState([]);
	const [loader, setLoader] = useState(true);
	const [infinityScrollLoader, setInfinityScrollLoader] = useState(false);
	const [page, setPage] = useState(1);
	const tag = props.name;

	useEffect(() => {
		fetchQuestionsData(tag, page);
	}, [page]);

	const fetchQuestionsData = (tag, page) => {
		AxiosRequest.fetchQuestions(tag, page).then(
			(response) => {
				if (response.status === 200) {
					setQuestionsData((prevQuestions) => [...prevQuestions, ...response.data.items]);
					setLoader(false);
					setInfinityScrollLoader(false);
				} else {
					console.log('Error response', response);
					setLoader(false);
					setInfinityScrollLoader(false);
				}
				Promise.resolve();
			},
			(error) => {
				setLoader(false);
				setInfinityScrollLoader(false);
				const message = error.toString();
				Promise.reject();
			}
		);
	};

	const handleEndReached = () => {
		setInfinityScrollLoader(true);
		setPage((prevPage) => prevPage + 1);
	};

	const handleOpenLink = (link) => {
		const url = link;
		Linking.openURL(url).catch((err) => console.error('Error occurred:', err));
	};

	const convertUnixTimestampToDate = (timestamp) => {
		const date = new Date(timestamp * 1000);

		const options = {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			hour12: true,
			timeZone: 'Asia/Kolkata',
		};

		return date.toLocaleString('en-IN', options);
	};

	const tagsUI = (item) => {
		return (
			<View style={styles.tagContainer}>
				{item.tags.map((tag, index) => (
					<View key={index} style={styles.tagTextConatiner}>
						<Text style={styles.tagsText}>{tag}</Text>
					</View>
				))}
			</View>
		);
	};

	const dateAndUserInfo = (item) => {
		const modifiedDate = convertUnixTimestampToDate(item.last_activity_date);
		return (
			<View>
				{item.is_answered ? (
					<Text style={styles.dateAndUserInfoText}>Answered on: {modifiedDate}</Text>
				) : item.last_edit_date !== undefined && item.last_edit_date !== null ? (
					<Text style={styles.dateAndUserInfoText}>Modified on: {modifiedDate}</Text>
				) : (
					<Text style={styles.dateAndUserInfoText}>Created on : {modifiedDate}</Text>
				)}
			</View>
		);
	};

	const renderQuestions = (itemData) => {
		const title = he.decode(itemData.item.title);

		return (
			<View style={[styles.questionTile, styles.elevationShadowStyle]}>
				{/* -----------question title----------- */}

				<TouchableOpacity onPress={() => handleOpenLink(itemData.item.link)}>
					<Text style={[styles.questionTitle]} numberOfLines={2}>
						{title}
					</Text>
				</TouchableOpacity>

				{/* ------------------tags------------------- */}
				<View>{tagsUI(itemData.item)}</View>

				{/* -------------------------date and user info------------------------ */}
				<View style={styles.dateAndUserContainer}>{dateAndUserInfo(itemData.item)}</View>

				{/* ---------------------view count------------------- */}
				<View style={styles.viewCountContainer}>
					<Image source={require('../../assets/Eye.png')} style={styles.eyeImage} />
					<Text style={styles.viewCount}>{itemData.item.view_count}</Text>
				</View>
			</View>
		);
	};

	return (
		<SafeAreaView style={styles.mainContainer}>
			{loader ? (
				<ActivityIndicator style={styles.activityIndicator} size="large" color="white" />
			) : (
				<>
					<Text style={styles.mainTitle}>
						{tag === 'react' ? 'React' : tag === 'react-native' ? 'React Native' : 'NodeJs'} Section
					</Text>
					<FlatList
						data={questionsData}
						keyExtractor={(item, index) => index}
						renderItem={renderQuestions}
						contentContainerStyle={{ paddingBottom: (deviceHeight * 0.6) / 100 }}
						showsVerticalScrollIndicator={false}
						onEndReached={handleEndReached}
						onEndReachedThreshold={1}
						ListFooterComponent={() => {
							return infinityScrollLoader ? (
								<ActivityIndicator style={{ marginVertical: 20 }} />
							) : null;
						}}
					/>
				</>
			)}
		</SafeAreaView>
	);
}

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default RenderTiles;

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: '#000000',
	},

	activityIndicator: {
		paddingHorizontal: 24,
		paddingVertical: 112,
		alignSelf: 'center',
		flex: 1,
		justifyContent: 'center',
	},

	mainTitle: {
		textAlign: 'center',
		fontSize: 18,
		fontWeight: 'bold',
		marginVertical: (deviceHeight * 1) / 100,
		color: 'white',
	},

	questionTile: {
		marginTop: (deviceHeight * 1) / 100,
		height: (deviceHeight * 15) / 100,
		padding: (deviceWidth * 1) / 100,
		paddingHorizontal: (deviceWidth * 2) / 100,
		backgroundColor: 'white',
	},

	questionTitle: {
		color: 'black',
		fontSize: 16,
		fontWeight: 'bold',
	},

	elevationShadowStyle: {
		shadowColor: '#434343',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		elevation: 5,
		shadowRadius: 6,
		borderWidth: 0.1,
		borderColor: 'white',
	},

	dateAndUserContainer: {
		alignItems: 'flex-end',
		position: 'absolute',
		right: (deviceWidth * 2) / 100,
		bottom: 8,
	},

	dateAndUserInfoText: {
		fontSize: 12,
		color: 'grey',
	},

	viewCountContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: (deviceWidth * 8) / 100,
		position: 'absolute',
		bottom: 3,
		left: (deviceWidth * 2) / 100,
	},

	eyeImage: {
		height: 26,
		width: 17,
		resizeMode: 'contain',
		marginTop: (deviceHeight * 0.2) / 100,
	},

	viewCount: {
		color: 'black',
		fontSize: 12,
	},

	tagContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: (deviceHeight * 1) / 100,
	},

	tagTextConatiner: {
		backgroundColor: '#000000',
		borderRadius: 5,
		paddingHorizontal: (deviceWidth * 2) / 100,
		paddingVertical: (deviceHeight * 0.3) / 100,
		marginRight: (deviceWidth * 2) / 100,
		marginBottom: (deviceHeight * 0.5) / 100,
	},

	tagsText: {
		fontSize: 10,
		color: 'white',
	},
});
