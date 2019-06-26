import React, { Component } from 'react';
import { StyleSheet, View , ScrollView,  Modal, TouchableHighlight, Image} from 'react-native';
import { Button, SearchBar, PricingCard} from 'react-native-elements';
// import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { Container, Header, Content, List, ListItem, Text, Left, Right, Icon, Card, CardItem, Thumbnail,  Body, } from 'native-base';



console.disableYellowBox=true;
 
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      search:'',
      players : [],
      dataBackup : [],
      statsBuffon:[],
      // modalVisible: false,
    }
  }

  //Fetch on API
  
  componentDidMount() {
    var ctx = this;
    fetch('https://api.monpetitgazon.com/stats/championship/1/2018')
    .then(function(response){
      
      return response.json();
    }).then(function(data){
      // console.log("Players from API====>",data)
      ctx.setState({players: data});
      ctx.setState({dataBackup: data});
      
      // console.log("Etat=====>",ctx.state.palyers)
    }).catch(function(error){
      console.error(error);
    });

    var ctx = this;
    fetch('https://api.monpetitgazon.com/stats/player/4126?season=2018')
    .then(function(response){
      
      return response.json();
    }).then(function(data){
      // console.log("Stats from API====>",data)
      ctx.setState({statsBuffon: data});
      console.log("Stats BOUFFON=====>",ctx.state.statsBuffon)
    }).catch(function(error){
      console.error(error);
    });

    
  };

  
  //SearchBar
  setSearchText(event){
    console.log("=========> NativeEvent",event.nativeEvent.text)
        //Afficher le texte tapé
        searchText = event.nativeEvent.text;
        dataBackup       = this.state.dataBackup;
        // console.log("=====> dataBackup",dataBackup)
        // searchText = searchText.trim().toLowerCase();
        // console.log('=======>searchTex.trim', searchText.trim())
        tabfilter = dataBackup.filter(function(l) {
          //  console.log("L ==================>",l);
           var recherche = l.lastname + l.club
        return recherche.match( searchText );
       });
       this.setState({
        players : tabfilter
        });
  }

  

  


  
  render() {
    var playersList = this.state.players.map((player, i) => {
      return(<Player 
        playerName={player.firstname} 
        playerLastname={player.lastname} 
        playerPosition={player.position} 
        playerUltraPosition={player.ultraPosition} 
        playerTeamid={player.teamId} 
        playerCote={player.quotation} 
        playerClub={player.club} 
        playerRate={player.stats.avgRate} 
        playerGoals={player.stats.sumGoals} 
        playerChampionship={player.stats.currentChampionship} 
        playerTitu={player.stats.percentageStarter}/>
        // <View>
        // <ListItem >
        //       <Left>
        //         <Text>{player.firstname + ' ' + player.lastname} </Text>
                
        //       </Left>
        //       <Right>
        //       <TouchableHighlight
        //         onPress={() => {
        //           this.setModalVisible(true);
        //         }}>
        //         <Icon name="arrow-forward" />
        //       </TouchableHighlight>
        //       </Right>
              
        //     </ListItem>
        //     <Modal
        //     animationType="slide"
        //     transparent={false}
        //     visible={this.state.modalVisible}
        //     onRequestClose={() => {
        //       Alert.alert('Modal has been closed.');
        //     }}>
        //     <View style={{marginTop: 22}}>
        //       <View>
        //         <Text>{player[i].firstname}</Text>

        //         <TouchableHighlight
        //           onPress={() => {
        //             this.setModalVisible(!this.state.modalVisible);
        //           }}>
        //           <Text  >Hide Modal</Text>
        //         </TouchableHighlight>
        //       </View>
        //     </View>
        // </Modal>
        // </View>    
      )
    });

    var ctx = this;

    
    return (
      <Container>
        
        <SearchBar lightTheme={true} inputStyle={{backgroundColor:'white'}} containerStyle={{marginTop: 30, backgroundColor: 'transparent', borderColor:'red', borderStyle:'dotted'}}
                
                round
                onChange={this.setSearchText.bind(this)}
                placeholder='Type Here…' />
        <Content>
          <List>
            {playersList}
          </List>
          
        </Content>
      </Container>
    )
  }
}

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    }
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  render(){
    //Condition poste
    let poste = ""
    if (this.props.playerUltraPosition == 10) {
      poste = "Gardien";
    } else if (this.props.playerUltraPosition == 20)  {
      poste = "Defenseur";
    } else if (this.props.playerUltraPosition == 21)  {
      poste = "Lateral";
    } else if (this.props.playerUltraPosition == 31)  {
      poste = "Milieu défensif";
    } else if (this.props.playerUltraPosition == 32)  {
      poste = "Milieu offensif";
    } else if (this.props.playerUltraPosition == 40)  {
      poste = "Attaquant";
    }
    
    return(
      <ListItem >
        <Left>
          <Text>{this.props.playerName + ' ' + this.props.playerLastname} </Text>
          <Text style={{marginLeft:15,fontSize:12, color:'grey'}}>{this.props.playerClub}</Text>
          <Text style={{marginLeft:15,fontSize:12, color:'grey'}}>{poste}</Text>
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
          <View style={{marginTop: 50}}>
          <Card  style={{flex: 0, alignItems:"center"}}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'Image URL'}} />
                <Body>
                  <Text>{this.props.playerName + ' ' + this.props.playerLastname}</Text>
                  <Text>{poste}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image source={{uri: 'Image URL'}} style={{height: 200, width: 200, flex: 1}}/>
                <Text>Club : {this.props.playerClub}</Text>
                <Text>Note : {this.props.playerRate}</Text>
                <Text>Goals : {this.props.playerGoals}</Text>
                <Text>Titulaire : {this.props.playerTitu}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
              <Button style={{marginTop: 50}}
                 onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
                 title="OK"
                 style={{width:100}}
                 backgroundColor='#007D8F'
                 color='#FFFFFF'
                 />
              </Left>
            </CardItem>
          </Card>
          </View>
        </Modal>      
      </ListItem>
    )
  }
}

// onPress={() => {
//   this.setModalVisible(!this.state.modalVisible);
// }}>

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


{/* <View style={{alignItems:"center"}}>
              <Text>{this.props.playerName + ' ' + this.props.playerLastname}</Text>
              <Text>{poste}</Text>
              <Text>{this.props.playerClub}</Text>

              <Button style={{marginTop: 50}}
                 onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
                 title="OK"
                 style={{width:100}}
                 backgroundColor='#007D8F'
                 color='#FFFFFF'
                 />
            </View> */}



