import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {View} from 'react-native';
import {memo} from 'react';

type TSkeletonLoader = {
	veryHight?: boolean;
};
const SkeletonLoader = ({veryHight = false}: TSkeletonLoader) => {
	return (
		<View style={{marginTop: veryHight ? 20 : 5}}>
			<SkeletonPlaceholder borderRadius={4}>
				<SkeletonPlaceholder.Item
					width={veryHight ? 350 : 300}
					height={veryHight ? 30 : 20}
					alignSelf="center"
					marginTop={12}
				/>
			</SkeletonPlaceholder>
		</View>
	);
};

export default memo(SkeletonLoader);
