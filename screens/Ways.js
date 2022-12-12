import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, SafeAreaView, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { Avatar, Icon, Image } from 'react-native-elements';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Itim_400Regular } from '@expo-google-fonts/itim';
import LottieView from "lottie-react-native";
import ProgressCircle from 'react-native-progress-circle'
import Carousel from 'react-native-snap-carousel';
import AirIndexInfo from './AirIndexInfo';
import Particulates from './Particulates';

export default function Ways({ navigation }) {
    let [fontsLoaded] = useFonts({ Itim_400Regular });
    const notes = [
        {
            detail: 'Walk',
            img: require('../assets/Lottie/walk.json')
        },
        {
            detail: 'Bike',
            img: require('../assets/Lottie/bike.json')
        },
        {
            detail: 'Recycle',
            img: require('../assets/Lottie/recycle.json')
        },
        {
            detail: 'Plant a Tree',
            img: require('../assets/Lottie/tree.json')
        },
    ]

    const _renderItem = ({ item, index }) => {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: '#2596be', width: '97%', height: 150, elevation: 3 }}>
                    <Text style={{ fontSize: 20, textAlign: 'center', color: 'black', marginTop: 5, fontFamily: 'Itim_400Regular', }}>{item.detail}</Text>
                    <LottieView style={{ height: '85%', alignSelf: 'center', }} source={item.img} autoPlay loop />
                </View>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Carousel
                layout={'stack'}
                ref={(c) => { _carousel = c; }}
                data={notes}
                firstItem={1}
                enableSnap={true}
                inactiveSlideOpacity={1}
                inactiveSlideScale={0.7}
                sliderWidth={900}
                itemWidth={200}
                renderItem={_renderItem}
                slideStyle={styles.carousel}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    carousel: {
        flex: 1,
        height: 80,
        marginTop: 5
    }
});