import DropDown from 'react-native-paper-dropdown';
import {useState} from 'react';
import {View, Text} from 'react-native';

import {useGetLocalesQuery} from '@services/api/apiSlice';

const SelectLocale = () => {
	const {data, isLoading} = useGetLocalesQuery();

	const [showDropDown, setShowDropDown] = useState(false);
	const [locale, setLocale] = useState('');

	if (isLoading) {
		return <Text>Loading locales...</Text>;
	}
	return (
		<View style={{marginHorizontal: 15}}>
			{isLoading && <Text>Loading locales...</Text>}

			{data && (
				<DropDown
					label="Locale"
					mode="outlined"
					visible={showDropDown}
					showDropDown={() => setShowDropDown(true)}
					onDismiss={() => setShowDropDown(false)}
					value={locale}
					setValue={setLocale}
					list={data as never}
				/>
			)}
		</View>
	);
};

export default SelectLocale;
