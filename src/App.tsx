import {
	ActivityIndicator,
	MD3LightTheme as DefaultTheme,
	MD2Colors,
	PaperProvider,
} from 'react-native-paper';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import Toast from 'react-native-toast-message';
import {NavigationContainer} from '@react-navigation/native';

import {StackNavigator} from '@navigator/StackNavigator';
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

const SimpleLoader = () => (
	<ActivityIndicator animating={true} color={MD2Colors.purple100} />
);

const App = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={<SimpleLoader />} persistor={persistor}>
				<PaperProvider theme={theme}>
					<AppWrapper />
					<Toast position="bottom" bottomOffset={30} />
				</PaperProvider>
			</PersistGate>
		</Provider>
	);
};

export default App;
