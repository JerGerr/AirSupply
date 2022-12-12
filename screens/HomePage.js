import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View, Image, Button, TextInput, FlatList, SafeAreaView, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Itim_400Regular } from '@expo-google-fonts/itim';
import AirIndexInfo from './AirIndexInfo';
import Particulates from './Particulates';

export default function HomePage({ navigation }) {
    let [fontsLoaded] = useFonts({ Itim_400Regular });

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ImageBackground
                    source={require('../images/sky1.png')}
                    style={styles.backgroundImage}>

                    <Image style={{ width: 200, height: 60, marginTop: 70, marginLeft: 10, resizeMode: "cover", }} source={require('../images/logo.png')} />

                    <View style={{ flex: 1, marginTop: 30, padding: 10 }}>
                        <Text style={styles.title}>AQI Colors</Text>
                        <AirIndexInfo />
                    </View>

                    <View style={{ flex: 1, padding: 10 }}>
                        <Text style={styles.title}>Particulates</Text>
                        <Particulates />

                    </View>
                </ImageBackground>
            </SafeAreaView>
        );
    };
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: 420
    },
    title: {
        fontSize: 22,
        fontFamily: 'Itim_400Regular',
        color: '#1520a6',
        marginLeft: 10
    }
});