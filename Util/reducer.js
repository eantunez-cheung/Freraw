import { combineReducers } from 'redux'
import { v4 } from 'node-uuid'
import update from 'immutability-helper'
import { Image } from 'react-native'

import * as actions from './actionsType'

const initialState = {

    storyboard: [],
    checkList: [],
    clientDocuments: [],
    myDocuments: [],
    photos: [
        { url: Image.resolveAssetSource(require('../Images/photo1.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo2.jpg')), format: "paysage" },
        { url: Image.resolveAssetSource(require('../Images/photo3.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo4.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo5.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo6.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo7.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo8.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo9.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo10.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo11.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo12.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo13.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo14.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo15.jpg')), format: "paysage" },
        { url: Image.resolveAssetSource(require('../Images/photo16.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo17.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo18.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo19.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo20.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo21.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo22.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo23.jpg')), format: "paysage" },
        { url: Image.resolveAssetSource(require('../Images/photo24.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo25.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo26.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo27.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo28.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo29.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo30.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo31.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo32.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo33.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo34.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo35.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo36.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo37.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo38.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo39.jpg')), format: "paysage" },
        { url: Image.resolveAssetSource(require('../Images/photo40.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo41.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo42.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo43.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo44.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo45.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo46.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo47.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo48.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo49.jpg')), format: "portrait" },
        { url: Image.resolveAssetSource(require('../Images/photo50.jpg')), format: "portrait" },
    ],
    myPhotos: []
}

function storyboardReducer(state = initialState.storyboard, action) {
    switch (action.type) {
        case actions.ADD_STORYBOARD:
            return [
                ...state,
                {
                    id: v4(),
                    nameStoryboard: action.payload.nameStoryboard,
                    scenes: action.payload.scenes
                }
            ]
        case actions.UPDATE_STORYBOARD:
            return update(state, { [action.payload.indexStoryboard]: { scenes: { $push: action.payload.scenes } } })
        case actions.UPDATE_SCENE:
            return update(state, { [action.payload.indexStoryboard]: { scenes: { $splice: [[action.payload.indexScene, 1, action.payload.scene]] } } })
        case actions.REMOVE_STORYBOARD:
            return state.filter(storyboard => storyboard.id !== action.payload.id)
        default:
            return state
    }
}

function checkListReducer(state = initialState.checkList, action) {
    switch (action.type) {
        case actions.ADD_CHECKLIST:
            return [
                ...state,
                {
                    id: v4(),
                    nameList: action.payload.nameList,
                    materials: action.payload.materials
                }
            ]
        case actions.UPDATE_CHECKLIST:
            return update(state, { [action.payload.indexList]: { materials: { $push: action.payload.materials } } })
        case actions.UPDATE_ELEMENT_CHECKLIST:
            return update(state, { [action.payload.indexList]: { materials: { $splice: [[action.payload.indexElement, 1, action.payload.element]] } } })
        case actions.REMOVE_CHECKLIST:
            return state.filter(list => list.id !== action.payload.id)
        default:
            return state
    }
}

function clientDocumentsReducer(state = initialState.clientDocuments, action) {
    switch (action.type) {
        case actions.ADD_CLIENTDOCUMENTS:
            return [
                ...state,
                {
                    id: v4(),
                    nameFolder: action.payload.nameFolder,
                    files: action.payload.files
                }
            ]
        case actions.UPDATE_CLIENTDOCUMENTS:
            return update(state, { [action.payload.indexFolder]: { files: { $push: [action.payload.files] } } })
        case actions.REMOVE_CLIENTFILE:
            return update(state, { [action.payload.indexFolder]: { files: { $splice: [[action.payload.indexFile, 1]] } } })
        case actions.REMOVE_CLIENTDOCUMENTS:
            return state.filter(folder => folder.id !== action.payload.id)
        default:
            return state
    }
}

function myDocumentReducer(state = initialState.myDocuments, action) {
    switch (action.type) {
        case actions.ADD_MYDOCUMENT:
            return [
                ...state,
                {
                    id: v4(),
                    pathFile: action.payload.pathFile,
                    nameFile: action.payload.nameFile,
                    docType: action.payload.docType
                }
            ]
        case actions.REMOVE_MYDOCUMENT:
            return state.filter(document => document.id !== action.payload.id)
        default:
            return state
    }
}

function photoReducer(state = initialState.photos, action) {
    switch (action.type) {
        default:
            return state
    }
}

function myPhotoReducer(state = initialState.myPhotos, action) {
    switch (action.type) {
        case actions.ADD_MYPHOTO:
            return [
                ...state,
                {
                    id: v4(),
                    nameFolder: action.payload.nameFolder,
                    files: action.payload.files
                }
            ]
        case actions.UPDATE_MYPHOTO:
            return update(state, { [action.payload.indexFolder]: { files: { $splice: [[0, 0, action.payload.file]] } } })
        case actions.REMOVE_MYPHOTO:
            return update(state, { [action.payload.indexFolder]: { files: { $splice: [[action.payload.indexFile, 1]] } } })
        case actions.REMOVE_FOLDER:
            return state.filter(photo => photo.id !== action.payload.id)
        default:
            return state
    }
}

const reducer = combineReducers({
    storyboard: storyboardReducer,
    checkList: checkListReducer,
    clientDocuments: clientDocumentsReducer,
    myDocument: myDocumentReducer,
    photo: photoReducer,
    myPhoto: myPhotoReducer,
})

export default reducer