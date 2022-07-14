import React from "react";
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native'

import colors from "../../Util/colors";

const ListStoryboard = ({ list, navigation }) => {
    return (
        list.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => navigation.navigate('Détails-Storyboard', {
                idStoryboard: item.id,
                indexStoryboard: index
            })}>
                <View style={styles.button}>
                    <Text style={styles.textButton}>{item.nameStoryboard}</Text>
                </View>
            </TouchableOpacity>
        ))
    )
}

const styles = StyleSheet.create({
    button: {
        borderBottomWidth: 2,
        paddingVertical: 15,
        paddingHorizontal: 12,
        alignItems: "center",
        justifyContent: "center",
        borderColor: colors.blue,
    },
    textButton: {
        fontSize: 20,
        color: colors.blue,
        fontWeight: 'bold'
    }
})

export default ListStoryboard