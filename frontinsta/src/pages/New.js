import React, { Component } from 'react';
import './New.css';
import api from '../services/api';

class New extends Component {

    state = {
        image:null,
        author: '',
        place:'',
        description:'',
        hashtags: ''
    }

    handleImageChange =  e =>{
        this.setState({image: e.target.files[0] });
    }

    handleSubmit = async e =>{
        e.preventDefault();
        const data = new FormData();

        data.append('image', this.state.image);
        data.append('author', this.state.author);
        data.append('place', this.state.place);
        data.append('description', this.state.description);
        data.append('hashtags', this.state.hashtags);
       
        await api.post('posts', data);

        this.props.history.push('/')
    }

    handleChange = e =>{
        this.setState({ [e.target.name]: e.target.value })
    }
    render(){
        return (
            <form id="new-post" onSubmit={this.handleSubmit}>
                <input type="file" onChange={this.handleImageChange}></input>
                <input name="author" onChange={this.handleChange} value={this.state.author} placeholder="Autor" type="text"></input>
                <input name="place" onChange={this.handleChange} value={this.state.place} placeholder="Local" type="text"></input>
                <input name="description" onChange={this.handleChange} value={this.state.description} placeholder="Descrição" type="text"></input>
                <input name="hashtags" onChange={this.handleChange} value={this.state.hashtags} placeholder="Hashtags" type="text"></input>
                <button type="submit">Enviar</button>
            </form>
        )
    }
}
export default New;