import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../services/api';
import io from 'socket.io-client';
class Feed extends React.Component {

  state = {
    feed: []
  }
  async componentDidMount() {
    this.registerToSocket();

    const response = await api.get('posts');

    this.setState({ feed: response.data })

  }

  registerToSocket = () => {
    const socket = io('http://192.168.15.16:3333');

    socket.on('post', newPost =>{
        this.setState({feed: [newPost, ...this.state.feed]})
    })

    socket.on('like', likePost =>{
        this.setState({feed: this.state.feed.map(post=>
            post._id === likePost._id ? likePost : post
        )})
    })
}
async handleLike(id){
  await api.post(`posts/${id}/like`);
}


  render() {
    return (
      <View style={styles.container}>
        <FlatList data={this.state.feed} keyExtractor={post => post._id} renderItem={({ item }) => (
          <View style={styles.feedItem}>
            <View style={styles.feedItemHeader}>
              <View style={styles.userInfo}>
                <Text style={styles.name}>{item.author}</Text>
                <Text style={styles.place}>{item.place}</Text>
              </View>
              <Icon name="ellipsis-h" size={20} />
            </View>
            <Image style={styles.feedImage} source={{ uri: `http://192.168.15.16:3333/files/${item.image}` }}></Image>
            <View style={styles.feedItemFooter}>
              <View style={styles.actions}>
                <TouchableOpacity style={styles.action} onPress={() => this.handleLike(item._id)}>
                  <Icon name="heart-o" size={20} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.action} onPress={() => { }}>
                  <Icon name="comment-o" size={20} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.action} onPress={() => { }}>
                  <Icon name="send-o" size={20} />
                </TouchableOpacity>
              </View>
                <Text style={styles.likes}>{item.likes} curtidas</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.hashtags}>{item.hashtags}</Text>
            </View>
          </View>
        )}>

        </FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  feedItem: {
    marginTop: 20,
  },
  feedItemHeader: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 14,
    color: '#000',
  },
  place: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  feedImage: {
    width: '100%',
    height: 400,
    marginVertical: 15,
  },
  feedItemFooter: {
    paddingHorizontal: 15,
  },
  actions: {
    flexDirection: 'row',
  },
  action: {
    marginRight: 8,
  },
  likes: {
    marginTop: 15,
    fontWeight: 'bold',
  },
  description: {
    lineHeight: 18,
    color: '#000',
  },
  hashtags: {
    color: '#7159c1',
  }
});
export default Feed;