import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, SafeAreaView, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { Avatar, Icon, Image } from 'react-native-elements';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Itim_400Regular } from '@expo-google-fonts/itim';
import LottieView from "lottie-react-native";
import Carousel, { Pagination } from 'react-native-snap-carousel';

export default function Particulates() {
    let [fontsLoaded] = useFonts({ Itim_400Regular });
    const [shouldShow, setShouldShow] = useState(false);
    const [active, setActive] = useState(0);
    const particles = [
        {
            name: 'Ozone',
            desc: 'Causes smog, when pollutants chemically react in the presence of sunlight. It is most likely to reach unhealthy levels on hot sunny days.',
        },
        {
            name: 'Nitrogen Dioxide',
            desc: 'Nitric oxide (NO) emitted by cars or other combustion processes, combines with oxygen in the atmosphere, producing NO2 which can irritate the airways.',
        },
        {
            name: 'Sulfur Dioxide',
            desc: 'This colorless gas with a choking or suffocating odor comes from industrial facilities and burning of coal that makes breathing difficult.',
        },
        {
            name: 'Carbon Monoxide',
            desc: 'Usually released when something is burned, breathing high concentrations of CO reduces the amount of oxygen going to the heart and brain.',
        },
        {
            name: 'Microscopic Particulate',
            desc: 'Fine particles like dust, dirt, soot, or smoke that are seen only by microscope. Some are emitted directly from a source unpaved roads, fields, smokestacks or fires.',
        },
        {
            name: 'Respirable Particulate',
            desc: 'As big as the diameter of hair, they are soot, smoke, metals, dust from car emissions, dust and cooking smoke.',
        },
    ]

    const _renderItem = ({ item }) => {
        return (
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, fontFamily: 'Itim_400Regular', color: 'black', textAlign: 'center' }}>{item.name}</Text>
                {shouldShow ?
                    <View style={{ width: '97%', marginLeft: 3, marginTop: 5, zIndex: 10, elevation: 3 }}>
                        <Text style={{ fontSize: 15, textAlign: 'center', color: 'black', fontFamily: 'Itim_400Regular' }}>{item.desc}</Text>
                    </View>
                    : null}
                {!shouldShow ?
                    <View>
                        <LottieView style={{ width: 100, height: 100, marginLeft: 55 }} source={require('../assets/Lottie/virus.json')} autoPlay loop />
                        <TouchableOpacity style={styles.buttonStyle} onPress={() => setShouldShow(!shouldShow)}>
                        <Image style={{ width: 20, height: 20, marginLeft: 193, marginTop: 1 }} source={require('../images/show.png')} />
                        </TouchableOpacity>
                    </View>
                    :
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => setShouldShow(!shouldShow)}>
                        <Image style={{ width: 20, height: 20, marginLeft: 193, marginTop: 1 }} source={require('../images/redcrs.png')} />
                    </TouchableOpacity>
                }
            </View>
        )
    }

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Carousel
                    layout={'default'}
                    ref={(c) => { _carousel = c; }}
                    data={particles}
                    firstItem={1}
                    loop={true}
                    enableSnap={true}
                    inactiveSlideOpacity={1}
                    inactiveSlideScale={0.7}
                    sliderWidth={900}
                    itemWidth={320}
                    renderItem={_renderItem}
                    slideStyle={styles.carousel}
                    onSnapToItem={(index) => setActive(index)}
                />
                <Pagination
                    dotsLength={particles.length}
                    activeDotIndex={active}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginHorizontal: 8,
                        backgroundColor: 'blue'
                    }}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                />
            </View>
        </SafeAreaView>
    );
};
}

const styles = StyleSheet.create({
    carousel: {
        flex: 1,
        height: 190,
        marginTop: 20,
        marginBottom: -40
    },
    buttonStyle: {
        width: 292,
        marginLeft: 3
    }
});
