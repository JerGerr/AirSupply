import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, SafeAreaView, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { Avatar, colors, Icon, Image } from 'react-native-elements';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Itim_400Regular } from '@expo-google-fonts/itim';
import LottieView from "lottie-react-native";
import Carousel from 'react-native-snap-carousel';

export default function AirIndexInfo({ navigation }) {
    let [fontsLoaded] = useFonts({ Itim_400Regular });
    const colors = [
        {
            name: 'lightgreen',
            meaning: 'Good',
            values: '0 to 50',
            desc: 'Air quality is satisfactory, and air pollution poses little or no risk.',
            img: require('../images/good.png'),
        },
        {
            name: 'gold',
            meaning: 'Moderate',
            values: '51-100',
            desc: 'There is a risk for those who are unusually sensitive to air pollution.',
            img: require('../images/moderate.png'),
        },
        {
            name: 'orange',
            meaning: 'Unhealthy for Sensitive Groups',
            values: '101 to 150',
            desc: 'Members of sensitive groups may experience effects.',
            img: require('../images/unhealthy.png'),
        },
        {
            name: 'palevioletred',
            meaning: 'Unhealthy',
            values: '151 to 200',
            desc: 'Some members of the general public and sensitive groups may experience effects.',
            img: require('../images/sensitive.png'),
        },
        {
            name: 'rebeccapurple',
            meaning: 'Very Unhealthy',
            values: '201 to 300',
            desc: '	Health alert! The risk of health effects is increased for everyone.',
            img: require('../images/veryunhealthy.png'),
        },
        {
            name: 'maroon',
            meaning: 'Hazardous',
            values: '301 and higher',
            desc: 'Health warning of emergency conditions!! Everyone is more likely to be affected.',
            img: require('../images/hazardous.png'),
        },
    ]


    const _renderItem = ({ item, index }) => {
        const colorBg = item.name
        return (
            <View style={{ flex: 1, borderColor: colorBg, borderWidth: 3, borderRadius: 10, backgroundColor: colorBg }}>
                <Text style={{ fontSize: 18, fontFamily: 'Itim_400Regular', color: 'black', textAlign: 'center' }}>{item.values}</Text>
                <View style={{ width: '97%', marginLeft: 3, marginTop: 5, zIndex: 10 }}>
                    <Text style={{ fontSize: 18, color: 'white', marginTop: 0, fontFamily: 'Itim_400Regular', textAlign: 'center' }}>{item.meaning} </Text>
                    <Image style={{ width: 80, height: 80, marginTop: 2, marginLeft: 68, marginBottom: 10 }} source={item.img} />
                    <Text style={{ fontSize: 15, textAlign: 'center', color: 'blue', fontFamily: 'Itim_400Regular', backgroundColor: 'white', borderRadius: 5 }}>{item.desc}</Text>
                </View>
            </View>
        )
    }

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Carousel
                        layout={'default'}
                        ref={(c) => { _carousel = c; }}
                        data={colors}
                        firstItem={1}
                        enableSnap={true}
                        inactiveSlideOpacity={1}
                        inactiveSlideScale={0.7}
                        sliderWidth={900}
                        itemWidth={230}
                        renderItem={_renderItem}
                        slideStyle={styles.carousel}
                    />
                </View>
            </SafeAreaView>
        );
    };
}

const styles = StyleSheet.create({
    headline: {
        marginLeft: 30,
        marginTop: 100,
        color: '#fff',
        flexDirection: 'row'
    },
    backgroundImage: {
        flex: 1,
        width: 420,
    },
    title: {
        fontSize: 22,
        fontFamily: 'Itim_400Regular',
        color: 'black',
        marginLeft: 10,
        marginTop: 50,
        padding: 10
    },
    carousel: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 10,
    },
});
