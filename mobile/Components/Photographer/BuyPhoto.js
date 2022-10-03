import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    Alert,
    StyleSheet
} from "react-native";
import colors from "../../Util/colors";
import ajax from '../../Util/Fetch';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faXmark,
} from '@fortawesome/free-solid-svg-icons';

const handleAddBasket = async (productId, basketId) => {
    let response = await ajax.addBasket(productId, basketId)
    if (response === 'exist') {
        Alert.alert('information', 'Votre panier possède déjà ce produit.')
    }
}

export default function BuyPhoto({ basketId, profil, refreshNumberLine, setRefreshNumberLine }) {
    const [products, setProducts] = useState([])
    const fetchData = useCallback(async () => {
        const data = await ajax.getProducts();
        setProducts(data)
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData]);

    return (
        <View style={styles.container}>
            {
                products.slice().reverse().map(product => (
                        <View key={product.id} style={styles.thumbnailProduct}>
                            <Image style={styles.image} source={{ uri: `${product.image_path}` }} />
                            <Text style={styles.title}>{product.title}</Text>
                            <Text style={styles.price}>{product.price}€</Text>
                            {
                                profil === 'ADMIN' ?
                                    <></>
                                    :
                                    <TouchableOpacity onPress={() => {
                                        handleAddBasket(product.id, basketId)
                                        setRefreshNumberLine(!refreshNumberLine)
                                        }}>
                                        <View style={styles.button}>
                                            <Text style={styles.textButton}>Ajouter au panier</Text>
                                        </View>
                                    </TouchableOpacity>
                            }
                        </View>
                    ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
    },
    image: {
        height: Dimensions.get('window').width / 2,
        borderRadius: 5,
        resizeMode: "cover"
    },
    price: {
        position: 'absolute',
        color: colors.black,
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        left: 0,
        bottom: 0,
        paddingHorizontal: 20,
        fontSize: 20,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5
    },
    title: {
        position: 'absolute',
        color: colors.black,
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        left: 0,
        top: 0,
        paddingHorizontal: 20,
        fontSize: 20,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5
    },
    button: {
        backgroundColor: colors.blue,
        alignItems: "center",
        padding: 5,
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5
    },
    textButton: {
        color: colors.white,
        fontSize: 20
    },
    thumbnailProduct: {
        marginBottom: 10
    }
})