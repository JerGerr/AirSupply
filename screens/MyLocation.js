import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { Alert, StyleSheet, Text, View, SafeAreaView, ImageBackground } from 'react-native';
import { Avatar, Icon, Image } from 'react-native-elements';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Itim_400Regular } from '@expo-google-fonts/itim';
import LottieView from "lottie-react-native";
import ProgressCircle from 'react-native-progress-circle'

export default function MyLocation({ navigation }) {
    const [location, setLocation] = useState('');
    const [lat, setLat] = useState('');
    const [long, setLong] = useState('');
    const [data, setData] = useState([]);
    const [info, setInfo] = useState({
        country: '',
        city: '',
        temp: '',
        humidity: '',
        windspeed: '',
        aqi: '',
        pollutants: '',
    });
    const [visible, setVisible] = useState(false);

    let [fontsLoaded] = useFonts({ Itim_400Regular });

    useEffect(() => {
        getLocation();
        showDetails();
    }, []);

    const getLocation = async () => {
        //Check permission
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('No permission to access location');
        } else {
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setLat(location.coords.latitude);
            setLong(location.coords.longitude);
            setVisible(true)
        }
    };

    const showDetails = () => {
        fetch('http://api.airvisual.com/v2/nearest_city?lat=' + { lat } + '&lon=' + { long } + '&key=a7ce6190-d318-4fa8-8349-9523ceb7d11c')
            .then(response => response.json())
            .then(responseJson => {
                setData(responseJson.data);
                setInfo({
                    country: responseJson.data.country,
                    city: responseJson.data.city,
                    temp: responseJson.data.current.weather.tp,
                    humidity: responseJson.data.current.weather.hu,
                    windspeed: responseJson.data.current.weather.ws,
                    aqi: responseJson.data.current.pollution.aqius,
                    pollutants: responseJson.data.current.pollution.mainus,
                });
            });
    }

    const airPollutant = (pollutant) => {
        console.log(pollutant)
        if (pollutant === "o3") {
            return <Text>Ozone</Text>
        } else if (pollutant === "n2") {
            return <Text>Nitrogen Dioxide</Text>
        } else if (pollutant === "s2") {
            return <Text>Sulfur Dioxide</Text>
        } else if (pollutant === "co") {
            return <Text>Carbon Monoxide</Text>
        } else if (pollutant === "p2") {
            return <Text>Microscopic Particulate</Text>
        } else {
            return <Text>Respirable Particulate</Text>
        }
    }

    const colorpicker = (aqi) => {
        if (aqi > 0 && aqi <= 50) {
            return 'green'
        } else if (aqi > 50 && aqi <= 100) {
            return 'gold'
        } else if (aqi > 101 && aqi <= 150) {
            return 'orange'
        } else if (aqi > 151 && aqi <= 200) {
            return 'palevioletred'
        } else if (aqi > 201 && aqi <= 300) {
            return 'violet'
        } else {
            return 'brown'
        }
    }

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ImageBackground
                    source={require('../images/sky1.png')}
                    style={styles.backgroundImage}>

                    {visible ?
                        <SafeAreaView style={{ flex: 1 }}>
                            <View style={styles.headline}>
                                <LottieView style={{ marginLeft: -180 }} source={require('../assets/Lottie/location.json')} autoPlay loop />
                                <Text style={styles.title}>{info.city}, {info.country}</Text>
                            </View>

                            <View style={styles.wrapper}>
                                <View style={styles.row}>
                                    <ProgressCircle
                                        percent={info.aqi / 1.5}
                                        radius={100}
                                        borderWidth={20}
                                        color={colorpicker(info.aqi)}
                                        shadowColor="#999"
                                        bgColor="#fff"
                                        outerCircleStyle={{
                                            marginTop: 20, marginBottom: 14
                                        }}>
                                        <Text style={{ fontSize: 80, color: colorpicker(info.aqi) }}>{info.aqi}</Text>
                                        <Text style={{ fontSize: 19 }}>AQI</Text>
                                    </ProgressCircle>
                                </View>


                                <View style={styles.details}>
                                    <View style={styles.row}>
                                        <Image style={{ width: 50, height: 40 }} source={require('../images/particle.png')} />
                                        <View>
                                            <View>
                                                <Text style={styles.textTitle}>{airPollutant(info.pollutants)}</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.row}>
                                        <Image style={{ width: 50, height: 40 }} source={require('../images/temp.png')} />
                                        <View style={styles.grid2}>
                                            <View style={{ width: info.temp * 6, backgroundColor: 'sandybrown', height: 33, marginTop: 3.5, marginLeft: 3, borderRadius: 20 }}>
                                                <Text style={styles.textTitle}>{info.temp}°c</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.row}>
                                        <Image style={{ width: 30, height: 40, marginRight: 20, marginLeft: 10 }} source={require('../images/waterdrop.png')} />
                                        <View style={styles.grid1}>
                                            <View style={{ width: info.humidity * 2.5, backgroundColor: 'aqua', height: 32, marginTop: 4, marginLeft: 3, borderRadius: 20 }}>
                                                <Text style={styles.textTitle}>{info.humidity}%</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.row}>
                                        <Image style={{ width: 45, height: 40, marginRight: 15 }} source={require('../images/windspeed.png')} />
                                        <View style={styles.grid}>
                                            <View style={{ width: info.windspeed * 12, backgroundColor: 'springgreen', height: 33, marginTop: 3, marginLeft: 3, borderRadius: 20 }}>
                                                <Text style={styles.textTitle}>{info.windspeed} m/s</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>

                        </SafeAreaView>
                        : <View>
                            <LottieView style={{ height: 260, marginTop: 100, marginLeft: 39 }} source={require('../assets/Lottie/maps.json')} autoPlay />
                            <Text style={{ height: 260, marginTop: 120, marginLeft: 120 }}>Please Turn on Location</Text>
                        </View>}
                </ImageBackground>
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
    title: {
        fontSize: 22,
        fontFamily: 'Itim_400Regular',
        color: 'green',
        marginLeft: 40,
    },
    buttonStyle: {
        color: 'violet',
        fontSize: 20,
        margin: 10,
        padding: 10
    },
    backgroundImage: {
        flex: 1,
        width: 420,
    },
    textTitle: {
        fontSize: 20,
        color: 'black',
        marginTop: 5,
        fontFamily: 'Itim_400Regular',
        marginLeft: 10,
        width: 250,
        zIndex: 99,
    },
    tempText: {
        fontSize: 30,
        color: 'black',
        fontFamily: 'Itim_400Regular',
        zIndex: 2,
        marginLeft: 20
    },
    grid: {
        borderWidth: 0,
        borderRadius: 20,
        borderBottomWidth: 0,
        elevation: 3,
        width: 250,
        backgroundColor: 'limegreen'
    },
    grid1: {
        borderWidth: 0,
        borderRadius: 20,
        borderBottomWidth: 0,
        elevation: 3,
        width: 250,
        backgroundColor: 'lightseagreen'
    },
    grid2: {
        borderWidth: 0,
        borderRadius: 20,
        borderBottomWidth: 0,
        elevation: 3,
        width: 250,
        backgroundColor: 'peru',
        marginLeft: 9
    },
    wrapper: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 0,
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        padding: 8,
    },
    imageCard: {
        width: 100,
        height: 120
    },
    details: {
        marginTop: 110,
    }
});