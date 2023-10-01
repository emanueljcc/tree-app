import {useLazyGetNodeQuery} from '@services/api/apiSlice';
import {useEffect, useState} from 'react';
import {View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {CardComponent} from '@components';
import {RootStackParams} from '@navigator/StackNavigator';
import {ParentNode} from '@interfaces';

type TNodeScreenProps = StackScreenProps<RootStackParams, 'NodeScreen'>;

const NodeScreen = ({navigation, route}: TNodeScreenProps) => {
	const [nodeData, setNodeData] = useState<ParentNode[] | null>(null);
	console.log('nodeData', nodeData);

	// api
	const [getNode, {isLoading}] = useLazyGetNodeQuery();

	const {item} = route.params;

	/**
	 * The function `handleGetNode` makes an asynchronous call to retrieve a node with specific parameters
	 * and logs the result.
	 */
	const handleGetNode = async () => {
		try {
			const {id} = item;
			const result = await getNode({
				parent: id,
				locale: 'es_ES', // TODO: tomar el lng by default redux
			}).unwrap();

			setNodeData(result);
		} catch (error) {
			console.log(error);
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps, no-void
	useEffect(() => void handleGetNode(), []);

	return (
		<View>
			<CardComponent data={nodeData as never} isLoading={isLoading} />
		</View>
	);
};

export default NodeScreen;
