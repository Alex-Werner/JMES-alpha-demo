import {StatusBar} from 'expo-status-bar';
import {Platform, StyleSheet,Pressable} from 'react-native';

import {Text, View} from '../../components/Themed/Themed';
import React from "react";
import Background4 from "../../components/Background4/Background4";
import {
    useFonts,
    Comfortaa_300Light,
    Comfortaa_400Regular,
    Comfortaa_500Medium,
    Comfortaa_600SemiBold,
    Comfortaa_700Bold,
} from '@expo-google-fonts/comfortaa';
import {
    Roboto_900Black
} from '@expo-google-fonts/roboto';
import {Navigation} from "../../types";

type Props = {
    navigation: Navigation;
};

export default function CreateAssetConfirmScreen({navigation}: Props) {
    let [fontsLoaded] = useFonts({
        Comfortaa_300Light,
        Comfortaa_400Regular,
        Comfortaa_500Medium,
        Comfortaa_600SemiBold,
        Comfortaa_700Bold,
        Roboto_900Black
    });

    return (
        <View style={styles.container}>
            <Background4>
                <Text style={styles.title}>Create asset</Text>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
                <Text style={styles.section}>Your asset was created!</Text>
                <Pressable
                    onPress={async () => {
                        return navigation.navigate( "Balance");
                    }}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Ok</Text>
                </Pressable>
                {/* Use a light status bar on iOS to account for the black space above the modal */}
                <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'}/>
            </Background4>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#fff",
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 24,
        textTransform: "uppercase",
        fontFamily: 'Roboto_900Black',
        color: '#000000',
    },
    iconImageView: {
        flexDirection: 'row'
    },
    button: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        color: '#000000',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 25,
        paddingRight: 25,
        fontSize: 24,
        textTransform: "uppercase",
        fontFamily: 'Roboto_900Black',
    },
    title: {
        fontSize: 36,
        fontFamily: 'Comfortaa_300Light',
    },
    input: {
        backgroundColor: "white",
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    secondTitle: {
        fontSize: 36,
        fontFamily: 'Comfortaa_300Light',
        paddingTop: 40
    },
    balanceJMES: {
        fontWeight: 'bold',
        flex: 0,
        fontSize: 24,
        lineHeight: 28,
        paddingTop: 15,
        alignSelf: "center",
        fontFamily: 'Roboto_900Black',
        textTransform: "uppercase"
    },
    balanceEUR: {
        fontWeight: 'bold',
        flex: 0,
        fontSize: 24,
        lineHeight: 28,
        paddingTop: 15,
        alignSelf: "center",
        fontFamily: 'Roboto_900Black',
        textTransform: "uppercase"
    },
    buttonImage: {
        padding: 10
    },
    iconImage: {
        width: 30, height: 30, margin: 10
    },
    section: {
        fontWeight: 'bold',
        flex: 1,
        fontSize: 24,
        lineHeight: 28,
        paddingTop: 15,
        alignSelf: "flex-start",
        fontFamily: 'Roboto_900Black',
        textTransform: "uppercase"
    },
    noAssetText: {
        fontWeight: 'bold',
        flex: 1,
        fontSize: 24,
        lineHeight: 28,
        paddingTop: 15,
        alignSelf: "center",
        fontFamily: 'Roboto_900Black',
        textTransform: "uppercase"
    },


    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
