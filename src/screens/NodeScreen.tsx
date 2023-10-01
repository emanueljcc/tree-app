import {
	useDeleteNodeMutation,
	useLazyGetNodeQuery,
} from '@services/api/apiSlice';
import {useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Button} from 'react-native-paper';

import {RootStackParams} from '@navigator/StackNavigator';
import {ParentNode} from '@interfaces';
import {useAppSelector} from '@store/hooks';
import {CardComponent, SelectLocale} from '@components';

type TNodeScreenProps = StackScreenProps<RootStackParams, 'NodeScreen'>;

const NodeScreen = ({navigation, route}: TNodeScreenProps) => {
	const {value: localeSelected} = useAppSelector(state => state.locale);

	const [nodeData, setNodeData] = useState<ParentNode[] | null>(null);

	// api
	const [getNode, {isLoading}] = useLazyGetNodeQuery();
	const [removeNode, {isLoading: isLoadingRemove}] = useDeleteNodeMutation();

	const {
		item: {id},
	} = route.params;

	/**
	 * The function `handleGetNode` makes an asynchronous call to retrieve a node with specific parameters
	 * and logs the result.
	 */
	const handleGetNode = async () => {
		try {
			const result = await getNode({
				parent: id,
				locale: localeSelected,
			}).unwrap();

			setNodeData(result);
		} catch (error) {
			console.log(error);
		}
	};

	/**
	 * The handleRemove function removes a node with the ID of 1 and navigates back.
	 */
	const handleRemove = async () => {
		try {
			await removeNode(id).unwrap();
			navigation.goBack();
		} catch (error) {
			console.log(error);
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps, no-void
	useEffect(() => void handleGetNode(), [localeSelected]);

	return (
		<>
			<SelectLocale />

			<CardComponent data={nodeData as never} isLoading={isLoading} />

			<Button
				style={{marginTop: 20}}
				disabled={isLoadingRemove}
				loading={isLoadingRemove}
				icon="trash-can"
				mode="text"
				onPress={handleRemove}>
				Remove
			</Button>
		</>
	);
};

export default NodeScreen;
