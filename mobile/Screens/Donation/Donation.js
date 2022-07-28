import React, { useState } from 'react';
import {
    StyleSheet,
    Alert,
    Text,
    View,
    TouchableOpacity,
    Modal,
    ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import colors from '../../Util/colors'
import { useNetInfo } from '@react-native-community/netinfo';

const Donation = ({ navigation }) => {
    const [prog, setProg] = useState(false);
    const [progClr, setProgClr] = useState('#000');
    const netInfo = useNetInfo()

    function onMessage(e) {
        let data = e.nativeEvent.data;
        console.log(data);
        let payment = JSON.parse(data);
        if (payment.status === 'COMPLETED') {
            Alert.alert('Information', `Payement réussi avec succès !!`, [
                {
                    text: "ok",
                    onPress: () => navigation.goBack()
                },
            ])
        } else {
            alert('Un problème est survenue lors du payement. Veuillez réessayer');
        }
    }

    return (
        <Modal
            visible={true}
            onDismiss={() => navigation.goBack()}
            onRequestClose={() => navigation.goBack()}
            animationType={'fade'}
            transparent>
            <View style={styles.webViewCon}>
                <View style={styles.wbHead}>
                    <TouchableOpacity
                        style={{ padding: 13 }}
                        onPress={() => navigation.goBack()}>
                        <FontAwesomeIcon icon={faArrowLeft} size={25} style={{ color: colors.blue }} />
                    </TouchableOpacity>
                    <Text
                        style={{
                            flex: 1,
                            textAlign: 'center',
                            fontSize: 25,
                            fontWeight: 'bold',
                            color: colors.blue,
                        }}>
                        Donation
                    </Text>
                    <View style={{ padding: 13, opacity: prog ? 1 : 0 }}>
                        <ActivityIndicator size={24} color={progClr} />
                    </View>
                </View>
                {
                    netInfo.isConnected ?
                        <WebView
                            source={{ uri: 'https://freraw-payment-1a0f0.web.app' }}
                            style={{ flex: 1 }}
                            onLoadStart={() => {
                                setProg(true);
                                setProgClr('#000');
                            }}
                            onLoadProgress={() => {
                                setProg(true);
                                setProgClr('#00457C');
                            }}
                            onLoadEnd={() => {
                                setProg(false);
                            }}
                            onLoad={() => {
                                setProg(false);
                            }}
                            onMessage={onMessage}
                        />
                        :
                        <View style={{
                            backgroundColor: colors.white,
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 10
                        }}>
                            <Text style={{fontSize: 20, color: colors.blue, textAlign: 'center'}}>
                                Veuillez vous connecter à Internet pour accéder à la page de donation.
                            </Text>
                        </View>
                }
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    btnCon: {
        height: 45,
        width: '70%',
        elevation: 1,
        backgroundColor: colors.blue,
        borderRadius: 3,
    },
    btn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnTxt: {
        color: '#fff',
        fontSize: 20,
    },
    webViewCon: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    wbHead: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        zIndex: 25,
        elevation: 2,
    },
})

export default Donation