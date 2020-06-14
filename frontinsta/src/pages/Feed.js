import React, { Component } from 'react';
import './Feed.css';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';
import send from '../assets/send.svg';

import more from '../assets/more.svg';


import io from 'socket.io-client';

import api from '../services/api';

class Feed extends Component {

    state = {
        feed: []
    }
    async componentDidMount(){
        this.registerToSocket();
        const response = await api.get('posts');
        this.setState({ feed: response.data })

    }

    async handleLike(id){
        await api.post(`posts/${id}/like`);
    }

    registerToSocket = () => {
        const socket = io('http://localhost:3333');

        socket.on('post', newPost =>{
            this.setState({feed: [newPost, ...this.state.feed]})
        })

        socket.on('like', likePost =>{
            this.setState({feed: this.state.feed.map(post=>
                post._id === likePost._id ? likePost : post
            )})
        })
    }

    render(){
        return (
            <section id="post-list">
                {this.state.feed.map(post=>(
                    <article key={post._id}>
                    <header>
                        <div className="user-info">
                            <span>{post.author}</span>
                            <span className="place">{post.place}</span>
                        </div>
                        <img src={more} alt="Mais" width="15"></img>
                    </header>
                    <img src={`http://localhost:3333/files/${post.image}`} alt=""></img>
                    <footer>
                        <div className="actions">
                            <button type="button" onClick={() => this.handleLike(post._id)}>
                                <img width="25" src={like} alt="like"></img>
                            </button>
                            <img width="25" src={comment} alt="comment"></img>
                            <img width="25" src={send} alt="send"></img>
                        </div>
                        <strong>{post.likes} curtidas</strong>
                        <p>{post.description}<span>{post.hashtags}</span></p>
                    </footer>
                </article>
                ))}
            </section>
        )
    }
}
export default Feed;