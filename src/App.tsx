/* eslint-disable react/no-unstable-nested-components */
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {List} from 'react-native-paper';
import {useEffect, useMemo, useState} from 'react';

import {useGetParentsQuery} from './services/api/apiSlice';
import {ParentNode} from './interfaces';

function App(): JSX.Element {
	const [expanded, setExpanded] = useState<ParentNode[]>([]);

	/**
	 * The function `handlePress` updates the `expanded` array by toggling the `expanded` property of the
	 * object with the same `id` as the `item` parameter.
	 * @param {ParentNode} item - The `item` parameter is of type `ParentNode`. It represents an object
	 * that has an `id` property.
	 */
	const handlePress = (item: ParentNode) => {
		const updatedArray = expanded.map(obj => {
			if (obj.id === item.id) {
				return {...obj, expanded: !obj.expanded};
			}
			return obj;
		});

		setExpanded(updatedArray);
	};

	const {data: todos = []} = useGetParentsQuery();

	/* is creating a memoized version of the `todos` array. */
	const todosClean = useMemo(() => {
		return todos.map((todo: ParentNode) => ({
			id: todo.id,
			expanded: false,
		}));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	/* The `useEffect` hook is used to perform side effects in a React component. In this case, the
	`useEffect` hook is used to update the `expanded` state variable with the initial values from the
	`todosClean` array. */
	useEffect(() => setExpanded(todosClean), [todosClean]);

	/**
	 * The function `renderItem` renders a list item with an accordion component in a React TypeScript
	 * application.
	 * @param  - The `renderItem` function takes an object as its parameter, which has a property called
	 * `item`. The `item` property is of type `ParentNode`.
	 * @returns The renderItem function is returning a List.Accordion component with a title, left icon,
	 * expanded state, and onPress event handler. Inside the List.Accordion component, there is a Text
	 * component displaying "Children" and two List.Item components with titles "First item" and "Second
	 * item".
	 */
	const renderItem = ({item}: {item: ParentNode}) => {
		return (
			<List.Accordion
				title={`${item.id} - ${item.title}`}
				left={props => <List.Icon {...props} icon="folder" />}
				expanded={expanded.find(exp => exp.id === item.id)?.expanded}
				onPress={() => handlePress(item)}>
				<Text>Children</Text>
				<List.Item title="First item" onPress={() => console.log('goola')} />
				<List.Item title="Second item" />
			</List.Accordion>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<List.Section title="Parent nodes">
					<FlatList
						data={todos}
						keyExtractor={item => item.id.toString()}
						renderItem={renderItem}
					/>
				</List.Section>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {},
});

export default App;
