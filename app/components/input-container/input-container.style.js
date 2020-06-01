import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  formItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
    marginTop: 10,
  },
  formTitleContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    width: '100%',
  },
  formTitle: {
    fontSize: 16,
    paddingBottom: 5,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DCDCDC',
    borderRadius: 30,
    borderWidth: 1,
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingLeft: 5,
  },
});
export default style;
