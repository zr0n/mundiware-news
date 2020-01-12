/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Modal,
  Button,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';

import axios from 'axios'
import xml2js from 'react-native-xml2js'


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
        setInterval(this.fetchNews.bind(this), 5000)
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
                        newsParsed.push({
                            title: element.title[0],
                            image: element.enclosure[0].$.url,
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
                        <Text>{item.title}</Text>
                    </TouchableOpacity>
                )}
            >

            </FlatList>
        </View>
        );
    }
}
var {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  item: {
      borderWidth: 1,
      margin: 5,
      padding: 3
  },
  description: {
      padding: 10
  },
  image: {
      width: width * .9,
      height: 300
  },
  container: {
      marginBottom: 20
  }
});

export default Home;
