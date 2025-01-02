

export const types ={
    
    login: '[Auth] Login',
    logout: '[Auth] Logout',

    // States del uiState

    uiSetError : '[UI] Set Error',
    uiRemoveError : '[UI] Remove Error',

    // Bloquear Boton Login hasta la respuesta de la API (Para este caso fireBase)

    uiStartLoading: '[UI] Start loading',
    uiFinishLoading: '[UI] Finish loading',

    // Acciones para el manejo de las notas  ( noteReducer)
    notesAddNew:' [Notes] New note',
    notesActive:' [Notes] Set active note',
    notesload:' [Notes] load note',
    notesUpdated:' [Notes] Update note ',
    notesFileUrl:' [Notes] Update image Url',
    notesDelete:' [Notes] Delete note',
    noteslogoutCleaning:' [Notes] Logout note',
}