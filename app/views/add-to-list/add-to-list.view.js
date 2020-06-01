import React, {Component} from 'react';
import {Container, Content, Footer} from 'native-base';
import {Alert} from 'react-native';
import HeaderComponent from '../../components/header/header.component';
import InputContainer from '../../components/input-container/input-container.component';
import ProcessButton from '../../components/process-button/process-button-component';
import PickerContainer from '../../components/picker-container/picker-container.component';
import SQLiteDatabase from '../../database/sqlite-database';
import constants from '../../extras/constants';
import LoadingIndicatorComponent from '../../components/loading-indicator/loading-indicator.component';

//instantiate
const db = new SQLiteDatabase();
export default class AddToList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      mobile: '',
      country: '0',
      mobile_brand: '0',
      isLoading: false,
    };
  }

  addUser() {
    this.setState({
      isLoading: true,
    });
    let data = {
      name: this.state.name,
      country: this.state.country,
      mobile_number: this.state.mobile,
      fav_mobile_brand: this.state.mobile_brand,
    };
    db.addUser(data)
      .then(result => {
        console.log(result);
        this.setState({
          isLoading: false,
          name: '',
          mobile: '',
          country: '0',
          mobile_brand: '0',
        });

        Alert.alert('Success', 'The user details has been added');
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isLoading: false,
        });
      });
  }

  onNameChange = val => {
    this.setState({name: val});
  };
  onMobileChange = val => {
    this.setState({mobile: val});
  };

  onCountryChange = value => {
    this.setState({country: value});
  };

  onMobileBrandChange = value => {
    this.setState({mobile_brand: value});
  };

  _openDrawer = () => {
    this.props.navigation.openDrawer();
  };

  validate = () => {
    const {name, mobile, country, mobile_brand} = this.state;
    if (name.length < 6) {
      Alert.alert('Invalid name', 'Name must be ATLEAST FIVE CHARACTERS');
    } else if (country == '' || country == 0) {
      Alert.alert('Invalid Country', 'Please Select Country');
    } else if (mobile.length != 10) {
      Alert.alert('Invalid phone no.', 'Mobile Number must be TEN CHARACTERS');
    } else if (mobile_brand == '' || mobile_brand == 0) {
      Alert.alert(
        'Invalid Mobile Brand',
        'Please Select Favourite Mobile Brand',
      );
    } else {
      this.addUser();
    }
  };

  render() {
    return (
      <Container>
        <HeaderComponent title="Add User" onIconPress={this._openDrawer} />
        <Content padder>
          {this.state.isLoading && (
            <LoadingIndicatorComponent loading={this.state.isLoading} />
          )}
          <InputContainer
            title="Name"
            placeholderVal="Saksham Dangol"
            keyboardTypeVal="default"
            autoCorrectVal="false"
            autoCapitalizeVal="words"
            onChangeTextFunction={this.onNameChange}
          />
          <PickerContainer
            title="Country"
            placeholderVal="Nepal"
            onValueChangeFunction={this.onCountryChange}
            selectedVal={this.state.country}
            pickerData={constants.COUNTRY_ARRAY}
          />
          <PickerContainer
            title="Mobile Brand"
            placeholderVal="Samsung"
            onValueChangeFunction={this.onMobileBrandChange}
            selectedVal={this.state.mobile_brand}
            pickerData={constants.MOBILE_BRAND_ARRAY}
          />
          <InputContainer
            title="Mobile Number"
            placeholderVal="9860163878"
            keyboardTypeVal="phone-pad"
            autoCorrectVal="false"
            autoCapitalizeVal="words"
            onChangeTextFunction={this.onMobileChange}
          />
        </Content>
        <Footer>
          <ProcessButton buttonText="SAVE" buttonOnPress={this.validate} />
        </Footer>
      </Container>
    );
  }
}
