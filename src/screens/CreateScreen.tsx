import DropDown from 'react-native-paper-dropdown';
import {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import Toast from 'react-native-toast-message';

import {SelectLocale} from '@components';
import {
	useGetDataParentQuery,
	useSaveNodeMutation,
} from '@services/api/apiSlice';
import {useAppSelector} from '@store/hooks';
import {Locales, ParentNode} from '@interfaces';

const CreateScreen = () => {
	const [showDropDown, setShowDropDown] = useState(false);
	const [parentSelected, setParentSelected] = useState('');
	const [listParents, setListParents] = useState<Locales[]>([]);

	const {value: localeSelected} = useAppSelector(state => state.locale);

	// api
	const {data: parents = []} = useGetDataParentQuery(null);
	const [saveNode, {isLoading: isLoadingSave}] = useSaveNodeMutation();

	useEffect(() => {
		const tmp = parents.map((parent: ParentNode) => ({
			label: parent.id.toString(),
			value: parent.id,
		}));

		setListParents(tmp as never);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [parents.length]);

	const handleSelection = (val: string) => setParentSelected(val);

	/**
	 * The handleSubmit function saves a node with the selected parent and locale, and displays a success
	 * message if the save is successful.
	 */
	const handleSubmit = async () => {
		try {
			await saveNode({
				parent: Number(parentSelected),
				locales: [localeSelected],
			}).unwrap();

			Toast.show({
				type: 'success',
				text1: 'Success!',
				text2: 'Saved successfully.',
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			{parents && (
				<View style={{margin: 15}}>
					<DropDown
						label="Parent"
						mode="outlined"
						visible={showDropDown}
						showDropDown={() => setShowDropDown(true)}
						onDismiss={() => setShowDropDown(false)}
						value={parentSelected}
						setValue={handleSelection}
						list={listParents as never}
					/>
				</View>
			)}
			<SelectLocale />

			<Button
				style={{margin: 15}}
				loading={isLoadingSave}
				disabled={
					isLoadingSave || parentSelected === '' || localeSelected === ''
				}
				icon="content-save"
				mode="contained"
				onPress={handleSubmit}>
				Submit
			</Button>
		</>
	);
};

export default CreateScreen;
