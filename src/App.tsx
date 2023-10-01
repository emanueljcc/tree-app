import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import Toast from 'react-native-toast-message';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';

import {StackNavigator} from '@navigator/StackNavigator';
import {BasicLoader} from '@components';
import {store} from '@store';

const persistor = persistStore(store);

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
	},
};

const AppWrapper = () => (
	<NavigationContainer>
		<StackNavigator />
	</NavigationContainer>
);

const Loader = () => (
	<View style={styles.container}>
		<BasicLoader />
	</View>
);

const App = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={<Loader />} persistor={persistor}>
				<PaperProvider theme={theme}>
					<AppWrapper />
					<Toast position="bottom" bottomOffset={30} />
				</PaperProvider>
			</PersistGate>
		</Provider>
	);
};

const styles = StyleSheet.create({
	container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default App;
