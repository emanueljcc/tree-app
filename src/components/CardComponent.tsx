import {Avatar, Card, Text} from 'react-native-paper';
import {StyleSheet} from 'react-native';

import {ParentNode} from '@interfaces';

type TCardComponent = {
	data: ParentNode | null;
	isLoading: boolean;
};
const CardComponent = ({data, isLoading}: TCardComponent) => {
	if (isLoading) {
		return <Text>Loading...</Text>;
	}

	if (data?.translation?.length === 0) {
		return <Text>Seleccione un idioma...</Text>;
	}

	return (
		<>
			{data?.translation && data?.translation.length && (
				<Card style={styles.card}>
					<Card.Title
						title={data?.translation && data.translation[0]?.title}
						left={props => (
							<Avatar.Icon {...props} icon="account-arrow-right" />
						)}
					/>
					<Card.Content>
						<Text variant="bodyMedium">{data.translation[0].locale}</Text>
					</Card.Content>
				</Card>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	card: {
		margin: 4,
		marginTop: 15,
	},
});

export default CardComponent;
