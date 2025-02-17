
import {StatusBar} from 'expo-status-bar';
import {Platform, StyleSheet, Pressable, Image} from 'react-native';

import {Text, View} from '../../components/Themed/Themed';
import {useStoreState} from "../../hooks/storeHooks";
import {useEffect, useState} from "react";
import {fetchAddressBalance} from "../../utils";
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
import Web3 from "web3";
import {Navigation} from "../../types";
import * as React from "react";

type Props = {
    navigation: Navigation;
};

export default function WalletScreen({ navigation }: Props) {
    
    const address = useStoreState((state) => state.accounts[0].address)
    const balanceState = useStoreState((state) => state.accounts[0].balance)
    const account = useStoreState((state) => state.accounts[0])
    const [shouldFetch, setShouldFetch] = useState(true);
    const [balance, setBalance] = useState(balanceState);
    const [balanceEur, setBalanceEur] = useState(balanceState);

    let [fontsLoaded] = useFonts({
        Comfortaa_300Light,
        Comfortaa_400Regular,
        Comfortaa_500Medium,
        Comfortaa_600SemiBold,
        Comfortaa_700Bold,
        Roboto_900Black
    });
    
    function updateStoreState() {
        // console.log('UpdateStoreState');
        // updateAccount({...account, balance: balance})
    }

    async function fetchFromLocal() {

        const path = `http://localhost:3000/users?address=${address}`;

        const rawResponse = await fetch(path, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        });
        const parsedResponse = await rawResponse.json()
        const balance = parsedResponse[0].balance.toString()
        console.log("balance:", balance)
        setBalance(balance);

        const convertedBalance = (parseInt(balance) * 0.1412840103).toString();

        console.log({convertedBalance});
       
        setBalanceEur(parseFloat(convertedBalance).toFixed(2))
    }

    useEffect(() => {
        fetchFromLocal()
        setInterval(()=>{
            if(shouldFetch){
                fetchFromLocal();
            }
            console.log('interval');
        }, 10*3000)
    },[updateStoreState])

   /* useEffect(() => {
        async function fetch() {
            const fetchedBalance = await fetchAddressBalance(address);
            console.log({fetchedBalance});
            setBalance(Web3.utils.fromWei(fetchedBalance, 'ether'));

            const convertedBalance = (parseInt(fetchedBalance) * 0.1412840103).toString();
            
            console.log({convertedBalance});
            setBalanceEur(parseFloat(Web3.utils.fromWei(convertedBalance, 'ether')).toFixed(2))

        }

        fetch();
        setInterval(()=>{
            if(shouldFetch){
                fetch();
            }
            console.log('interval');
        }, 10*1000)
    }, [updateStoreState]);
*/
    return (
        <View style={styles.container}>
            <Background4>
                <Text style={styles.title}>Balance</Text>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>

                <Text style={styles.balanceJMES}>
                    JMES {balance}</Text>
                <Text style={styles.balanceEUR}>(EUR {balanceEur})</Text>

                <View style={styles.iconImageView}>
                    <Pressable
                        onPress={() => navigation.navigate("WalletReceive")}
                        style={styles.buttonImage}
                    >
                        <Image source={require('../../assets/icons/receive-white.png')}
                               style={styles.iconImage}
                        />
                    </Pressable>
                    <Pressable
                        onPress={() => navigation.navigate("WalletSend")}
                        style={styles.buttonImage}
                    >
                        <Image source={require('../../assets/icons/send_white.png')}
                               style={styles.iconImage}
                        />
                    </Pressable>
                    <Pressable
                        onPress={() => navigation.navigate("Scan")}
                        style={styles.buttonImage}
                    >
                        <Image source={require('../../assets/icons/scan_white.png')}
                               style={styles.iconImage}
                        />
                    </Pressable>
                </View>


                <Text style={styles.secondTitle}>Asset</Text>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
                <Text style={styles.noAssetText}>No assets yet :)</Text>

                <Pressable
                    onPress={() => navigation.navigate("CreateAsset")}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Mint</Text>
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
    buttonText:{
        fontSize: 24,
        textTransform: "uppercase",
        fontFamily: 'Roboto_900Black',
        color: '#000000',
    },
    iconImageView:{
        backgroundColor: '#ffffff1f',
        marginTop:5,
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
        marginTop: 10,
        marginBottom: 15,
        paddingBottom: 5,
        paddingLeft: 25,
        paddingRight: 25,
        fontSize: 24,
        textTransform: "uppercase",
        fontFamily: 'Roboto_900Black',
    },
    title: {
        fontSize: 36,
        color: '#FFF',
        fontFamily: 'Comfortaa_300Light',
    },
    secondTitle:{
        fontSize: 36,
        color: '#FFF',
        fontFamily: 'Comfortaa_300Light',
        paddingTop: 40
    },
    balanceJMES:{
        fontWeight: 'bold',
        flex: 0,
        fontSize: 24,
        lineHeight: 28,
        paddingTop: 15,
        alignSelf: "center",
        color: '#FFF',
        fontFamily: 'Roboto_900Black',
        textTransform: "uppercase"
    },
    balanceEUR:{
        fontWeight: 'bold',
        flex: 0,
        fontSize: 24,
        color:'#FFF',
        lineHeight: 28,
        paddingTop: 15,
        alignSelf: "center",
        fontFamily: 'Roboto_900Black',
        textTransform: "uppercase"
    },
    buttonImage: {
        padding: 10,
        margin: 5
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
        color:'#FFF',
        alignSelf: "flex-start",
        fontFamily: 'Roboto_900Black',
        textTransform: "uppercase"
    },
    noAssetText: {
        fontWeight: 'bold',
        flex: 1,
        fontSize: 24,
        color: '#FFF',
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
