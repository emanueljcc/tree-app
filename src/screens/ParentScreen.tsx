/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {FlatList, Text, View} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import {List} from 'react-native-paper';

import type {RootStackParams} from '@navigator/StackNavigator';
import {
	useGetDataParentQuery,
	useLazyGetDataParentQuery,
} from '@services/api/apiSlice';
import {ChildrenParent, ParentNode} from '@interfaces';
import {SelectLocale, SkeletonLoader, WrapperComponent} from '@components';
import DropDown from 'react-native-paper-dropdown';

type TParentScreenProps = StackScreenProps<RootStackParams, 'ParentScreen'>;

const ParentScreen = ({navigation}: TParentScreenProps) => {
	const [parentData, setParentData] = useState<ParentNode[]>([]);

	// api
	const {data: parents = [], isLoading: isLoadingParent} =
		useGetDataParentQuery(null);
	const [getChildrens] = useLazyGetDataParentQuery();

	/**
	 * The function `handlePress` is an asynchronous function that updates the `parentData` state by
	 * toggling the `expanded` property of the parent object and fetching and updating the children data.
	 * @param {ParentNode} item - The `item` parameter is of type `ParentNode`. It represents a parent
	 * node object with properties such as `id`, `childrens`, and `expanded`.
	 */
	const handlePress = async (item: ParentNode) => {
		try {
			const childrens = await getChildrens({parent: item.id}).unwrap();

			const updatedParent = parentData.map(obj =>
				obj.id === item.id
					? {
							...obj,
							childrens,
							expanded: !obj.expanded,
					  }
					: obj,
			);

			setParentData(updatedParent);
		} catch (error) {
			console.error(error);
		}
	};

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

			<List.Section>
				<FlatList
					data={parentData}
					keyExtractor={item => item.id.toString()}
					renderItem={renderItem}
				/>
			</List.Section>
		</WrapperComponent>
	);
};

export default ParentScreen;
