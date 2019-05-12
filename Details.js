import React from 'react';
import { View, Text, FlatList, ActivityIndicator, WebView } from 'react-native';
import { ListItem } from 'react-native-elements';

export default class Details extends React.Component {
  static navigationOptions = {
    headerTitleStyle: { alignSelf: 'center', textAlign: "center", flex: 1 },
    title: 'Details',
  }
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      error: null,
    };
    this.arrayholder = [];
  }

  render() {
    console.log("this.props.navigation.state.params  ", this.props.navigation.state.params);

    return (
      <View style={{ flex: 1 }}>
        <Text>{this.props.navigation.state.params.details.volumeInfo.title}</Text>
        <Text>{this.props.navigation.state.params.details.volumeInfo.subtitle}</Text>
        <Text>{this.props.navigation.state.params.details.volumeInfo.publishedDate}</Text>
      </View>

    );
  }
}

