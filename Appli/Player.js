import React, { Component } from 'react';
import { StyleSheet, View , ScrollView,  Modal, TouchableHighlight,} from 'react-native';
import { Button} from 'react-native-elements';
// import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { Container, Header, Content, List, ListItem, Text, Left, Right, Icon } from 'native-base';


console.disableYellowBox=true;
 
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      
      players : [],
      modalVisible: false,
    }
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  componentDidMount() {
    var ctx = this;
    fetch('https://api.monpetitgazon.com/stats/championship/1/2018')
    .then(function(response){
      
      return response.json();
    }).then(function(data){
      // console.log("Stats from API====>",data)
      ctx.setState({players: data});
      // console.log("Etat=====>",ctx.state.palyers)
    }).catch(function(error){
      console.error(error);
    });

    
  };


  
  render() {
    var playersList = this.state.players.map((player, i) => {
      return(
        <ListItem >
              <Left>
                <Text>{player.firstname + ' ' + player.lastname} </Text>
                
              </Left>
              <Right>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(true);
                }}>
                <Icon name="arrow-forward" />
              </TouchableHighlight>
              </Right>
              <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                }}>
                <View style={{marginTop: 22}}>
                  <View>
                    <Text>{player.firstname}</Text>

                    <TouchableHighlight
                      onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                      }}>
                      <Text  >Hide Modal</Text>
                    </TouchableHighlight>
                  </View>
                </View>
            </Modal>
            </ListItem>
            
      )
    });

    var ctx = this;

    
    return (
      <Container>
        <Header />
        <Content>
          <List>
            {playersList}
          </List>
          {/* <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                }}>
                <View style={{marginTop: 22}}>
                  <View>
                    <Text>{ctx.props.players[0].firstname}</Text>

                    <TouchableHighlight
                      onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                      }}>
                      <Text  >Hide Modal</Text>
                    </TouchableHighlight>
                  </View>
                </View>
            </Modal> */}
        </Content>
      </Container>
    )
  }
}

// styles = StyleSheet.create({
//   subtitleView: {
//     flexDirection: 'row',
//     paddingLeft: 10,
//     paddingTop: 5
//   },
//   ratingImage: {
//     height: 19.21,
//     width: 100
//   },
//   ratingText: {
//     paddingLeft: 10,
//     color: 'grey'
//   }
// })






// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 5, paddingTop: 30, backgroundColor: '#fff' },
//   head: {  height: 40,  backgroundColor: '#f1f8ff', borderRadius: 4, borderWidth: 0.5, },

//   wrapper: { flexDirection: 'row' },
//   title: { flex: 1, backgroundColor: '#f6f8fa' },
//   row: {  height: 28  },
//   text: { borderColor:'red', color:'red'}
// });

