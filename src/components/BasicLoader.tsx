import {ActivityIndicator, StyleSheet} from 'react-native';

const BasicLoader = () => {
	return <ActivityIndicator style={styles.container} size="large" />;
};

const styles = StyleSheet.create({
	container: {
		marginTop: 30,
	},
});

export default BasicLoader;
