import React, { useState } from "react";
import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    Alert,
    StyleSheet
} from "react-native"
import { connect } from "react-redux";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faImage,
    faCreditCard
} from '@fortawesome/free-regular-svg-icons';
import {
    faUser,
    faFolder,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';

import NavBar from "../../Components/NavBar";
import { addMyPhoto, deleteFolder } from "../../Util/actions";
import ListPhoto from "../../Components/Photographer/ListPhoto";
import colors from "../../Util/colors";
import CreateFolder from "../../Components/CreateFolder";
import BuyPhoto from "../../Components/Photographer/BuyPhoto";

const elementNavBar = [
    { icon: faImage, activeMenu: "photo" },
    { icon: faUser, activeMenu: "myPhoto" },
    { icon: faCreditCard, activeMenu: "buyPhoto" },
]

const handleRemoveFile = (id, fileName, removeFolder) => {
    Alert.alert('Confirmation de suppression', `Êtes-vous sûr de vouloir supprimer le dossier "${fileName}" ?`, [
        {
            text: "Oui",
            onPress: () => removeFolder(id)
        },
        {
            text: "Non",
        }
    ])
}

const Photographer = ({ list, myPhoto, createFolder, removeFolder, navigation, route }) => {
    const [activeMenu, setActiveMenu] = useState('photo')
    const [createFolderIsClicked, setCreateFolderIsClicked] = useState(false)
    const [offsetScroll, setOffsetScroll] = useState(0)
    const userId = route.params.userId
    const profil = route.params.profil

    return (
        <View>
            <NavBar elementNavBar={elementNavBar} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
            {
                activeMenu === 'buyPhoto' ?
                    profil === 'CLIENT' ?
                        <View style={styles.container}>
                            <TouchableOpacity onPress={() => {navigation.navigate('Panier', {userId})}}>
                                <View style={styles.basketButton}>
                                    <Text style={styles.textButton}> Panier</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        : profil === 'ADMIN' ?
                            <View style={styles.container}>
                                <TouchableOpacity onPress={() => {navigation.navigate('Ajout produit')}}>
                                    <View style={styles.basketButton}>
                                        <Text style={styles.textButton}>Ajouter un produit</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            :
                            <></>
                    :
                    <></>
            }
            <ScrollView style={styles.scrollview(activeMenu)} contentOffset={{ y: offsetScroll }}>
                {
                    activeMenu === 'photo' ?
                        <ListPhoto photos={list} offsetScroll={offsetScroll} setOffsetScroll={setOffsetScroll} />
                        : activeMenu === 'myPhoto' ?
                            <View style={styles.container}>
                                <View style={styles.containerFolderButton}>
                                    {
                                        myPhoto.map((folder, index) => (
                                            <TouchableOpacity key={index} onPress={() => navigation.navigate('Mes photos', {
                                                idFolder: folder.id,
                                                indexFolder: index
                                            })}>
                                                <View style={styles.folderButton}>
                                                    <FontAwesomeIcon icon={faFolder} style={styles.icon} size={80} />
                                                    <Text style={styles.textFolderButton}>{folder.nameFolder}</Text>
                                                </View>
                                                <TouchableOpacity style={styles.deleteButton} onPress={() => handleRemoveFile(folder.id, folder.nameFolder, removeFolder)}>
                                                    <FontAwesomeIcon style={styles.deleteIcon} icon={faXmark} size={30} />
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                        ))
                                    }
                                </View>
                                <TouchableOpacity onPress={() => setCreateFolderIsClicked(true)}>
                                    <View style={styles.button}>
                                        <Text style={styles.textButton}>Créer un dossier</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            : activeMenu === 'buyPhoto' ?
                                <BuyPhoto />
                                :
                                <></>
                }
            </ScrollView>
            {
                createFolderIsClicked ?
                    <CreateFolder setCreateFolderIsClicked={setCreateFolderIsClicked} createFolder={createFolder} />
                    :
                    <></>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    scrollview: (activeMenu) => ({
        height: activeMenu != 'buyPhoto' ? hp(82) : hp(73),
    }),
    container: {
        padding: 10,
    },
    button: {
        backgroundColor: colors.blue,
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: "center"
    },
    textButton: {
        color: colors.white,
        fontSize: 20
    },
    containerFolderButton: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    folderButton: {
        padding: 6.5,
    },
    textFolderButton: {
        textAlign: 'center',
        fontSize: 15,
        color: colors.blue,
        maxWidth: 80
    },
    icon: {
        color: colors.cyan
    },
    deleteButton: {
        position: 'absolute',
        right: 0,
        padding: 2,
        backgroundColor: colors.red,
        borderRadius: 5
    },
    deleteIcon: {
        color: colors.white
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

const mapStateProps = state => ({
    list: state.photo,
    myPhoto: state.myPhoto
})

const mapDispatchProps = dispatch => ({
    createFolder(nameFolder, files) {
        dispatch(addMyPhoto(nameFolder, files))
    },
    removeFolder(id) {
        dispatch(deleteFolder(id))
    }
})

export default connect(mapStateProps, mapDispatchProps)(Photographer)