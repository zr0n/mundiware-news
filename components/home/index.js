/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Modal,
  Button,
  ScrollView,
  Image,
} from 'react-native';

import axios from 'axios'
import xml2js from 'react-native-xml2js'
import styles from './styles'


class Home extends React.Component{

    news = []
    constructor(props){
        super(props)
        this.state = {
            news: [],
            modalVisible: false,
            itemChosen: {title: '', description: '', image: ''}
        }

        this.showModal = this.showModal.bind(this)
        this.hideModal = this.hideModal.bind(this)
    }
    componentDidMount(){
        this.fetchNews()
        //setInterval(this.fetchNews.bind(this), 5000)
    }
    fetchNews(){
        axios.get('https://m.diarioonline.com.br/rss')
        .then((response) => {
            const parser = new xml2js.Parser()
            parser.parseString(response.data, (err, result) => {
                if(!err){
                    const news = result.rss.channel[0].item
                    let newsParsed = []
                    news.forEach(element => {
                        let image = "https://via.placeholder.com/100x100"
                        if(element.enclosure)
                            image = element.enclosure[0].$.url 
                        newsParsed.push({
                            title: element.title[0],
                            image: image,
                            description: element.description[0]
                        })
                        
                    });
                    this.setState({ news: newsParsed })
                }
                else{
                    console.error("Error parsing xml")
                    console.log(err)
                }
                    
            })

        })
        .catch(err => {
            console.log("Error making the request")
            //console.error(err)
        })
    }
    showModal(item){
        this.setState({
            modalVisible: true,
            itemChosen: item
        })
    }
    hideModal(){
        this.setState({ modalVisible: false })
    }
    render(){
        return (
        <View>
            <Modal
                visible = {this.state.modalVisible}
            >
                <Button
                    title = "Voltar"
                    onPress= {this.hideModal}
                >
                </Button>
                <ScrollView style = {styles.description}>
                    <Image
                        style = {styles.image}
                        source={{uri: this.state.itemChosen.image}}
                    >
                    </Image>
                    <Text>
                        {this.state.itemChosen.description}
                    </Text>
                </ScrollView>
                
            </Modal>
            <FlatList
                data = {this.state.news}
                keyExtractor={item => item.title}
                style= {styles.container}
                renderItem = {({item}) => (
                    <TouchableOpacity
                        style = {styles.item}
                        onPress = {() => this.showModal(item)}
                        >
                        <Image
                            style = {styles.itemImage}
                            source = {{uri: item.image}}>

                        </Image>
                        <Text style = {styles.itemText}>{item.title}</Text>
                    </TouchableOpacity>
                )}
            >

            </FlatList>
        </View>
        );
    }
}

export default Home;
