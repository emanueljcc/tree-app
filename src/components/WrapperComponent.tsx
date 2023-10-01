import {SafeAreaView, StyleSheet} from 'react-native';

import {Children} from '@interfaces';

const WrapperComponent = ({children}: Children) => (
	<SafeAreaView style={styles.container}>{children}</SafeAreaView>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default WrapperComponent;
