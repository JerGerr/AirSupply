import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, ScrollView, Text, View, Button, TextInput, FlatList, SafeAreaView, ImageBackground, TouchableOpacity, TouchableHighlight } from 'react-native';
import { SearchBar } from 'react-native-elements';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Itim_400Regular } from '@expo-google-fonts/itim';
import LottieView from "lottie-react-native";
import { Icon } from 'react-native-elements';
import ProgressBar from './ProgressBar';


export default function SearchCountry({ navigation }) {
    const [data, setData] = useState([])
    const [query, setQuery] = useState('')
    let [fontsLoaded] = useFonts({ Itim_400Regular });

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = () => {
        const url = 'http://api.airvisual.com/v2/countries?key=310ebac7-d662-4d09-85ec-e5025663840c';
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                setData(responseJson.data)
            })
            .catch((error) => {
                Alert.alert('Error', error)
            })
    }

    const updateQuery = (input) => {
        setQuery(input);
        console.log(query);
    }

    const showFilteredCountries = query.length > 0
        ? data.filter(data => data.country.toLowerCase().includes(query.toLowerCase()))
        : data

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
                <SearchBar
                    onChangeText={updateQuery}
                    value={query}
                    inputStyle={{ backgroundColor: 'white', fontFamily: 'Itim_400Regular' }}
                    containerStyle={{ backgroundColor: 'white', borderWidth: 1, borderRadius: 5, width: 400, marginTop: 10, marginLeft: 6 }}
                    inputContainerStyle={{ backgroundColor: '#63C5DA' }}
                    placeholder=' Search Country' />

                <FlatList
                    style={{ marginLeft: "5%", height: 60 }}
                    keyExtractor={item => item.country}
                    renderItem={({ item }) =>
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('State', { country: item.country })} style={styles.button}>
                                <View style={styles.list}>
                                    <Text style={styles.itemList}>{item.country}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>}
                    ItemSeparatorComponent={listSeparator}
                    data={showFilteredCountries} />

                <ProgressBar />
            </SafeAreaView>
        );
    };
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    list: {
        height: 97
    },
    itemList: {
        fontFamily: 'Itim_400Regular',
        fontSize: 20
    },
    textProgress: {
        textAlign: 'center',
        fontFamily: 'Itim_400Regular',
        fontSize: 15
    }
});