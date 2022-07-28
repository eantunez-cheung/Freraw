import React, { useState, useEffect } from "react";
import {
    View,
    ScrollView,
    Text,
    Alert,
    StyleSheet
} from "react-native"
import { connect } from "react-redux";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import {
    faTrashAlt,
    faList,
    faPlusSquare
} from '@fortawesome/free-solid-svg-icons';

import { addStoryboard, deleteStoryboard } from "../../Util/actions";
import NavBar from "../../Components/NavBar";
import CreateStoryboard from "../../Components/Videographer/CreateStoryboard";
import colors from "../../Util/colors";
import ListStoryboard from "../../Components/Videographer/ListStoryboard";
import DeleteStoryboard from "../../Components/Videographer/DeleteStoryboard";

const elementNavBar = [
    { icon: faList, activeMenu: "listStoryboard" },
    { icon: faPlusSquare, activeMenu: "createStoryboard" },
    { icon: faTrashAlt, activeMenu: "deleteStoryboard" },
]

const Videographer = ({ list, saveStoryboard, removeStoryboard, navigation }) => {
    const [activeMenu, setActiveMenu] = useState('listStoryboard')
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

    return (
        <View>
            <NavBar elementNavBar={elementNavBar} activeMenu={activeMenu} setActiveMenu={setActiveMenu} array={array} setArray={setArray} />
            <ScrollView style={styles.scrollview}>
                {
                    (activeMenu === 'listStoryboard' ?
                        (!list.length ?
                            <View style={styles.listEmpty}>
                                <Text style={styles.text}>Liste vide</Text>
                            </View>
                            :
                            <ListStoryboard list={list} navigation={navigation} />

                        )
                        : activeMenu === 'createStoryboard' ?
                            <CreateStoryboard saveStoryboard={saveStoryboard} setActiveMenu={setActiveMenu} setArray={setArray} />
                            : activeMenu === 'deleteStoryboard' ?
                                (!list.length ?
                                    <View style={styles.listEmpty}>
                                        <Text style={styles.text}>Liste vide</Text>
                                    </View>
                                    :
                                    <DeleteStoryboard list={list} removeStoryboard={removeStoryboard} />
                                )
                                :
                                <></>
                    )
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    scrollview: {
        height: hp(82),
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
})

const mapStateToProps = state => ({
    list: state.storyboard
})

const mapDispatchToProps = dispatch => ({
    saveStoryboard(nameStoryboard, scenes) {
        dispatch(addStoryboard(nameStoryboard, scenes))
    },
    removeStoryboard(id) {
        dispatch(deleteStoryboard(id))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Videographer)