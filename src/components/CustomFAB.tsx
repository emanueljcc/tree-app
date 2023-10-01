import {StyleSheet} from 'react-native';
import {FAB} from 'react-native-paper';

type TCustomFAB = {
	onPress: () => void;
};
const CustomFAB = ({onPress}: TCustomFAB) => {
	return (
		<FAB
			icon="plus"
			style={styles.fab}
			customSize={64}
			onPress={onPress}
			visible
		/>
	);
};

export default CustomFAB;

const styles = StyleSheet.create({
	fab: {
		position: 'absolute',
		bottom: 50,
		right: 30,
	},
});
