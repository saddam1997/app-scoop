import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { ListItem } from 'react-native-elements';

export default class App extends React.Component {
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
    const url = `https://randomuser.me/api/?&results=20`;
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res.results,
          error: res.error || null,
          loading: false,
        });
        this.arrayholder = res.results;
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
      <View style={{ paddingTop: 20, backgroundColor: '#d7dbe2' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ width: '100%', fontSize: 28, textAlign: 'center' }} >Hello</Text>
        </View>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              leftAvatar={{ source: { uri: item.picture.thumbnail } }}
              title={`${item.name.first} ${item.name.last}`}
              subtitle={item.email}
            />
          )}
          keyExtractor={item => item.email}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}

