import {AppRegistry} from 'react-native';
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

import {name as appName} from './app.json';
import App from './src/App';
import {store} from './src/store';

const persistor = persistStore(store);

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

export default function Main() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <PaperProvider theme={theme}>
          <App />
          <Toast position="bottom" bottomOffset={30} />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}

const Loader = () => (
  <ActivityIndicator animating={true} color={MD2Colors.red800} />
);

AppRegistry.registerComponent(appName, () => Main);
