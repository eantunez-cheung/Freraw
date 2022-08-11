import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import colors from "../../Util/colors";

export default function Basket({navigation, route}) {
    const userId = route.params.userId
    console.log(userId)

    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <View style={styles.basketButton}>
                    <Text style={styles.textButton}> Panier</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
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
    }
})