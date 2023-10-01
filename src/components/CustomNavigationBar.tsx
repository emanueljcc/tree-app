import {Appbar} from 'react-native-paper';
import {getHeaderTitle} from '@react-navigation/elements';

const CustomNavigationBar = ({navigation, route, options, back}: any) => {
	const title = getHeaderTitle(options, route.name);

	const handleGoback = () => navigation.goBack();

	return (
		<Appbar.Header>
			{back ? <Appbar.BackAction onPress={handleGoback} /> : null}
			<Appbar.Content title={title} />
		</Appbar.Header>
	);
};

export default CustomNavigationBar;
