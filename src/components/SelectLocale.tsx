import DropDown from 'react-native-paper-dropdown';
import {useState} from 'react';
import {View, Text} from 'react-native';

import {useGetLocalesQuery} from '@services/api/apiSlice';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {setValue} from '@store/localeSlice';

const SelectLocale = () => {
	const dispatch = useAppDispatch();

	const {value: localeSelected} = useAppSelector(state => state.locale);

	const {data, isLoading} = useGetLocalesQuery();

	const [showDropDown, setShowDropDown] = useState(false);
	const [locale, setLocale] = useState('');

	const handleSelection = (val: string) => {
		setLocale(val);
		dispatch(setValue(val));
	};

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
					value={locale || localeSelected}
					setValue={handleSelection}
					list={data as never}
				/>
			)}
		</View>
	);
};

export default SelectLocale;
