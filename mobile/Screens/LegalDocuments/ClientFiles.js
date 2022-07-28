import React, { useState } from 'react'
import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    Alert,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import FileViewer from "react-native-file-viewer";
import RNFS from 'react-native-fs';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faFilePdf,
} from '@fortawesome/free-regular-svg-icons';
import {
    faXmark
} from '@fortawesome/free-solid-svg-icons';

import colors from '../../Util/colors'
import ChooseDocument from '../../Components/LegalDocuments/ChooseDocument'
import { deleteClientFile } from '../../Util/actions';

const handleOpenFile = async (pathFile) => {
    try {
        await FileViewer.open(pathFile)
    } catch (error) {
        alert(error)
    }
}

const ClientFiles = ({ route, list, removeFile, navigation }) => {
    const [createFileIsClicked, setCreateFileIsClicked] = useState(false)
    const folder = list.find(folder => folder.id === route.params.idFolder)

    const handleRemoveFile = (indexFile, uri, fileName) => {
        Alert.alert('Confirmation de suppression', `Êtes-vous sûr de vouloir supprimer le fichier "${fileName}" ?`, [
            {
                text: "Oui",
                onPress: () => {
                    RNFS.unlink(uri).then(() => {
                        Alert.alert('Information', 'Fichier supprimé avec succès.')
                    }).catch((err) => {
                        Alert.alert('Erreur', `Le fichier n'existe pas !`)
                    })
                    removeFile(route.params.indexFolder, indexFile)
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
                <Text style={styles.tittle}>{folder.nameFolder}</Text>
                <View style={styles.containerFilesButton}>
                    {
                        folder.files.map((file, index) => (
                            <TouchableOpacity key={index} onPress={() => handleOpenFile(file.pathFile)}>
                                <TouchableOpacity style={styles.deleteButton} onPress={() => handleRemoveFile(index, file.pathFile, file.fileName)}>
                                    <FontAwesomeIcon style={styles.deleteIcon} icon={faXmark} size={30} />
                                </TouchableOpacity>
                                <View style={styles.fileButton}>
                                    <FontAwesomeIcon icon={faFilePdf} style={styles.icon} size={80} />
                                    <Text style={styles.textFileButton}>{file.fileName}</Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </View>
                <TouchableOpacity onPress={() => setCreateFileIsClicked(true)}>
                    <View style={styles.button}>
                        <Text style={styles.textButton}>Créer un fichier</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
            {
                createFileIsClicked ?
                    <ChooseDocument setCreateFileIsClicked={setCreateFileIsClicked} indexFolder={route.params.indexFolder} nameFolder={folder.nameFolder} navigation={navigation} />
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
        marginBottom: 10
    },
    textButton: {
        fontSize: 20,
        color: colors.white
    },
    tittle: {
        fontSize: 25,
        color: colors.blue,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    fileButton: {
        paddingVertical: 10
    },
    textFileButton: {
        maxWidth: 80,
        fontSize: 15,
        textAlign: 'center',
        color: colors.blue
    },
    icon: {
        color: colors.cyan
    },
    containerFilesButton: {
        flexDirection: "row",
        flexWrap: "wrap",
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
    removeFile(indexFolder, indexFile) {
        dispatch(deleteClientFile(indexFolder, indexFile))
    }
})

export default connect(mapStateProps, mapDispatchProps)(ClientFiles)