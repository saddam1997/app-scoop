import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { ListItem } from 'react-native-elements';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Details from './Details'

class App extends React.Component {


  static navigationOptions = {
    headerTitleStyle: { alignSelf: 'center', textAlign: "center", flex: 1 },
    title: 'All Books',
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
  componentDidMount() {
    this.getDataFromAPI();
  }
  getDataFromAPI = () => {
    const url = `https://www.googleapis.com/books/v1/volumes?filter=free-ebooks&q=a`;
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        //console.log("res.results  ", res.items[0])
        this.setState({
          data: res.items,
          error: res.error || null,
          loading: false,
        });
        this.arrayholder = res.items;
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };
  render() {
    return (
      <View style={{ backgroundColor: '#d7dbe2' }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              title={`${item.volumeInfo.title} `}
              onPress={() => this.props.navigation.navigate('Details', { details: item })}
            />
          )}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  App: {
    screen: App
  },
  Details: {
    screen: Details
  }
});

export default createAppContainer(AppNavigator);


