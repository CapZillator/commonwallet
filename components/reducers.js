import { LOAD_EVENT, SET_EVENT, SET_LANG, SET_CURRENCY, SET_CHILD_EVENT, ADD_EVENT, ADD_CHILD_EVENT, DEL_EVENT, DEL_CHILD_EVENT } from './types';

let events = [];
let idCounter = 1;
let lang = 'ru';
let globalCurrency = '₽';

const initialState = {
    events: events,
    idCounter: idCounter,
    lang: lang,
    globalCurrency: globalCurrency
};

function applyLoadEvent(state, list, counter){
    events = list;
    idCounter = counter + 1;
    return {
        ...state,
        events: events,
        idCounter: idCounter
    };
}
function applyAddEvent(state, data){
    events.push(data);
    idCounter = idCounter + 1;
    return {
        ...state,
        events: events,
        idCounter: idCounter
    };
}
function applySetLang(state, data){
    lang = data;
    return {
        ...state,
        lang: lang
    };
}
function applySetCurrency(state, data){
    globalCurrency = data;
    return {
        ...state,
        globalCurrency: globalCurrency
    };
}
function applySetEvent(state, data){
    let tempEvents = events.slice(0);
    let index = -1;
    tempEvents.forEach((el, i) => {
        if (el.id === data.id) index = i;
    });
    if (index >= 0) {
        tempEvents[index] = data;
        events = tempEvents;
    };    
    return {
        ...state,
        events: events
    };
}
function applyAddChildEvent(state, data, parent){
    let tempEvents = events.slice(0);
    let index = -1;
    tempEvents.forEach((el, i) => {
        if (el.id === parent) index = i;
    });
    if (index >= 0) {
        tempEvents[index].eventsList.push(data);
        events = tempEvents;
        idCounter = idCounter + 1;
    };    
    return {
        ...state,
        events: events,
        idCounter: idCounter
    };
}
function applySetChildEvent(state, data, parent){
    let tempEvents = events.slice(0);
    let index = -1;
    tempEvents.forEach((el, i) => {
        if (el.id === parent) index = i;
    });
    if (index >= 0) {
        let childIndex;
        tempEvents[index].eventsList.forEach((el, i) => {
            if (el.id === data.id) childIndex = i;
        });
        if (childIndex >= 0) {
            tempEvents[index].eventsList[childIndex] = data;
            events = tempEvents;
        };
    };    
    return {
        ...state,
        events: events
    };
}
function applyDelEvent(state, id){
    let tempEvents = events.slice(0);
    let index = -1;
    tempEvents.forEach((el, i) => {
        if (el.id === id) index = i;
    });
    if (index >= 0) {
        tempEvents.splice(index, 1);
        events = tempEvents;
    };    
    return {
        ...state,
        events: events
    };
}

function applyDelChildEvent(state, id, parent){
    let tempEvents = events.slice(0);
    let index = -1;
    tempEvents.forEach((el, i) => {
        if (el.id === parent) index = i;
    });
    if (index >= 0) {
        let childIndex;
        tempEvents[index].eventsList.forEach((el, i) => {
            if (el.id === id) childIndex = i;
        });
        if (childIndex >= 0) {
            tempEvents[index].eventsList.splice(childIndex, 1);
            events = tempEvents;
        };
    };    
    return {
        ...state,
        events: events
    };
}
function reducer( state = initialState, action){
    switch (action.type){
        case LOAD_EVENT: return applyLoadEvent(state, action.list, action.counter);
        case ADD_EVENT: return applyAddEvent(state, action.data);
        case SET_EVENT: return applySetEvent(state, action.data);
        case SET_LANG: return applySetLang(state, action.data);
        case SET_CURRENCY: return applySetCurrency(state, action.data);
        case DEL_EVENT: return applyDelEvent(state, action.id);
        case ADD_CHILD_EVENT: return applyAddChildEvent(state, action.data, action.parent);
        case SET_CHILD_EVENT: return applySetChildEvent(state, action.data, action.parent);
        case DEL_CHILD_EVENT: return applyDelChildEvent(state, action.id, action.parent);
        default: return state;
    }
}
export default reducer;