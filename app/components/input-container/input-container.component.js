import React from 'react';
import {Text, View, TextInput} from 'react-native';
import style from './input-container.style';

const InputContainer = props => {
  const {
    title,
    placeholderVal,
    keyboardTypeVal,
    autoCorrectVal,
    autoCapitalizeVal,
    onChangeTextFunction,
  } = props;
  const {
    formItemContainer,
    formTitleContainer,
    formTitleImportant,
    inputContainer,
    textInputStyle,
  } = style;
  return (
    <View style={formItemContainer}>
      <View style={formTitleContainer}>
        <Text style={formTitleImportant}>{title}</Text>
      </View>
      <View style={inputContainer}>
        <TextInput
          style={textInputStyle}
          placeholder={placeholderVal}
          keyboardType={keyboardTypeVal}
          autoCorrect={autoCorrectVal}
          autoCapitalize={autoCapitalizeVal}
          underlineColorAndroid="transparent"
          onChangeText={onChangeTextFunction}
        />
      </View>
    </View>
  );
};

export default InputContainer;
