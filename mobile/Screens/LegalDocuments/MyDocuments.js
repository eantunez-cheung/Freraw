import React from "react";
import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    Alert,
    StyleSheet
} from 'react-native'
import { connect } from "react-redux";
import DocumentPicker from "react-native-document-picker";
import FileViewer from "react-native-file-viewer";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faFilePdf,
    faImage
} from '@fortawesome/free-regular-svg-icons';
import {
    faXmark
} from '@fortawesome/free-solid-svg-icons';

import colors from "../../Util/colors";
import { addMyDocument, deleteMyDocument } from "../../Util/actions";

const handleImportDocument = async (addDocument) => {
    try {
        const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
        })
        res.map(doc => addDocument(doc.uri, doc.name, doc.type))
    } catch (error) {
        if (DocumentPicker.isCancel(error)) {
            // alert("Canceled from single doc picker")
        } else {
            alert('Unknown Error: ' + JSON.stringify(err));
            throw err;
        }
    }
}

const handleOpenFile = async (pathFile) => {
    try {
        await FileViewer.open(pathFile)
    } catch (error) {
        alert(error)
    }
}

const handleRemoveFile = (id, fileName, removeDocument) => {
    Alert.alert('Confirmation de suppression', `Êtes-vous sûr de vouloir supprimer le fichier "${fileName}" ?`, [
        {
            text: "Oui",
            onPress: () => removeDocument(id)
        },
        {
            text: "Non",
        }
    ])
}

const MyDocument = ({ list, addDocument, removeDocument }) => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.containerFilesButton}>
                    {
                        list.map((file, index) => (
                            <TouchableOpacity key={index} onPress={() => handleOpenFile(file.pathFile)}>
                                <View style={styles.fileButton}>
                                    {
                                        file.docType === DocumentPicker.types.pdf ?
                                            <FontAwesomeIcon icon={faFilePdf} style={styles.icon} size={80} />
                                            :
                                            <FontAwesomeIcon icon={faImage} style={styles.icon} size={80} />
                                    }
                                    <Text style={styles.textFileButton}>{file.nameFile}</Text>
                                </View>
                                <TouchableOpacity style={styles.deleteButton} onPress={() => handleRemoveFile(file.id, file.nameFile, removeDocument)}>
                                    <FontAwesomeIcon style={styles.deleteIcon} icon={faXmark} size={30} />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        ))
                    }
                </View>
                <TouchableOpacity onPress={() => handleImportDocument(addDocument)}>
                    <View style={styles.button}>
                        <Text style={styles.textButton}>Importer document</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10
    },
    button: {
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: colors.blue,
        borderRadius: 5
    },
    textButton: {
        fontSize: 20,
        color: colors.white
    },
    fileButton: {
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    textFileButton: {
        maxWidth: 80,
        // maxHeight: 40,
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
        justifyContent: 'center'
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
    list: state.myDocument
})

const mapDispatchProps = dispatch => ({
    addDocument(pathFile, nameFile, docType) {
        dispatch(addMyDocument(pathFile, nameFile, docType))
    },
    removeDocument(id) {
        dispatch(deleteMyDocument(id))
    }
})

export default connect(mapStateProps, mapDispatchProps)(MyDocument)