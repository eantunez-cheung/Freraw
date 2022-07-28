import React, { useState } from "react";
import {
    View,
    ScrollView,
    TouchableOpacity,
    Text,
    Alert,
    StyleSheet
} from 'react-native'
import { connect } from "react-redux";
import RNFS from 'react-native-fs';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faFolder,
    faXmark
} from '@fortawesome/free-solid-svg-icons';

import colors from "../../Util/colors";
import CreateFolder from "../../Components/CreateFolder";
import { addClientDocuments, deleteClientDocument } from '../../Util/actions'

const ClientFolders = ({ list, createFolder, removeFolder, navigation }) => {
    const [createFolderIsClicked, setCreateFolderIsClicked] = useState(false)

    const handleRemoveFolder = (idFolder, folderFiles, folderName) => {
        Alert.alert('Confirmation de suppression', `Êtes-vous sûr de vouloir supprimer le dossier "${folderName}" ?`, [
            {
                text: "Oui",
                onPress: () => {
                    if (folderFiles.length) {
                        const pathFolder = folderFiles[0].pathFile.slice(0, (folderFiles[0].pathFile.length - (folderFiles[0].fileName.length + 5)))
                        RNFS.unlink(pathFolder).then(() => {
                            Alert.alert('Information', 'Dossier supprimé avec succès.')
                        }).catch((err) => {
                            Alert.alert('Erreur', `Le dossier n'existe pas !`)
                        })
                        removeFolder(idFolder)
                    } else {
                        removeFolder(idFolder)
                    }
                }
            },
            {
                text: "Non",
            }
        ])
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.containerFolderButton}>
                    {list.map((folder, index) => (
                        <TouchableOpacity key={index} onPress={() => navigation.navigate('Fichiers client', {
                            idFolder: folder.id,
                            indexFolder: index,
                        })}>
                            <View style={styles.folderButton}>
                                <FontAwesomeIcon icon={faFolder} style={styles.icon} size={80} />
                                <Text style={styles.textFolderButton}>{folder.nameFolder}</Text>
                            </View>
                            <TouchableOpacity style={styles.deleteButton} onPress={() => handleRemoveFolder(folder.id, folder.files, folder.nameFolder)}>
                                <FontAwesomeIcon style={styles.deleteIcon} icon={faXmark} size={30} />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))}
                </View>
                <TouchableOpacity onPress={() => setCreateFolderIsClicked(true)}>
                    <View style={styles.button}>
                        <Text style={styles.textButton}>Créer un dossier</Text>
                    </View>
                </TouchableOpacity>
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
    container: {
        padding: 10
    },
    button: {
        backgroundColor: colors.blue,
        alignItems: 'center',
        borderRadius: 5,
        paddingVertical: 10,
    },
    textButton: {
        fontSize: 20,
        color: colors.white
    },
    icon: {
        color: colors.cyan
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
    deleteButton: {
        zIndex: 1,
        position: 'absolute',
        right: 0,
        padding: 2,
        backgroundColor: colors.red,
        borderRadius: 5
    },
    deleteIcon: {
        color: colors.white
    }
})

const mapStateProps = state => ({
    list: state.clientDocuments
})

const mapDispatchProps = dispatch => ({
    createFolder(nameFolder, files) {
        dispatch(addClientDocuments(nameFolder, files))
    },
    removeFolder(id) {
        dispatch(deleteClientDocument(id))
    }
})

export default connect(mapStateProps, mapDispatchProps)(ClientFolders)
