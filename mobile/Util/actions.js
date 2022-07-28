import * as actions from './actionsType'

export const addCheckList = (nameList, materials) => ({
    type: actions.ADD_CHECKLIST,
    payload: {
        nameList,
        materials
    }
})
export const updateCheckList = (indexList, materials) => ({
    type: actions.UPDATE_CHECKLIST,
    payload: {
        indexList,
        materials
    }
})
export const updateElementCheckList = ( indexList, indexElement, element) => ({
    type: actions.UPDATE_ELEMENT_CHECKLIST,
    payload: {
        indexList,
        indexElement,
        element
    }
})
export const deleteCheckList = id => ({
    type: actions.REMOVE_CHECKLIST,
    payload: {
        id
    }
})

export const addStoryboard = (nameStoryboard, scenes) => ({
    type: actions.ADD_STORYBOARD,
    payload: {
        nameStoryboard,
        scenes
    }
})
export const updateStoryboard = (indexStoryboard, scenes) => ({
    type: actions.UPDATE_STORYBOARD,
    payload: {
        indexStoryboard,
        scenes,
    }
})
export const updateScene = (indexScene, indexStoryboard, scene) => ({
    type: actions.UPDATE_SCENE,
    payload: {
        indexScene,
        indexStoryboard,
        scene
    }
})
export const deleteStoryboard = id => ({
    type: actions.REMOVE_STORYBOARD,
    payload: {
        id
    }
})

export const addClientDocuments = (nameFolder, files) => ({
    type: actions.ADD_CLIENTDOCUMENTS,
    payload: {
        nameFolder,
        files
    }
})
export const updateClientDocuments = (indexFolder, files) => ({
    type: actions.UPDATE_CLIENTDOCUMENTS,
    payload: {
        indexFolder,
        files
    }
})
export const deleteClientFile = (indexFolder, indexFile) => ({
    type: actions.REMOVE_CLIENTFILE,
    payload: {
        indexFolder,
        indexFile
    }
})
export const deleteClientDocument = id => ({
    type: actions.REMOVE_CLIENTDOCUMENTS,
    payload: {
        id
    }
})

export const addMyDocument = (pathFile, nameFile, docType) => ({
    type: actions.ADD_MYDOCUMENT,
    payload: {
        pathFile,
        nameFile,
        docType
    }
})
export const deleteMyDocument = (id) => ({
    type: actions.REMOVE_MYDOCUMENT,
    payload: {
        id
    }
})

export const addMyPhoto = (nameFolder, files) => ({
    type: actions.ADD_MYPHOTO,
    payload: {
        nameFolder,
        files
    }
})
export const updateMyPhoto = (indexFolder, file) => ({
    type: actions.UPDATE_MYPHOTO,
    payload: {
        indexFolder,
        file
    }
})
export const removeMyPhoto = (indexFolder, indexFile) => ({
    type: actions.REMOVE_MYPHOTO,
    payload: {
        indexFolder,
        indexFile
    }
})

export const deleteFolder = (id) => ({
    type: actions.REMOVE_FOLDER,
    payload: {
        id
    }
})