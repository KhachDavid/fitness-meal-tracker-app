import React, { useState } from 'react';
import { TextInput, View, Text, Platform, StyleSheet } from 'react-native';

const isAndroid = Platform.os === 'android';
const editableTextInputColor = '#494949';
const disabledTextInputColor = '#BBB';
const focusedInputColor = '#0D12B9'
const minimumTouchableSize = 48;
const AccessibleTextInput = ({
  label = 'Email',
  inputValue = '', 
  placeholderText = 'example@domain.com',
  accessibilityLabel = 'Enter email',
}) => {
  const [value, setValue] = useState(inputValue)
  const [editable, setEditable] = useState(true)
  const [isFocused, setFocus] = useState(false)

  function changeText(text, props) {
    props.onChangeText(text)
    setValue(text)
  }

  const textInputColor = editable ? editableTextInputColor : disabledTextInputColor;
  const styles = StyleSheet.create({
    label: { color: isFocused ? focusedInputColor : textInputColor },
    input: {
      backgroundColor: '#FFF',
      padding: 8,
      height: minimumTouchableSize,
      width: "100%",
      borderColor: isFocused ? focusedInputColor : textInputColor,
      borderWidth: isFocused ? 2 : 1,
      borderRadius: 4,
      marginTop: 8 
    }
});
  const accessibilityState = { disabled: !editable }
  return (
    <View   
      accessible
      accessibilityLabel={
           isAndroid
           ? accessibilityLabel
           : `${accessibilityLabel}${!editable ? ': Disabled!' : ''}`
      }
      accessibilityState={accessibilityState}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
         placeholder={placeholderText}
         placeholderTextColor={textInputColor}
         value={value}
         onChangeText={
             (text) => changeText(text, props)
         }
         editable={editable}
         onFocus={() => setFocus(true)}
         onBlur={() => setFocus(false)}
      />
    </View>
  )
};
export default AccessibleTextInput;