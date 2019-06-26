import React from 'react';
import {
 View,
 ImageBackground,
 ScrollView,
 StyleSheet,
 Modal,
 TouchableHighlight,
 Alert,
 Image
} from 'react-native';
import {Avatar, Text, Button, Divider, FormLabel, FormInput} from 'react-native-elements'

import {AsyncStorage} from 'react-native';

export default class HomeScreen extends React.Component {

  constructor(){
    super()
    this.setModalVisible = this.setModalVisible.bind(this)
    this.setModalInvisible = this.setModalInvisible.bind(this)
    this.state = {
      modalVisible: false,
      addPlaylist: '',
      text:''
    }
  }

  setModalVisible() {
   this.setState({modalVisible: true});
 }

  setModalInvisible() {
   this.setState({modalVisible: false});
 }

 async setSearchText(event){
  //Afficher le texte tapé
  searchText = event.nativeEvent.text;
  //console.log("================> text",event.nativeEvent.text)
  await this.setState({addPlaylist: searchText})
  console.log('nouvelle liste',this.state.addPlaylist)
  }

  handleClickOk = () => {
    console.log("valeur rrrrrrrrrrrrrrrrrr =========>", );
    console.log("nouveletat form handleclickok",this.state.addPlaylist);
    this.props.handleClickAdd(this.state.addPlaylist)
    
  }

  savePlaylistStore = async () => {
    AsyncStorage.setItem("playlistNameLocal", JSON.stringify(this.state.addPlaylist) )


      // await AsyncStorage.setItem('playlistNameStore', this.state.addPlaylist);
      // var tab = {}
      // const data = await AsyncStorage.getItem('playlistNameStore');
      // tab.push(data)
      // console.log('THIS IS MY TAB',tab)
      // const data = await AsyncStorage.getItem('playlistNameStore');
      // console.log("data dans le Asyncstorage", data);
      
      
    
  };

  // displayData = async () =>{
  //   try{
  //     let data = await AsyncStorage.getItem('playlistNameStore');
  //     alert (playlistNameStore);
  //   }
  //   catch{(error)
  //     alert(error);
  //   }
  // }

 render() {

   return (

     <View style={{alignItems: 'center'}}>
         <Divider style={{height:100}}/>
            <Button 
                title="+ Add Playlist"
                style={{width:300}}
                fontWeight= 'bold'
                fontSize={20}
                rounded
                large
                backgroundColor='#007D8F'
                onPress={this.setModalVisible}                >
            </Button>

        <View>
          <Modal
            animationType="fade"
            transparent={false}
            visible={this.state.modalVisible}>
              <View
               style={{flex: 1, alignItems: 'center', marginTop: 200}}>
             <Text style={styles.title}>Add a playlist</Text>

            <FormInput placeHolder='Enter your playlist name'
            onChange={this.setSearchText.bind(this)}
             onChangeText={(e) => this.setState({addPlaylist: e})}/>

            <Divider style={{height:40}}/>

            <View style={{flex: 1, flexDirection: 'row'}}>
               <Button
                 title="Cancel"
                 style={{width:100}}
                 backgroundColor='#929292'
                 color='#FFFFFF'
                 onPress={this.setModalInvisible}/>

                <Button
                 onPress={() => { this.handleClickOk(), this.savePlaylistStore(), this.setModalInvisible(); }}
                 title="OK"
                 style={{width:100}}
                 backgroundColor='#007D8F'
                 color='#FFFFFF'
                 />
                 {/* <Button
                 onPress={() => { this.displayData();}}
                 title="show"
                 style={{width:70}}
                 backgroundColor='#007D8F'
                 color='#FFFFFF'
                 /> */}
            </View>

              </View>
          </Modal>

        </View>
      </View>

  );
 }

}

const styles = StyleSheet.create({
 subtitle:{
   flexDirection:'column',
   padding:10,
   paddingTop:5,
 },
 ratingText:{
   color: 'grey',
 },
 picNumber:{
   paddingLeft: 10,
   fontWeight: 'bold',
   fontSize: 18
 },
 title: {
   fontSize: 25,
   fontWeight: 'bold',
   margin: 15,
 },
 descDisplay: {
   flexDirection: 'row',
 },
});








// onPress={this.handleClickOk}