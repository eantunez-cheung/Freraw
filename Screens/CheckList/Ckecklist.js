import React, { useState, useEffect } from "react";
import {
    View,
    ScrollView,
    FlatList,
    Text,
    StyleSheet,
    Alert,
} from "react-native";
import { connect } from "react-redux";

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

import {
    faTrashAlt,
    faList,
    faPlusSquare
} from '@fortawesome/free-solid-svg-icons';


import colors from "../../Util/colors"
import CreateList from "../../Components/CheckList/CreateList";
import { addCheckList, deleteCheckList } from "../../Util/actions";
import CheckListItem from '../../Components/CheckList/CheckListItem'
import DeleteCheckListItem from "../../Components/CheckList/DeleteCheckListItem";
import NavBar from "../../Components/NavBar";

const elementNavBar = [
    { icon: faList, activeMenu: "lists" },
    { icon: faPlusSquare, activeMenu: "createList" },
    { icon: faTrashAlt, activeMenu: "deleteList" },
]

const Checklist = ({ list, saveChecklist, removeCheckList, navigation }) => {
    const [activeMenu, setActiveMenu] = useState('lists')
    const [array, setArray] = useState([])
    const hasUnsavedChanges = Boolean(array.length);

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
                            setArray([])
                            navigation.dispatch(e.data.action)
                        }
                    }
                ])
            }),
        [navigation, hasUnsavedChanges]
    )

    const renderItem = ({ item, index }) => (
        <CheckListItem
            item={item}
            onPress={() =>
                navigation.navigate('Détail-Liste', {
                    idList: item.id,
                    indexList: index,
                })}
        />
    )

    const handleSubmit = (id, nameList) => {
        Alert.alert('Confirmation de suppression', `Êtes-vous sûr de vouloir supprimer la liste "${nameList}" ?`, [
            {
                text: "Oui",
                onPress: () => removeCheckList(id)
            },
            {
                text: "Non",
            }
        ])
    }

    const renderDeleteItem = ({ item }) => (
        <DeleteCheckListItem
            item={item}
            onPress={() => handleSubmit(item.id, item.nameList)}
        />
    )

    return (
        <View>
            <NavBar elementNavBar={elementNavBar} activeMenu={activeMenu} setActiveMenu={setActiveMenu} array={array} setArray={setArray} />
            {
                (activeMenu === 'lists' ?
                    (!list.length ?
                        <View style={styles.listEmpty}>
                            <Text style={styles.text}>Liste vide</Text>
                        </View>
                        :
                        <FlatList
                            data={list}
                            renderItem={renderItem}
                            contentContainerStyle={styles.listContainer}
                        />
                    )
                    : activeMenu === 'createList' ?
                        <ScrollView style={styles.scrollView}>
                            <CreateList saveChecklist={saveChecklist} activeMenu={setActiveMenu} setArray={setArray} />
                        </ScrollView>
                        : activeMenu === 'deleteList' ?
                            (!list.length ?
                                <View style={styles.listEmpty}>
                                    <Text style={styles.text}>Liste vide</Text>
                                </View>
                                :
                                <FlatList
                                    data={list}
                                    renderItem={renderDeleteItem}
                                    contentContainerStyle={styles.listContainer}
                                />
                            )
                            : <></>)
            }
        </View>
    )
}

const styles = StyleSheet.create({
    containerNavBar: {
        flexDirection: 'row'
    },
    activeMenu: {
        backgroundColor: colors.blue
    },
    icon: {
        color: colors.white
    },
    listEmpty: {
        justifyContent: 'center',
        alignItems: 'center',
        height: hp(85)
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        color: colors.blue,
    },
    listContainer: {
        paddingBottom: 50
    },
    scrollView: {
        height: hp(82)
    }
})

const mapStateToProps = state => ({
    list: state.checkList
})

const mapDispatchToProps = dispatch => ({
    saveChecklist(nameList, materials) {
        dispatch(addCheckList(nameList, materials))
    },
    removeCheckList(id) {
        dispatch(deleteCheckList(id))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Checklist)