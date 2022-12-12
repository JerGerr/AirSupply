import React from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import { useFonts } from 'expo-font';
import { Itim_400Regular } from '@expo-google-fonts/itim';
import LottieView from "lottie-react-native";

export default function ProgressBar() {

    return (
        <View style={{ backgroundColor: '#87CEEB', borderRadius: 20, height: 140, marginBottom: -20 }}>
            <View style={styles.bar}>
                <View style={{ width: 0, backgroundColor: '#00BDFF', height: 20, marginTop: 0, marginLeft: 4 }}>
                    <LottieView style={{ height: 60, zIndex: 2, marginTop: -14, marginLeft: -7 }} source={require('../assets/Lottie/clouds.json')} autoPlay />
                </View>
            </View>
            <View style={{ marginLeft: '5%', height: 100, flexDirection: 'row', padding: 20 }}>
                <View style={{ width: 115 }}>
                    <Text style={styles.textProgress}>Country</Text>
                </View>
                <View style={{ width: 115 }}>
                    <Text style={styles.textProgress}>State</Text>
                </View>
                <View style={{ width: 115 }}>
                    <Text style={styles.textProgress}>City</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    textProgress: {
        textAlign: 'center',
        fontFamily: 'Itim_400Regular',
        fontSize: 15
    },
    bar: {
        marginLeft: 50,
        width: 310,
        height: 20,
        borderRadius: 1,
        marginTop: 35,
        backgroundColor: '#c5c6d0',
        borderRadius: 50,
        borderWidth: 0,
        elevation: 3,
    }
});