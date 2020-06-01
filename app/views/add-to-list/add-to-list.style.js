import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  formItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginBottom: 17,
  },
  formTitleContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    width: '90%',
  },
  formTitle: {
    fontSize: 15,
    paddingBottom: 5,
    fontFamily: 'ProductSans-Regular',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DCDCDC',
    borderRadius: 10,
    borderWidth: 1,
    width: '90%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default style;
