import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet
} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faTimes
} from '@fortawesome/free-solid-svg-icons';

import colors from "../../Util/colors";

export default function Materials({
    materials: defaultMaterials = [],
    onChange = () => null,
    clearList = false,
    setClearList = () => null
}) {
    const { materials, addMaterials, changeMaterials, removeMaterials, removeAll } = useMaterials(defaultMaterials)

    if (JSON.stringify(materials) !== JSON.stringify(defaultMaterials) && clearList) {
        removeAll()
        setClearList(false)
    }

    useEffect(() => {
        onChange(materials)
    }, [materials])

    return (
            <View style={styles.container}>
                {materials.map((material, index) => (
                    <View key={`material-${index}`} style={styles.material}>
                        <TextInput
                            value={material.name}
                            style={styles.inputText}
                            placeholder="Nom de l'élément"
                            placeholderTextColor={colors.gray}
                            onChange={e => changeMaterials(index, {
                                name: e.nativeEvent.text,
                            })} />
                        <TouchableWithoutFeedback onPress={() => removeMaterials(index)}>
                            <FontAwesomeIcon icon={faTimes} style={styles.icon} size={30} />
                        </TouchableWithoutFeedback>
                    </View>
                ))}
                <TouchableOpacity onPress={() => addMaterials({ name: '', isCheck: false })}>
                    <View style={styles.button}>
                        <Text style={styles.textButton}>Ajouter un élément</Text>
                    </View>
                </TouchableOpacity>
            </View>
    )
}

const useMaterials = (defaultMaterials = []) => {
    const [materials, setMaterials] = useState(defaultMaterials)

    return {
        materials,
        addMaterials: ({ name, isCheck }) =>
            setMaterials([...materials, { name, isCheck }]),
        changeMaterials: (index, material) =>
            setMaterials(
                materials.map((ma, i) =>
                    i === index ? { ...ma, ...material } : ma,
                )
            ),
        removeMaterials: index =>
            setMaterials(materials.filter((v, i) => i !== index)),
        removeAll: () =>
                setMaterials([]),
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderWidth: 2,
        marginBottom: 20,
        borderRadius: 5,
        borderColor: colors.blue,
    },
    material: {
        flexDirection: "row",
        alignItems: 'center',
    },
    inputText: {
        borderWidth: 1,
        fontSize: 20,
        marginTop: 5,
        marginBottom: 12,
        borderRadius: 5,
        padding: 10,
        borderColor: colors.cyan,
        flexGrow: 1,
        color: colors.blue
    },
    icon: {
        color: colors.white,
        backgroundColor: colors.red,
        marginLeft: 10
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        paddingVertical: 12,
        backgroundColor: colors.blue
    },
    textButton: {
        fontSize: 20,
        color: colors.white
    }
})