import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    Alert,
    StyleSheet
} from "react-native";
import colors from "../../Util/colors";
import ajax from "../../Util/Fetch";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { PaymentView } from "../../Components/Photographer/PaymentView";
import WebView from 'react-native-webview';


const handleDeleteLine = async id => {
    let response = await ajax.deleteProductInBasket(id)
}

export default function Basket({ navigation, route }) {
    const [response, setResponse] = useState()
    const [makePayment, setMakePayment] = useState(false)
    const [paymentStatus, setPaymentStatus] = useState('')

    const [basket, setBasket] = useState([])
    const [refreshData, setRefreshData] = useState(false)
    const totalPrice = basket.reduce((totalPrice, product) => totalPrice = totalPrice + product.price, 0)
    const strProduct = basket.reduce((str, product) => str = str + product.title + ', ', '')
    const basketId = route.params.basketId
    const userId = route.params.userId

    const fetchData = useCallback(async () => {
        const data = await ajax.getBasket(basketId)
        setBasket(data)
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData, refreshData])

    return (
        !makePayment ?
            <View style={styles.container}>
                <ScrollView style={{ height: "93%" }}>
                    <View style={styles.table}>
                        <Text style={styles.tableTitle}>Nom du produit</Text>
                        <Text style={styles.tableTitle}>Prix</Text>
                    </View>
                    {
                        basket.map((product, index) => (
                            <View key={index} style={styles.containerProduct}>
                                <Text style={styles.tableText}>{product.title}</Text>
                                <View style={styles.containerPrice}>
                                    <Text style={styles.tableText}>{product.price}€</Text>
                                    <TouchableOpacity onPress={() => {
                                        handleDeleteLine(product.command_line_id)
                                        setRefreshData(!refreshData)
                                    }}>
                                        <FontAwesomeIcon icon={faXmark} size={25} style={styles.icon} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    }
                    <Text style={styles.totalPrice}>Total : {totalPrice}€</Text>
                </ScrollView>
                <TouchableOpacity onPress={() => setMakePayment(true)}>
                    <View style={styles.basketButton}>
                        <Text style={styles.textButton}>Payer</Text>
                    </View>
                </TouchableOpacity>
            </View>
            :
            <WebView source={{uri: 'http://public.test/api'}} />
            // <PaymentView />
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10
    },
    textButton: {
        color: colors.white,
        fontSize: 20,
    },
    basketButton: {
        backgroundColor: colors.cyan,
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 5,
    },
    table: {
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    containerProduct: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginBottom: 10
    },
    tableTitle: {
        fontSize: 20,
        textDecorationLine: 'underline',
        color: colors.blue,
        fontWeight: 'bold'
    },
    tableText: {
        fontSize: 20,
        color: colors.blue
    },
    totalPrice: {
        textAlign: 'right',
        fontSize: 20,
        color: colors.blue
    },
    containerPrice: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        color: colors.white,
        backgroundColor: colors.red,
        borderRadius: 5,
        marginLeft: 5,
        padding: 10
    }
})