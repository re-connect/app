import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { Picker as RNPicker } from '@react-native-picker/picker';
import { ActionSheetIOS, Platform, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { colors } from '../../style';

export type PickerItem = {
  id: number | string;
  title: string;
};

type PickerData = PickerItem[];

export const Picker: React.FC<{
  selectedValue: any;
  onValueChange: Dispatch<SetStateAction<any>>;
  data: PickerData;
  firstLabel: string;
  firstValue: string;
  wrapperStyle?: ViewStyle;
  error?: string;
}> = ({ selectedValue, onValueChange, data, firstLabel, firstValue, wrapperStyle, error }) => {
  const [arrayOptionsActionSheet, setArrayOptionsActionSheet] = React.useState<string[]>([]);
  const selectedItem = data.find(item => item.id === selectedValue);
  const [labelSelectedValueIOS, setLabelSelectedValueIOS] = React.useState(
    selectedItem?.title ? selectedItem?.title : firstLabel ? firstLabel : '',
  );
  const showActionSheetIOS = () => {
    return ActionSheetIOS.showActionSheetWithOptions(
      {
        options: arrayOptionsActionSheet,
        cancelButtonIndex: 0,
        tintColor: colors.darkGray,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          onValueChange(firstValue);
        } else {
          onValueChange(data[buttonIndex - 1].id);
          setLabelSelectedValueIOS(data[buttonIndex - 1].title);
        }
      },
    );
  };

  useEffect(() => {
    const arrayOptions = [firstLabel];
    if (data.length > 0) {
      data.map(item => {
        arrayOptions.push(item.title);
      });
      setArrayOptionsActionSheet(arrayOptions);
    }
  }, [data, firstLabel]);

  return (
    <View style={[styles.wrapperPicker, wrapperStyle]}>
      <View style={[styles.innerWrapperPicker, error ? { borderWidth: 1, borderColor: colors.red } : {}]}>
        {Platform.OS === 'android' ? (
          <RNPicker selectedValue={selectedValue} onValueChange={onValueChange}>
            <RNPicker.Item label={firstLabel} value={firstValue} />
            {data.map((channel, index) => {
              return <RNPicker.Item key={index} label={channel.title} value={channel.id} />;
            })}
          </RNPicker>
        ) : (
          <TouchableOpacity style={styles.wrapperPickerItemIOS} onPress={showActionSheetIOS}>
            <Text style={styles.textItemIOS}>{selectedValue === firstValue ? firstLabel : labelSelectedValueIOS}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapperPicker: {
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
    alignSelf: 'center',
    marginBottom: 15,
  },
  innerWrapperPicker: {
    borderRadius: 5,
    backgroundColor: colors.white,
  },
  wrapperPickerItemIOS: {
    height: 42,
    padding: 10,
  },
  textItemIOS: {
    fontSize: 16,
    maxWidth: '90%',
  },
  arrowDownIOS: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});
