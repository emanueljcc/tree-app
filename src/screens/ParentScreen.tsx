/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {List} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';

import type {RootStackParams} from '@navigator/StackNavigator';
import {
	useGetDataParentQuery,
	useLazyGetDataParentQuery,
} from '@services/api/apiSlice';
import {ChildrenParent, ParentNode} from '@interfaces';
import {
	CustomFAB,
	SelectLocale,
	SkeletonLoader,
	WrapperComponent,
} from '@components';

type TParentScreenProps = StackScreenProps<RootStackParams, 'ParentScreen'>;

const ParentScreen = ({navigation}: TParentScreenProps) => {
	const isFocused = useIsFocused();

	const [parentData, setParentData] = useState<ParentNode[]>([]);

	// api
	const {data: parents = [], isLoading: isLoadingParent} =
		useGetDataParentQuery(null);
	const [getChildrens] = useLazyGetDataParentQuery();

	/**
	 * The function `updatedData` updates the parent data by fetching and adding children data, and also
	 * toggles the expanded state of the parent item.
	 * @param {ParentNode} item - The `item` parameter is an object representing a parent node. It likely
	 * has properties such as `id`, `childrens`, and `expanded`.
	 * @param [isExpanded=false] - The `isExpanded` parameter is a boolean value that determines whether
	 * the parent item should be expanded or collapsed. If `isExpanded` is `true`, the parent item's
	 * `expanded` property will be toggled. If `isExpanded` is `false`, the parent item's `expanded`
	 */
	const updatedData = async (item: ParentNode, isExpanded = false) => {
		try {
			const childrens = await getChildrens({parent: item.id}).unwrap();

			const updatedParent = parentData.map(obj =>
				obj.id === item.id
					? {
							...obj,
							childrens,
							expanded: isExpanded ? !obj.expanded : obj.expanded,
					  }
					: obj,
			);

			setParentData(updatedParent);
		} catch (error) {
			console.log(error);
		}
	};

	/**
	 * The function "handlePress" is an asynchronous function that takes in a parameter "item" of type
	 * "ParentNode" and calls the function "updatedData" with the "item" parameter and a boolean value of
	 * true.
	 * @param {ParentNode} item - The `item` parameter is of type `ParentNode`. It represents a DOM node
	 * that can have child nodes, such as an element or a document.
	 */
	const handlePress = async (item: ParentNode) => updatedData(item, true);

	/* The `useEffect` hook is used to perform side effects in a React component. In this case, the effect
	is triggered whenever the `parents.length` value changes. */
	useEffect(() => {
		const tmp = parents.map((parent: ParentNode) => ({
			...parent,
			expanded: false,
			isLoadingChild: false,
		}));

		setParentData(tmp);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [parents.length]);

	useEffect(() => {
		(async () => {
			const item = parentData.find(par => par.expanded);

			if (item) {
				updatedData(item);
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isFocused]);

	const handleNavigation = (ch: ChildrenParent) => {
		navigation.removeListener;
		navigation.navigate('NodeScreen', {item: ch} as never);
	};

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
		const title = () => <Text>{`${item.id} - ${item.title}`} </Text>;
		return (
			<List.Accordion
				title={title()}
				left={props => <List.Icon {...props} icon="folder" />}
				expanded={item.expanded}
				onPress={() => handlePress(item)}>
				<View style={{marginHorizontal: 5}}>
					<Text>Children</Text>
					{item.childrens?.length &&
						item.childrens.map(ch => (
							<List.Item
								key={ch.id}
								title={ch.title}
								onPress={() => handleNavigation(ch)}
							/>
						))}
				</View>
			</List.Accordion>
		);
	};

	// simple return
	if (isLoadingParent) {
		return (
			<WrapperComponent>
				{Array(5)
					.fill(0)
					.map((_, index) => (
						<SkeletonLoader key={index} veryHight />
					))}
			</WrapperComponent>
		);
	}

	return (
		<WrapperComponent>
			<SelectLocale />

			<List.Section style={{marginBottom: 50}}>
				<FlatList
					data={parentData}
					keyExtractor={item => item.id.toString()}
					renderItem={renderItem}
				/>
			</List.Section>

			<CustomFAB onPress={() => navigation.navigate('CreateScreen')} />
		</WrapperComponent>
	);
};

export default ParentScreen;
