import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Picker, Icon} from 'native-base';
import style from './picker-container.style';

const PickerContainer = props => {
  const {
    formItemContainer,
    formTitleContainer,
    formTitleImportant,
    pickerContainer,
  } = style;
  const {
    title,
    placeholderVal,
    onValueChangeFunction,
    selectedVal,
    pickerData,
  } = props;
  return (
    <View style={formItemContainer}>
      <View style={formTitleContainer}>
        <Text style={formTitleImportant}>{title}</Text>
      </View>
      <View style={pickerContainer}>
        <Picker
          mode="dropdown"
          iosIcon={<Icon name="arrow-down" />}
          placeholder={placeholderVal}
          placeholderStyle={{color: '#bfc6ea'}}
          placeholderIconColor="#007aff"
          selectedValue={selectedVal}
          onValueChange={onValueChangeFunction}>
          <Picker.Item
            key={'unselectable'}
            label={'--SELECT VALUE--'}
            value="0"
          />
          {pickerData.map((item, index) => {
            return <Picker.Item label={item} value={item} key={index} />;
          })}
        </Picker>
      </View>
    </View>
  );
};

export default PickerContainer;
