import { StyleSheet, Dimensions } from 'react-native'

var {width} = Dimensions.get('window');


export default StyleSheet.create({
    item: {
        borderWidth: 1,
        margin: 5,
        padding: 3,
        flexDirection: 'row'
    },
    itemText:{
      flexWrap: 'wrap',
      flex: 1
    },
    itemImage: {
      width: 50,
      height: 50,
      marginRight: 10
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
  