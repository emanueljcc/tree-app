/* eslint-disable react/no-unstable-nested-components */
import {createStackNavigator} from '@react-navigation/stack';

import {CustomNavigationBar} from '@components';
import {NodeScreen, ParentScreen, CreateScreen} from '@screens';
import {ParentNode} from '@interfaces';

export type RootStackParams = {
	ParentScreen: undefined;
	NodeScreen: {
		item: ParentNode;
	};
	CreateScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
	return (
		<Stack.Navigator
			initialRouteName="ParentScreen"
			screenOptions={{
				headerStyle: {
					elevation: 0,
					shadowColor: 'transparent',
				},
				cardStyle: {
					backgroundColor: 'white',
				},
				header: props => <CustomNavigationBar {...props} />,
			}}>
			<Stack.Screen
				name="ParentScreen"
				options={{title: 'Parent Nodes'}}
				component={ParentScreen}
			/>
			<Stack.Screen
				name="NodeScreen"
				options={{title: 'Node'}}
				component={NodeScreen}
			/>
			<Stack.Screen
				name="CreateScreen"
				options={{title: 'Create Node'}}
				component={CreateScreen}
			/>
		</Stack.Navigator>
	);
};
