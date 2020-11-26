import { LOAD_EVENT, SET_EVENT, SET_LANG, SET_CURRENCY, DEL_EVENT, SET_CHILD_EVENT, ADD_EVENT, ADD_CHILD_EVENT, DEL_CHILD_EVENT } from './types';

function loadEvent(list, counter){
    return {
        type: LOAD_EVENT,
        list: list,
        counter: counter
    };
}
function addEvent(data){
    return {
        type: ADD_EVENT,
        data: data
    };
}
function setEvent(data){
    return {
        type: SET_EVENT,
        data: data
    };
}
function setLang(data){SET_CURRENCY
    return {
        type: SET_LANG,
        data: data
    };
}
function setCurrency(data){
    return {
        type: SET_CURRENCY,
        data: data
    };
}
function delEvent(id){
    return {
        type: DEL_EVENT,
        id: id
    };
}
function addChildEvent(data, parent){
    return {
        type: ADD_CHILD_EVENT,
        data: data,
        parent: parent
    };
}
function setChildEvent(data, parent){
    return {
        type: SET_CHILD_EVENT,
        data: data,
        parent: parent
    };
}
function delChildEvent(id, parent){
    return {
        type: DEL_CHILD_EVENT,
        id: id,
        parent: parent
    };
}
const actionCreators = {
    loadEvent, 
    addEvent, 
    setEvent,
    setLang,
    setCurrency,
    delEvent,
    addChildEvent,
    setChildEvent,
    delChildEvent
};
export { actionCreators };