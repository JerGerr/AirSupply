import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, Text, FlatList, TextInput, Alert, SafeAreaView, TouchableOpacity, TouchableHighlight, ImageBackground } from 'react-native';
import { Header, ListItem, Avatar, Icon, Image } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('datadb.db');
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Itim_400Regular } from '@expo-google-fonts/itim';
import LottieView from "lottie-react-native";
import Draggable from 'react-native-draggable';

export default function Bookmark({ route, navigation }) {
  const { country, state, city } = route.params || {};
  const [places, setPlaces] = React.useState([]);
  const [isAnswered, setIsAnswered] = useState(false);
  let [fontsLoaded] = useFonts({ Itim_400Regular });
  const [msg, setMsg] = useState('');
  const [showCity, setShowCity] = useState('');

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists places (id integer primary key not null, country text, state text, city text);');
    });
    updateList();
  }, []);

  const handleCheck = (city) => {
    let results = places.map((place) => place.city)
    if (results.includes(city)) {
      return true
    } else {
      return false
    }
  }

  const addList = ({ country, state, city }) => {
    if (handleCheck(city) === true) {
      console.log('already in list')
      setIsAnswered(!isAnswered)
      setMsg('Already in list.')
      setTimeout(() => {
        setMsg(null)
      }, 5000)
    } else {
      db.transaction(tx => {
        tx.executeSql('insert into places (country, state, city) values (?,?,?);',
          [country, state, city]);
      }, null, updateList
      )
      setIsAnswered(!isAnswered)
    }
  };

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from places order by id DESC;', [], (_, { rows }) =>
        setPlaces(rows._array)
      );
    });
  };

  const handleSorting = () => {
    db.transaction(tx => {
      tx.executeSql('select * from places order by country DESC;', [], (_, { rows }) =>
        setPlaces(rows._array)
      );
    });
  };

  const clear = (id) => {
    Alert.alert(
      'What?',
      'Are you really really sure?',
      [
        {
          text: 'Yes',
          onPress: () =>
            db.transaction(tx => {
              tx.executeSql('delete from places where id = ?;', [id]);
            }, null, updateList)
        },
        {
          text: 'No',
          onPress: () => console.log('No Pressed')
        },
      ],
      { cancelable: false },
    );
  };

  //Pass params to show city details
  // const handleShowDetails = (id) => {
  //   db.transaction(tx => {
  //     tx.executeSql('select * from places where id = ?;', [id], (_, { rows }) =>
  //       setShowCity(rows._array),
  //       console.log(showCity),
  //       navigation.navigate('City Details', { showCity: showCity })
  //     )
  //   });
  // };

  const renderItem = ({ item, index }) => (
    <View>
      {index % 2 === 0 ?
        <ListItem bottomDivider containerStyle={styles.boxes} >
          <ListItem.Content style={styles.content}>
            <Text>{item.country}</Text>
            <TouchableOpacity style={styles.buttonStyle} onPress={() => clear(item.id)}>
              <Image style={{ width: 20, height: 18, marginLeft: 224 }} source={require('../images/redcrs.png')} />
            </TouchableOpacity>
            <ListItem.Title style={styles.title} >
              <Text>{item.city}</Text>
            </ListItem.Title>
            {/* <TouchableOpacity onPress={() => handleShowDetails(item.id)}> */}
            <Image style={{ width: 20, height: 20, marginLeft: 224 }} source={require('../images/show.png')} />
            {/* </TouchableOpacity> */}
            {/* <ListItem.Subtitle style={styles.subtitle} >
          insert AQI
          </ListItem.Subtitle> */}
          </ListItem.Content>
        </ListItem>
        :
        <ListItem bottomDivider containerStyle={styles.boxes1} >
          <ListItem.Content style={styles.content}>
            <Text>{item.country}</Text>
            <TouchableOpacity style={styles.buttonStyle} onPress={() => clear(item.id)}>
              <Image style={{ width: 20, height: 18, marginLeft: 224 }} source={require('../images/redcrs.png')} />
            </TouchableOpacity>
            <ListItem.Title style={styles.title} >
              <Text>{item.city}</Text>
            </ListItem.Title>
            {/* <TouchableOpacity onPress={() => handleShowDetails(item.id)}> */}
            <Image style={{ width: 20, height: 20, marginLeft: 224 }} source={require('../images/show.png')} />
            {/* </TouchableOpacity> */}
            {/* <ListItem.Subtitle style={styles.subtitle} >
          insert AQI
        </ListItem.Subtitle> */}
          </ListItem.Content>
        </ListItem>}
    </View>
  );


  const showDetails = () => {
    return (
      <FlatList
        style={styles.listContainer}
        keyExtractor={item => item.id.toString()}
        data={places}
        renderItem={renderItem} />
    )
  }

  const showQuestion = () => {
    return (
      <View>
        <TouchableOpacity onPress={() => addList({ country, state, city })} style={{ borderRadius: 20, borderWidth: 2, borderColor: 'green', elevation: 3, width: 280, marginTop: 30, height: 60, backgroundColor: 'seagreen' }}>
          <Text style={{ fontFamily: 'Itim_400Regular', marginTop: 15, color: 'white', textAlign: 'center' }}>Add {city} {country} </Text>
        </TouchableOpacity>
      </View>
    )
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground
          source={require('../images/sky1.png')}
          style={styles.backgroundImage}>
          <View style={styles.container}>
            <Text>{msg}</Text>
            {isAnswered === true ?
              <View>
                <LottieView style={{ marginLeft: -110, marginBottom: 10 }} source={require('../assets/Lottie/env.json')} autoPlay loop />
                <Text style={styles.descTitle}>Saved Places</Text>
              </View>
              :
              showQuestion()
            }
            {route.params === {} ?
              null
              :
              showDetails()
            }
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Itim_400Regular',
    padding: 60
  },
  content: {
    padding: 10,
    zIndex: -1,
    fontFamily: 'Itim_400Regular',
  },
  listContainer: {
    padding: 10,
    marginTop: 30,
    width: '100%',
  },
  backgroundImage: {
    flex: 1,
    width: 420,
  },
  title: {
    color: 'seagreen',
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 20,
    textTransform: 'uppercase',
    fontSize: 20,
    fontFamily: 'Itim_400Regular',
  },
  subtitle: {
    color: 'black',
    marginTop: 15,
    marginLeft: 200,
    fontFamily: 'Itim_400Regular',
  },
  boxes: {
    backgroundColor: '#80CEE1',
    borderRadius: 30,
    padding: 2,
    elevation: 2,
    marginBottom: 20,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  boxes1: {
    backgroundColor: 'skyblue',
    borderRadius: 30,
    padding: 2,
    elevation: 2,
    marginBottom: 20,
  },
  descTitle: {
    fontSize: 22,
    fontFamily: 'Itim_400Regular',
    color: 'black',
    marginLeft: 10,
    marginTop: 10,
    padding: 10
  },
});