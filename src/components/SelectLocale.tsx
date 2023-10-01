import DropDown from 'react-native-paper-dropdown';
import {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {useGetLocalesQuery} from '@services/api/apiSlice';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {setValue} from '@store/localeSlice';
import BasicLoader from './BasicLoader';

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
		return <BasicLoader />;
	}
	return (
		<View style={styles.margin}>
			{isLoading && <BasicLoader />}

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
					dropDownItemTextStyle={styles.textDark}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	margin: {marginHorizontal: 15},
	textDark: {color: '#808080'},
});

export default SelectLocale;
