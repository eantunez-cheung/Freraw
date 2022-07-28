import React from "react";
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native'
import colors from "../../Util/colors";

const CheckListItem = ({ item, onPress }) => {
    const allElementIsChecked = item.materials.find(element => !element.isCheck) ? false: true
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button(allElementIsChecked)}>
                <Text style={styles.text}>{item.nameList}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: (allElementIsChecked) => ({
        borderBottomWidth: 2,
        paddingVertical: 15,
        paddingHorizontal: 12,
        alignItems: "center",
        justifyContent: "center",
        borderColor: colors.blue,
        backgroundColor: !allElementIsChecked ? colors.white : colors.green
    }),
    text: {
        fontSize: 20,
        color: colors.blue,
        fontWeight: 'bold'
    }
})

export default CheckListItem