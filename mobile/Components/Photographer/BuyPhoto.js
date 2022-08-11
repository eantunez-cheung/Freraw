import React from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    StyleSheet
} from "react-native";
import colors from "../../Util/colors";

export default function BuyPhoto() {
    return (
        <View style={styles.container}>
            <View>
                <Image style={styles.image} source={{ uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg' }} />
                <Text style={styles.price}>price</Text>
                <TouchableOpacity>
                    <View style={styles.button}>
                        <Text style={styles.textButton}>Ajouter au panier</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View>
                <Image style={styles.image} source={{ uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg' }} />
                <Text style={styles.price}>price</Text>
                <TouchableOpacity>
                    <View style={styles.button}>
                        <Text style={styles.textButton}>Ajouter au panier</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View>
                <Image style={styles.image} source={{ uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg' }} />
                <Text style={styles.price}>price</Text>
                <TouchableOpacity>
                    <View style={styles.button}>
                        <Text style={styles.textButton}>Ajouter au panier</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View>
                <Image style={styles.image} source={{ uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg' }} />
                <Text style={styles.price}>price</Text>
                <TouchableOpacity>
                    <View style={styles.button}>
                        <Text style={styles.textButton}>Ajouter au panier</Text>
                    </View>
                </TouchableOpacity>
            </View>
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
        color: colors.white,
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        left: 0,
        bottom: 0,
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
})