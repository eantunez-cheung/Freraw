import React from "react";
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from "react-native";

import colors from "../../Util/colors";
import tipJSON from "../../Util/tipJSON";

const Tips = ({navigation}) => {
    return (
        <View style={styles.container}>
            {
                tipJSON.map((tip, index) => (
                    <TouchableOpacity key={index} onPress={() => navigation.navigate('Détails tip', {
                        tip
                    })}>
                        <View style={styles.button}>
                            <Text style={styles.textButton}>{tip.name}</Text>
                        </View>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10
    },
    button: {
        backgroundColor: colors.blue,
        alignItems: 'center',
        borderRadius: 5,
        paddingVertical: 10,
        marginBottom: 10
    },
    textButton: {
        fontSize: 20,
        color: colors.white
    },
})

export default Tips