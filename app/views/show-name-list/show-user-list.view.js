import React, {Component} from 'react';
import {
  Text,
  FlatList,
  View,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import {Card, CardItem} from 'native-base';
import {Container, Content} from 'native-base';
import HeaderComponent from '../../components/header/header.component';
import UserlistComponent from '../../components/user-list-item/user-list-item.component';
import SQLiteDatabase from '../../database/sqlite-database';
import PickerContainer from '../../components/picker-container/picker-container.component';
import styles from './show-user-list.style';
import constants from '../../extras/constants';
import LoadingIndicatorComponent from '../../components/loading-indicator/loading-indicator.component';

//instantiate
const db = new SQLiteDatabase();
export default class ShowUserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_list: '',
      modalVisibility: false,
      country: '',
      mobile_brand: '',
      isLoading: true,
    };
  }

  componentWillMount() {
    this.getUserList();
  }

  setModalVisible = visible => {
    this.setState({modalVisibility: visible});
  };

  onCountryChange = value => {
    this.setState({country: value});
  };

  onMobileBrandChange = value => {
    this.setState({mobile_brand: value});
  };

  getFilteredUsersList = () => {
    this.setState({user_list: [], modalVisibility: false, isLoading: true});
    const {mobile_brand, country} = this.state;

    db.getFilteredUsers(country, mobile_brand)
      .then(data => {
        this.setState({
          isLoading: false,
          user_list: data,
        });
      })
      .catch(err => {
        console.log(err);
        this.setState = {
          isLoading: false,
        };
      });
  };

  getUserList() {
    this.setState({user_list: []});
    db.getUsers()
      .then(data => {
        this.setState({
          user_list: data,
          isLoading: false,
        });
      })
      .catch(err => {
        console.log(err);
        this.setState = {
          isLoading: false,
        };
      });
  }
  _openDrawer = () => {
    this.props.navigation.openDrawer();
  };

  deleteUserById = id => {
    this.setState({
      isLoading: true,
    });
    db.deleteUser(id)
      .then(result => {
        this.getUserList();
        console.log(result);
        this.setState({isLoading: false});
        Alert.alert('Alert', 'User Deleted');
      })
      .catch(err => {
        console.log(err);
        this.setState = {
          isLoading: false,
        };
      });
  };
  onPressShowOptions = id => {
    Alert.alert(
      'Delete User',
      'Are you sure you want to delete this user?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => this.deleteUserById(id)},
      ],
      {cancelable: false},
    );
  };
  showFilterAlert = () => {
    this.setState({modalVisibility: true});
  };

  render() {
    const {modalView, openButton, textStyle, centeredView} = styles;
    return (
      <Container>
        <HeaderComponent
          title="User List"
          onIconPress={this._openDrawer}
          rightIconOnPress={this.showFilterAlert}
          rightIconName="filter"
        />
        <Content>
          {this.state.isLoading && (
            <LoadingIndicatorComponent loading={this.state.isLoading} />
          )}
          <FlatList
            data={this.state.user_list}
            renderItem={({item}) => (
              <Card>
                <CardItem>
                  <TouchableOpacity
                    onPress={() => this.onPressShowOptions(item.id)}>
                    <View>
                      <UserlistComponent title="Name" value={item.name} />
                      <UserlistComponent title="Country" value={item.country} />
                      <UserlistComponent
                        title="Mobile"
                        value={item.mobile_number}
                      />
                      <UserlistComponent
                        title="Mobile Brand"
                        value={item.fav_mobile_brand}
                      />
                    </View>
                  </TouchableOpacity>
                </CardItem>
              </Card>
            )}
            keyExtractor={item => item.id}
          />
        </Content>
        {this.state.modalVisibility && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={centeredView}>
              <View style={modalView}>
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
                <TouchableOpacity
                  style={{openButton, backgroundColor: '#2196F3'}}
                  onPress={this.getFilteredUsersList}>
                  <Text style={textStyle}>Search</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{openButton, backgroundColor: '#2196F3'}}
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisibility);
                  }}>
                  <Text style={textStyle}>Hide Modal</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </Container>
    );
  }
}
