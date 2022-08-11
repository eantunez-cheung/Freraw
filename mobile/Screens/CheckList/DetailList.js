import React, { useState, useEffect } from "react";
import {
    View,
    ScrollView,
    TouchableOpacity,
    Text,
    Alert,
    StyleSheet,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { connect } from "react-redux";

import colors from "../../Util/colors";
import Materials from '../../Components/CheckList/Materials'
import { updateCheckList, updateElementCheckList } from "../../Util/actions";

const handleSave = (setMaterials, setClearList, indexList, materials, addElementList) => {
    let materialNameIsEmpty = false
    materials.map((material) => {
        if (!material.name.trim()) {
            return materialNameIsEmpty = true
        }
    })
    if (!materialNameIsEmpty) {
        addElementList(indexList, materials)
        setMaterials([])
        setClearList(true)
    } else {
        Alert.alert("Erreur", "Un ou plusieurs élément de la liste ne sont pas renseigner !")
    }
}



const DetailList = ({ route, list, addElementList, changeElementCheckList, navigation }) => {
    const currentList = list.find(item => item.id === route.params.idList)
    const [materials, setMaterials] = useState([])
    const [clearList, setClearList] = useState(false)
    const hasUnsavedChanges = Boolean(materials.length);

    useEffect(
        () =>
            navigation.addListener('beforeRemove', (e) => {
                if (!hasUnsavedChanges) {
                    return
                }

                e.preventDefault()

                Alert.alert('Information', `Attention, en changent de page, les données que vous avez saisi seront effacé.\nÊtes vous sur de vouloir continuer ?`, [
                    {
                        text: "Annuler",
                    },
                    {
                        text: "Continuer",
                        onPress: () => {
                            setMaterials([])
                            navigation.dispatch(e.data.action)
                        }
                    }
                ])
            }),
        [navigation, hasUnsavedChanges]
    )

    const onChecked = (indexList, indexElement) => {
        const data = currentList.materials[indexElement]
        data.isCheck = !data.isCheck
        changeElementCheckList(indexList, indexElement, data)
    }

    const handleUncheckedButton = (indexList, materials) => {
        for (let index = 0; index < materials.length; index++) {
            const data = materials[index]
            data.isCheck = false
            changeElementCheckList(indexList, index, data)
        }
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>{currentList.nameList}</Text>
                <TouchableOpacity onPress={() => handleUncheckedButton(route.params.indexList, currentList.materials)}>
                    <View style={styles.button}>
                        <Text style={styles.textButton}>Tout Décocher</Text>
                    </View>
                </TouchableOpacity>
                {
                    (currentList.materials.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.containerItem} onPress={() => onChecked(route.params.indexList, index)}>
                            <CheckBox value={item.isCheck} onValueChange={() => { onChecked(route.params.indexList, index) }} tintColors={{ false: colors.gray, true: colors.cyan }} />
                            <Text style={styles.text}>{item.name}</Text>
                        </TouchableOpacity>
                    )))
                }
                <Materials materials={materials} onChange={setMaterials} clearList={clearList} setClearList={setClearList} />
                {
                    materials.length ?
                        <TouchableOpacity onPress={() => handleSave(setMaterials, setClearList, route.params.indexList, materials, addElementList)}>
                            <View style={styles.button}>
                                <Text style={styles.textButton}>Enregistrer les éléments</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <></>
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10
    },
    containerItem: {
        flexDirection: 'row',
        paddingVertical: 8,
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        color: colors.blue
    },
    title: {
        fontSize: 25,
        color: colors.blue,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    button: {
        alignItems: 'center',
        backgroundColor: colors.cyan,
        borderRadius: 5,
        paddingVertical: 10
    },
    textButton: {
        fontSize: 20,
        color: colors.white
    }
})

const mapStateToProps = state => ({
    list: state.checkList
})

const mapDispatchToProps = dispatch => ({
    addElementList(indexList, materials) {
        dispatch(updateCheckList(indexList, materials))
    },
    changeElementCheckList(indexList, indexElement, element) {
        dispatch(updateElementCheckList(indexList, indexElement, element))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailList)