import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, ScrollView, Text, View, Button, TextInput, FlatList, SafeAreaView, ImageBackground, TouchableOpacity } from 'react-native';
import SearchCountry from './SearchCountry';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Itim_400Regular } from '@expo-google-fonts/itim';
import ProgressBar1 from './ProgressBar1';

export default function SearchState({ route, navigation }) {
    const country = route.params.country
    const [states, setStates] = useState([])
    const [chosenState, setChosenState] = useState('')
    const [cities, setCities] = useState([])
    const [shouldShow, setShouldShow] = useState(true);
    let [fontsLoaded] = useFonts({ Itim_400Regular });

    useEffect(() => {
        fetchStates()
    }, []);

    const fetchStates = () => {
        const url = 'http://api.airvisual.com/v2/states?country=+' + country + '&key=a7ce6190-d318-4fa8-8349-9523ceb7d11c';
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                setStates(responseJson.data)
                console.log(responseJson.data)
            })
            .catch((error) => {
                Alert.alert('Error', error);
            });
    };

    const listSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "80%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "10%"
                }}
            />
        );
    };

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    style={{ marginLeft: "5%", height: 600 }}
                    keyExtractor={item => item.state}
                    renderItem={({ item }) =>
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('City', { country: country, state: item.state })} style={styles.button}>
                                <View style={styles.list}>
                                    <Text style={styles.itemList}>{item.state}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>}
                    ItemSeparatorComponent={listSeparator}
                    data={states} />

                <ProgressBar1 />
            </SafeAreaView>
        );
    };
}

const styles = StyleSheet.create({
    flatList: {
        paddingLeft: 15,
        marginTop: 15,
        paddingBottom: 15,
        fontSize: 20,
        borderBottomColor: '#26a69a',
        borderBottomWidth: 1
    },
    list: {
        height: 97
    },
    button: {
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    headline: {
        borderWidth: 1,
        borderRadius: 5,
        width: 380,
        marginTop: 10,
        backgroundColor: '#63C5DA',
        marginLeft: 15,
        textAlign: 'center',
        fontSize: 30,
        padding: 2
    },
    itemList: {
        fontFamily: 'Itim_400Regular',
        fontSize: 20
    }
});