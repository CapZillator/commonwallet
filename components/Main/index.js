import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Pressable, Switch, Alert, ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import Svg, { Polygon, Rect, Circle, Path } from 'react-native-svg';
import { bindActionCreators } from 'redux';
import { actionCreators as actions } from './../actions';
import { NavigationContainer, NavigationActions, CommonActions, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-community/async-storage';
import RNPickerSelect from 'react-native-picker-select';
import LanguageManager from './../LanguageManager';
import CurrencyManager from './../CurrencyManager';
import StylesManager from './../StylesManager';
import SvgManager from './../SvgManager';

const styles = StyleSheet.create(StylesManager());//Подключаем стили 
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const langPack = LanguageManager();//Подключаем языки
const currencies = CurrencyManager();//Подключаем валюту
const graphics = SvgManager();

const MyTextInput = ({ name, onChange, onEndEditing }) => {
  return (
    <TextInput style={styles.input}
      onChangeText={value => onChange({ name, value })}
      onEndEditing={() => onEndEditing()}
      keyboardType={'decimal-pad'}
    />
  );
};
const MyCurrencyInput = ({ name, onChange}) => {
  return (
    <TextInput style={styles.inputCurrency}
      onChangeText={value => onChange({ name, value })}
      keyboardType={'decimal-pad'}
    />
  );
};
const MyDelButton = ({ style, name, onPress }) => {
  const icon = style === "dark" ? graphics.delDarkIcon: graphics.delWhiteIcon;
  return (
    <Pressable onPress={() => onPress({ name })}>
      {icon}
    </Pressable>
  );
};
const MyClearDebtButton = ({ name, onPress }) => {
  return (
    <Pressable onPress={() => onPress({ name })}>
      {graphics.debtorIcon}
    </Pressable>
  );
};
function convertStringToFloat(string){//Получаем записанные в строку числа и суммируем их
  let temp_sum = string.trim();
  temp_sum = temp_sum.split(/\s+/);
  let sum = 0;
  temp_sum.forEach(el => {
    let val = el.replace(/[,\.]+/, ".");
    val = parseFloat(val);
    if (val < 0) val = val * -1;
    sum += val;      
  });
  sum = Math.round(sum * 100) / 100;
  if (isNaN(sum)) sum = 0; 
  return sum;
}

//Экран-агрегатор всех событий (простых и составных)
function EventsManager({ events, lang, delEvent, navigation }) {
  let selectedLang = langPack.find(l => l.code === lang);
  if (!selectedLang) selectedLang = langPack[0];
  const onDelHandler = (id) => {//Удаляет событие из массива
    delEvent(id);//Удаляем из redux
    //Удаляем и обновляем AsyncStorage
    let evList = events.slice();
    let delIndex = -1;
    evList.forEach((el, i) => {
        if (el.id === id) delIndex = i;
    });
    if (delIndex > 0) {
      evList.splice(delIndex, 1);
      AsyncStorage.setItem('events', JSON.stringify(evList));
    };
  };
  const onDelEventClick = (value) => {//Обрабатывает нажатие по кнопке удалить
    const id = value.name;
    Alert.alert(
      selectedLang.alerts.delEvent.title,
      selectedLang.alerts.delEvent.message,
      [
        { text: selectedLang.buttons.submit, onPress: () => onDelHandler(id) },
        {
          text: selectedLang.buttons.cancel,
          style: "cancel"
        }        
      ],
      { cancelable: false }
    );
  };
  let eventsList;
  if (events && events.length > 0) eventsList = events.map((el, i) => {
    let title = el.name;
    title = title.length > 20 ? `${title.substring(0, 20).trim()}...`: title;
    if (el.type !== 2){
      let d = new Date(el.date);
      let month = ((d.getMonth() + 1) > 10) ? d.getMonth() + 1: `0${d.getMonth() + 1}`;
      const date = `${d.getDate()}.${month}.${d.getFullYear()}`;
      return <View key={i} style={styles.eventWrapper}> 
                <View style={styles.marginRightElement}>
                  {graphics.singleEventIcon}
                </View>
                <Pressable style={styles.blockRowContainer} onPress={() => navigation.navigate('Simple event', { isNew: false, ischild: false, eventID: el.id, title: el.name })}>
                  <View style={styles.marginRightElement}>
                    <Text style={styles.eventHeader}>{title}</Text>
                    <Text style={styles.eventText}>{date}</Text>
                  </View> 
                </Pressable>               
              <MyDelButton style="white" name={el.id} onPress={onDelEventClick} /></View>;
    }
    else {
      return <View key={i} style={styles.eventWrapper}> 
                <View style={styles.marginRightElement}>
                  {graphics.compoundEventIcon}
                </View>
                <Pressable style={styles.blockRowContainer} onPress={() => navigation.navigate('Global event', { eventID: el.id, title: el.name })}>
                  <View style={styles.marginRightElement}>
                    <Text style={styles.eventHeader}>{title}</Text>
                  </View>
                </Pressable>
              <MyDelButton style="white" name={el.id} onPress={onDelEventClick} /></View>;
    };
  });
  else eventsList = <Text style={styles.emptyListText}>{selectedLang.emptyList}</Text>;
  return (
    <View style={styles.listContainer}>
      <ScrollView style={styles.scrollView}>{eventsList}</ScrollView> 
      <View style={styles.buttonsContainer}>
      <Pressable onPress={() => navigation.navigate('Set Global event', { title: selectedLang.newEvent })}>
          {graphics.newCompoundIcon}
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Simple event', { isNew: true, ischild: false, title: selectedLang.newEvent })}>
          {graphics.newSimpleIcon}
        </Pressable>
      </View>
    </View>
  );
}

//Экран простого (одиночного) события
function SimpleEvent({ events, lang, globalCurrency, addEvent, addChildEvent, setEvent, setChildEvent, idCounter, route, navigation }) {
  let selectedLang = langPack.find(l => l.code === lang);
  if (!selectedLang) selectedLang = langPack[0];
  let initCurrency = currencies[0].value; 
  let initCurrencyPlaceholder = currencies[0];
  let cur = currencies.find(c => c.label === globalCurrency);
  if (cur){
    initCurrency = cur.value;
    initCurrencyPlaceholder = cur;
  };
  const id = route.params.isNew ? idCounter: route.params.eventID;
  let currentDate = new Date();
  let initHeader = selectedLang.eventPlaceholder;
  let initMembers = [];
  let initTotalTips = 0;
  let initTipsPerPerson = 0;
  let initWhoPay;
  let type = 1;
  if (route.params.isNew){
    if (route.params.isChild) {
      type = 3;
      let parentEvent = events.find(el => el.id === route.params.parentID);
      if (parentEvent) {
        parentEvent.members.forEach(el => initMembers.push({name: el.name, balance: 0, temp: 0}));
        initCurrency = parentEvent.currency;
        initCurrencyPlaceholder = {label: parentEvent.currency, value: parentEvent.currency};
        initWhoPay = initMembers[0].name;
      }
    };
  }
  else {
    let evFromStorage;
    if (route.params.isChild) {
      type = 3;
      let parentEvent = events.find(el => el.id === route.params.parentID);
      if (parentEvent) {
        evFromStorage = parentEvent.eventsList.find(el => el.id === route.params.eventID);
      };
    }
    else {
      evFromStorage = events.find(ev => ev.id === route.params.eventID);
    };
    if (evFromStorage) {
      initHeader = evFromStorage.name;
      initMembers = evFromStorage.members;
      currentDate = new Date(evFromStorage.date);
      initCurrency = evFromStorage.currency;
      initTotalTips = Math.round((evFromStorage.tipsPerPerson * evFromStorage.members.length) * 100) / 100;
      initTipsPerPerson = evFromStorage.tipsPerPerson;
      initWhoPay = evFromStorage.whoPay;
      initCurrencyPlaceholder = {label: evFromStorage.currency, value: evFromStorage.currency};
    };
  };
  const [header, onChangeHeader] = useState(initHeader);
  const [newMember, onChangeNewMemberName] = useState(selectedLang.newMemberHeader);
  const [members, onChangeMembers] = useState(initMembers);
  const [date, onChangeDate] = useState(currentDate);
  const [showDatePicker, onChangeDatePickerVisibility] = useState(false);
  const [currency, onChangeCurrency] = useState(initCurrency);
  const [nowEditing, onChangeNowEditing] = useState();
  const [totalTips, onChangeTotalTips] = useState(initTotalTips);
  const [personTips, onChangePersonTips] = useState(initTipsPerPerson);
  const [whoPay, onChangeWhoPay] = useState(initWhoPay);
  const [splitEqually, onChangeSplit] = useState(false);
  const [stateString, onChangeStateString] = useState();//Строка состояния - отображает предупреждения
  const [stateStringType, onChangeStateStringType] = useState();//Тип предупреждения
  let dateFromState = new Date(date);
  let month = currentDate.getMonth() + 1;
  month = month < 10 ? `0${month}`: month;
  dateFromState = `${dateFromState.getDate()}.${month}.${dateFromState.getFullYear()}`;
  const onChangeName = (value) => {//Обработчик, добавляющий новое имя в соответствующую state переменную
    let name = value.length > 15 ? value.substring(0, 15): value;
    onChangeNewMemberName(name);
  };
  const onAddNewMemberClick = () => {//Добавляет нового участника в список
    const isNameExist = members.find(member => member.name === newMember);
    if (newMember && newMember.length > 0) {
      if (!isNameExist){
        onChangeMembers(members => members.concat([{name: newMember, balance: 0, temp: 0, isDebtor: false}]));
        onChangeNewMemberName("");
        if (members.length === 0) onChangeWhoPay(newMember);
        if (stateStringType === "nameAlert"){
          onChangeStateString("");
          onChangeStateStringType(null);
        };
      }
      else {
        onChangeStateString(`${selectedLang.stateString.notUnicName}!`);
        onChangeStateStringType("nameAlert");
      };
    }
    else {
      onChangeStateString(`${selectedLang.stateString.tooShortName}!`);
      onChangeStateStringType("nameAlert");
    };
  };
  const changePickerVisibility = () => {
    onChangeDatePickerVisibility(true);
  };
  const onChangeDatePicker = (event, selectedDate) => {
    const newDate = selectedDate || date;
    const visibilityState = showDatePicker ? false: true;
    onChangeDatePickerVisibility(visibilityState);
    onChangeDate(newDate);
  };
  const onChangeMemberBalance = (event) => {
    const {name, value} = event;
    let membersList = members.slice();
    let newValue = membersList.find(item => item.name === name);
    if (newValue) {
      newValue.temp = value;
      onChangeMembers(membersList);
      onChangeNowEditing(newValue.name);
    };
  };
  const onEndEditingMemberBalance = () => {
    let membersList = members.slice();
    let newValue = membersList.find(item => item.name === nowEditing);
    if (newValue) {
      let sum = convertStringToFloat(newValue.temp);
      newValue.temp = 0;
      newValue.balance = sum;
      if (sum > 0 && newValue.name !== whoPay) newValue.isDebtor = true;
      if (totalTips > 0) onEndEditingTips();//Пересчитываем чаевые на человека
      onChangeMembers(membersList);
      onChangeNowEditing("");
    };
  };
  const onChangeTips = (value) => {
    let tips = convertStringToFloat(value);
    onChangeTotalTips(tips);
  };
  const onEndEditingTips = () => {
    if (splitEqually){
      let tempMembers = members.slice(0);
      const newBalance = Math.round((totalTips / tempMembers.length) * 100) / 100;
      tempMembers.forEach(el => el.balance = newBalance);
      onChangeMembers(tempMembers);
      onChangeTotalTips(0);
      onChangePersonTips(0);
    }
    else {
      let count = 0;
      members.forEach(el => {
        if (el.balance > 0) count = count + 1;
      });
      if (count > 0) {
        const tipsPerPerson = Math.round((totalTips / count) * 100) / 100;
        onChangePersonTips(tipsPerPerson);
      };
    };
  };
  const onSaveEventClick = () => {//Отправляем событие в хранилище redux & asyncstorage
    if (header && header.length > 1){
      const eventObject = {name: header, id: id, date: date, type: type, members: members, tipsPerPerson: personTips, whoPay: whoPay, currency: currency};
      let evList = events.slice();//Массив всех событий
      if (type !== 3){//Если не является дочерним (тип не равен 3)
        evList.push(eventObject);
        if (route.params.isNew) {//Если это новое событие
          addEvent(eventObject);
        }
        else setEvent(eventObject);
      } 
      else {
        if (route.params.isNew) {
          addChildEvent(eventObject, route.params.parentID);
        }
        else {
          setChildEvent(eventObject, route.params.parentID);
        }; 
        let parentEv = evList.find(e => e.id === route.params.parentID);
        if (parentEv) {
          let thisEv = parentEv.eventsList.find(p => p.id === id);
          if (thisEv) thisEv = eventObject;
          else parentEv.eventsList.push(eventObject);
        };
      }
      AsyncStorage.setItem('events', JSON.stringify(evList));
      AsyncStorage.setItem('counter', JSON.stringify({value: idCounter}));
      navigation.goBack();
    }
    else {
      onChangeStateString(`${selectedLang.stateString.tooShortHeader}!`);
      onChangeStateStringType("headerAlert");
    };
    
  };
  const onDelPress = (value) => {//Удаляет участника
    let newMembersList = members;
    let index = -1;
    newMembersList.forEach((el, i) => {
      if (el.name === value.name) index = i;
    });
    if (index >= 0){
      onChangeStateString(`${value.name} ${selectedLang.stateString.delMember}.`);
      onChangeStateStringType("delMember");
      newMembersList.splice(index, 1);//Удаляем человека из списка
      const count = newMembersList.length;
      if (splitEqually){
        if (count > 0) {
          let newSum = Math.round(((count + 1) * newMembersList[0].balance / count) * 100) / 100;
          newMembersList.forEach(el => el.balance = newSum);
          onChangeWhoPay(newMembersList[0].name);
        }
        else onChangeWhoPay(null);
      }
      else {
        if (count > 0){//Пересчитываем чаевые на человека
          const tipsPerPerson = Math.round((totalTips / count) * 100) / 100;
          onChangePersonTips(tipsPerPerson);
          onChangeWhoPay(newMembersList[0].name);
        }
        else onChangeWhoPay(null);
      };
      onChangeMembers(newMembersList);
    };
  };
  const toggleSwitch = () => {
    let tempMembers = members.slice(0);
    if (!splitEqually){
      const newBalance = Math.round((totalTips / tempMembers.length) * 100) / 100;
      tempMembers.forEach(el => {
        el.balance = newBalance;
        if (el.name === whoPay) el.isDebtor = false;
        else el.isDebtor = true;
      });
    }
    else tempMembers.forEach(el => el.balance = 0);
    onChangeMembers(tempMembers);
    onChangeSplit(previousState => !previousState);
  };
  const onClearDebtPress = (value) => {//Обработчик нажатия на кнопку списания долга
    const name = value.name;
    //Диалоговое окно с просьбой подтвердить операцию
    Alert.alert(
      selectedLang.alerts.clearDebt.title,
      selectedLang.alerts.clearDebt.message,
      [
        { text: selectedLang.buttons.submit, onPress: () => onClearDebtSubmit(name) },
        {
          text: selectedLang.buttons.cancel,
          style: "cancel"
        }        
      ],
      { cancelable: false }
    );
  };
  const onClearDebtSubmit = (name) => {//Списываем долг конкретного участника
    let tempMembers = members.slice(0);
    const member = tempMembers.find(el => el.name === name);
    if (member) {
      member.isDebtor = false;
      onChangeMembers(tempMembers);
      onChangeStateString(`${name}: ${selectedLang.stateString.clearDebt}.`);
      onChangeStateStringType("clearDebt");
    }
  };
  const onEndHedaerEditing = () => {
    if (header && header.length > 1){
      if (stateStringType === "headerAlert"){
        onChangeStateString("");
        onChangeStateStringType(null);
      };
    }
    else {
      onChangeStateString(`${selectedLang.stateString.tooShortHeader}!`);
      onChangeStateStringType("headerAlert");
    };
  };
  const onChangeWhoPayPress = (value) => {
    let tempMembers = members.slice(0);
    tempMembers.forEach(el => {
      if (el.name === value) el.isDebtor = false;
      else el.isDebtor = true;
    });
    onChangeWhoPay(value);
    onChangeMembers(tempMembers);
  };
  let totalSum = 0;//Итого потрачено
  let debtSum = 0;//Остальные должны
  let tipsSum = totalTips;
  let inputList, whoPaidPicker, resultBlock, sendButton, addNewMemberBlock, splitSwitch, 
  tipsBlock, stateBlock, commonExpensisResult, commonExpensisInput;//Элементы, которые будут отрисованы по условию
  if (stateString && stateString.length > 0) stateBlock = <View style={styles.stateBlock}><Text style={styles.boldText}>{stateString}</Text></View>;
  if (type === 3 && route.params.isNew) splitSwitch = <View style={styles.inrow}>
    <View style={styles.marginRightElement}>
      <Text style={styles.mediumText}>{selectedLang.splitEqually}</Text>
    </View>
    <Switch
      trackColor={{ false: "#757575", true: "#669999" }}
      thumbColor={splitEqually ? "#99CCCC" : "#CCCCCC"}
      onValueChange={toggleSwitch}
      value={splitEqually}
    />
  </View>;
  if (members && members.length > 0) {
    const whoPaidData = [];
    members.forEach((el) => {
      whoPaidData.push({label: el.name, value: el.name});
      totalSum = totalSum + el.balance;
      if (el.name !== whoPay && el.isDebtor) {
        if (splitEqually) debtSum = debtSum + el.balance;
        else if (!splitEqually && el.balance > 0) debtSum = debtSum + el.balance + personTips;
      };
    });
    inputList = members.map((el ,i) => {
      let sum, inputBlock, delButton, clearDebtButton;
      if (route.params.isNew) {//Если новое событие - отобразить компоненты
        delButton = <MyDelButton style="dark" name={el.name} onPress={onDelPress}/>;
        if (!splitEqually) {
          sum = el.balance > 0 ? Math.round((el.balance + personTips) * 100) / 100 : 0;
          inputBlock = <MyTextInput
            name={el.name}
            onChange={onChangeMemberBalance}
            onEndEditing={onEndEditingMemberBalance} 
        />;
        }
        else {
          sum = Math.round(el.balance  * 100) / 100;
        };
        whoPaidPicker = <View style={styles.blockRowContainer}>
          <View style={styles.marginElement}>
            <Text style={styles.mediumText}>{selectedLang.whoPayTitle}</Text>
          </View> 
          <View style={styles.marginElement}>
            <RNPickerSelect
              onValueChange={onChangeWhoPayPress}
              items={whoPaidData}
              placeholder={whoPaidData[0]}
              useNativeAndroidPickerStyle={false}
              style={styles}
            />
          </View>
        </View>;
      }
      else {
        if (el.isDebtor) clearDebtButton = <MyClearDebtButton name={el.name} onPress={onClearDebtPress}/>;
        else clearDebtButton = graphics.noDebtIcon;
        sum = el.balance > 0 ? Math.round((el.balance + personTips) * 100) / 100 : 0;
      };      
      return  <View key={i} style={styles.inrow}>
                <View style={styles.nameBlock}><Text style={styles.mediumText}>{el.name}</Text></View>
                {inputBlock}
                <View style={styles.sumBlock}><Text style={styles.mediumText}>{sum} {currency}</Text></View>
                {delButton}
                {clearDebtButton}
              </View>;
    });
    if (splitEqually) {
      totalSum = Math.round(totalSum  * 100) / 100;
      tipsSum = totalSum;
    }
    else totalSum = Math.round((totalSum + totalTips) * 100) / 100;
    debtSum = Math.round(debtSum * 100) / 100;
    resultBlock = <Text style={styles.eventText}>{selectedLang.whoPay} {whoPay}, {selectedLang.debtDesc} {debtSum} {currency}</Text>;
  };
  let dtPicker, currencyPicker, headerBlock;
  let dateBlock = <View style={styles.blockRowContainer}>
    <View style={styles.marginRightElement}>
      {graphics.calendarIcon}
    </View>
  <Text style={styles.dateText}>{dateFromState}</Text>
  </View>;
  if (showDatePicker) dtPicker = <DateTimePicker  value={date}  mode="date"  is24Hour={true}  display="default"  onChange={onChangeDatePicker} />;
  commonExpensisResult = <Text style={styles.eventText}>{selectedLang.includingTips} {tipsSum} {currency}</Text>;
  let dateCurrencyIdBlock = <View style={styles.inrowSpaceAround}>
    <View style={styles.marginElement}>
      <View style={styles.blockRowContainer}>
        <Text style={styles.darkHeaderText}>ID# </Text>
        <Text style={styles.dateText}>{id}</Text>
      </View>
    </View> 
    <View style={styles.marginElement}>
      {dateBlock} 
    </View>
  </View>;
  let resultLegend = <View style={styles.inrow}>
    <View style={styles.blockRowContainer}>
      {graphics.noDebtIcon}
      <Text style={styles.legendText}>{selectedLang.clearMan}</Text>
    </View>
    <View style={styles.blockRowContainer}>
      {graphics.debtorIcon}
      <Text style={styles.legendText}>{selectedLang.debtorMan}</Text>
    </View>
  </View>;
  if (route.params.isNew) {
    resultLegend = null;
    commonExpensisResult = null;
    if (type !== 3) addNewMemberBlock = <View style={styles.blockRowContainer}>
      <View style={styles.marginElement}>
        <TextInput style={styles.input} 
          onChangeText={onChangeName} 
          value={newMember} 
          onFocus={() => onChangeNewMemberName('')}
        />
      </View>
      <TouchableOpacity
        style={styles.darkButton}
        onPress={onAddNewMemberClick}
      >
        <Text style={styles.darkButtonText}>{selectedLang.buttons.add}</Text>
      </TouchableOpacity>
    </View>;
    tipsBlock = <View style={styles.marginRightElement}>
      <TextInput style={styles.input}
        onChangeText={onChangeTips}
        onEndEditing={onEndEditingTips}
        keyboardType={'decimal-pad'}
      />
    </View>;
    currencyPicker = <RNPickerSelect
      onValueChange={(value) => onChangeCurrency(value)}
      items={currencies}
      placeholder={initCurrencyPlaceholder}
      style={styles}
      useNativeAndroidPickerStyle={false}
    />;
    headerBlock = <TextInput 
      style={styles.inputHeader} 
      onChangeText={(val) => onChangeHeader(val)} 
      value={header} 
      onFocus={() => onChangeHeader('')}
      onEndEditing={onEndHedaerEditing}
    />;
    dateBlock = <Pressable onPress={changePickerVisibility}> 
      <View style={styles.blockRowContainer}> 
        <View style={styles.marginRightElement}>
          {graphics.calendarIcon}
        </View>
        <Text style={styles.dateText}>{dateFromState}</Text>
      </View>
    </Pressable>;
    commonExpensisInput = <View style={styles.blockContainer}>
      <Text style={styles.mediumText}>{selectedLang.tips}</Text>
      <View style={styles.blockRowContainer}>
        {tipsBlock}
        <Text style={styles.mediumText}>{tipsSum} {currency}</Text>
      </View>
    </View>;
    dateCurrencyIdBlock = <View style={styles.blockRowContainer}>
      <View style={styles.marginElement}>
        {dateBlock}
        {dtPicker} 
      </View>        
      <View style={styles.marginElement}>
        {currencyPicker} 
      </View> 
    </View>;
  };
  if ((type === 3 && members && members.length > 0) || (type !== 3 && members && members.length > 1)) {
    sendButton =  <TouchableHighlight style={styles.whiteButton} underlayColor="#ccffff" onPress={onSaveEventClick}>
      <Text style={styles.whiteButtonText}>{selectedLang.buttons.save}</Text>
    </TouchableHighlight>;
  };
  return (
    <View style={styles.singleContainer}>
      {stateBlock}
      <View style={styles.blockContainer}>
        {headerBlock}
      </View>
      {dateCurrencyIdBlock}
      <View style={styles.blockContainer}>
        {addNewMemberBlock}
        {splitSwitch}
      </View>
      <ScrollView>
        {inputList}        
      </ScrollView>
      {resultLegend}
      {commonExpensisInput}
      <View style={styles.blockContainer}>
        {whoPaidPicker}
      </View>
      <View style={styles.blockBottomContainer}>
        <Text style={styles.eventText}>{selectedLang.totalSum} {totalSum} {currency}</Text>
        {commonExpensisResult}
        {resultBlock}
        {sendButton}
      </View>
    </View>
  );
}

//Экран нового составного (глобального) события
function SetGlobalEvent({ lang, globalCurrency, events, addEvent, idCounter, navigation }) {
  let selectedLang = langPack.find(l => l.code === lang);
  if (!selectedLang) selectedLang = langPack[0];
  let initCurrency = currencies.find(c => c.label === globalCurrency);
  if (!initCurrency) initCurrency = currencies[0];
  let id = idCounter;
  const [header, onChangeHeader] = useState(selectedLang.eventPlaceholder);
  const [currency, onChangeCurrency] = useState(initCurrency.value);
  const [newMember, onChangeNewMemberName] = useState(selectedLang.newMemberHeader);
  const [members, onChangeMembers] = useState([]);
  const [stateString, onChangeStateString] = useState();//Строка состояния - отображает предупреждения
  const [stateStringType, onChangeStateStringType] = useState();//Тип предупреждения
  const onChangeName = (value) => {//Обработчик, добавляющий новое имя в соответствующую state переменную
    let name = value.length > 15 ? value.substring(0, 15): value;
    onChangeNewMemberName(name);
  };
  const onAddNewMemberClick = () => {//Добавляет нового пользователя, если имя уникально
    const isNameExist = members.find(member => member.name === newMember);
    if (newMember && newMember.length > 0) {
      if (!isNameExist){
        onChangeMembers(members => members.concat([{name: newMember}]));
        onChangeNewMemberName("");
        if (stateStringType === "nameAlert"){
          onChangeStateString("");
          onChangeStateStringType(null);
        };        
      }
      else {
        onChangeStateString(`${selectedLang.stateString.notUnicName}!`);
        onChangeStateStringType("nameAlert");
      };
    }
    else {
      onChangeStateString(`${selectedLang.stateString.tooShortName}!`);
      onChangeStateStringType("nameAlert");
    };
  };
  const onDelPress = (value) => {//Удаляет участника
    let newMembersList = members;
    let index = -1;
    newMembersList.forEach((el, i) => {
      if (el.name === value.name) index = i;
    });
    if (index >= 0){
      onChangeStateString(`${value.name} ${selectedLang.stateString.delMember}.`);
      onChangeStateStringType("delMember");
      newMembersList.splice(index, 1);//Удаляем человека из списка
      onChangeMembers(newMembersList);
    };
  };
  const onSetGlobalEvent = () => {//Отправляет данные в хранилище redux & asyncstorage
    if (header && header.length > 1){
      const eventObject = {name: header, id: id, type: 2, members: members, eventsList: [], currency: currency};
      let evList = events.slice();
      evList.push(eventObject);
      addEvent(eventObject);
      AsyncStorage.setItem('events', JSON.stringify(evList));
      AsyncStorage.setItem('counter', JSON.stringify({value: idCounter}));
      navigation.navigate('Global event', {eventID: id, title: header});
    }
    else {
      onChangeStateString(`${selectedLang.stateString.tooShortHeader}!`);
      onChangeStateStringType("headerAlert"); 
    }
  };
  const onEndEditHeader = () => {
    if (header && header.length < 2) {
      onChangeStateString(`${selectedLang.stateString.tooShortHeader}!`); 
      onChangeStateStringType("headerAlert");
    }
    else if (header && header.length > 1 && stateStringType === "headerAlert") {
      onChangeStateString('');
      onChangeStateStringType(null);
    };
  };
  let inputList, submitButton, alertBlock;
  if (members && members.length > 0) {
    inputList = members.map((el ,i) => {
      return  <View key={i} style={styles.inrow}>
                <Text style={styles.mediumText}>{el.name}</Text>
                <MyDelButton style="dark" name={el.name} onPress={onDelPress}/>
              </View>;
      });
  };
  if (members && members.length > 1) {
    submitButton = <TouchableOpacity
        style={styles.darkButton}
        onPress={onSetGlobalEvent}
      >
        <Text style={styles.darkButtonText}>{selectedLang.buttons.save}</Text>
      </TouchableOpacity>;
  };
  if (stateString && stateString.length > 0) alertBlock = <View style={styles.stateBlock}><Text style={styles.boldText}>{stateString}</Text></View>;
  return (
    <View style={styles.singleContainer}>
      {alertBlock}
      <View style={styles.blockContainer}>
        <TextInput 
          style={styles.inputHeader} 
          onChangeText={(val) => onChangeHeader(val)} 
          value={header} 
          onFocus={() => onChangeHeader('')}
          onEndEditing={onEndEditHeader}
        />
      </View>
      <View style={styles.blockRowContainer}>
        <View style={styles.marginElement}>
          <Text style={styles.mediumText}>{selectedLang.defaultCurrency}</Text> 
        </View> 
        <View style={styles.marginElement}>
          <RNPickerSelect
            onValueChange={(value) => onChangeCurrency(value)}
            items={currencies}
            placeholder={initCurrency}
            style={styles}
            useNativeAndroidPickerStyle={false}
          /> 
        </View>         
      </View>
      <View style={styles.blockRowContainer}>
        <View style={styles.marginElement}>
          <TextInput 
            style={styles.input} 
            onChangeText={onChangeName} 
            value={newMember} onFocus={() => onChangeNewMemberName('')}
          />
        </View> 
        <TouchableOpacity
          style={styles.darkButton}
          onPress={onAddNewMemberClick}
        >
          <Text style={styles.darkButtonText}>{selectedLang.buttons.add}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {inputList}
      </ScrollView>
      <View style={styles.blockContainer}> 
        {submitButton}
      </View>
    </View>
  );
}

//Экран составного (глобального) события. Состоит из списка простых событий
function GlobalEvent({ events, lang, route, delChildEvent, navigation }) {
  //navigation.setOptions({ headerRight: () => <Pressable onPress={() => navigation.popToTop()}><Text>Main</Text></Pressable> });
  let selectedLang = langPack.find(l => l.code === lang);
  if (!selectedLang) selectedLang = langPack[0];
  const selfID = route.params.eventID; 
  const onNewSimpleEventPress = () => {
    navigation.navigate('Simple event', { isNew: true, isChild: true, parentID: selfID, title: selectedLang.newEvent });
  };
  const onShowResultPress = () => {
    navigation.navigate('Global event result', { eventID: selfID });
  };
  const onDelhandler = (id) => {//Удаляет событие
    delChildEvent(id, selfID);//Удаляем из redux
    //Удаляем и обновляем AsyncStorage
    let evList = events.slice();
    let delIndex = -1;
    let parentEv = evList.find(e => e.id === selfID);
    if (parentEv) {
      parentEv.eventsList.forEach((el, i) => {
        if (el.id === id) delIndex = i;
      });
      if (delIndex > 0)  {
        parentEv.eventsList.splice(delIndex, 1);
        AsyncStorage.setItem('events', JSON.stringify(evList));
      };
    };
    
  };
  const onDelEventClick = (value) => {//Обработчик клика "удалить"
    const id = value.name;
    Alert.alert(
      selectedLang.alerts.delEvent.title,
      selectedLang.alerts.delEvent.message,
      [
        { text: selectedLang.buttons.submit, onPress: () => onDelhandler(id) },
        {
          text: selectedLang.buttons.cancel,
          style: "cancel"
        }        
      ],
      { cancelable: false }
    );
  };
  let thisEvent = events.find(el => el.id === selfID);
  let childEventsList, showResultButton;
  if (thisEvent && thisEvent.eventsList.length > 0) {   
    childEventsList = thisEvent.eventsList.map((el, i) => {
      let d = new Date(el.date);
      let month = ((d.getMonth() + 1) > 10) ? d.getMonth() + 1: `0${d.getMonth() + 1}`;
      const date = `${d.getDate()}.${month}.${d.getFullYear()}`;
      let title = el.name;
      title = title.length > 20 ? `${title.substring(0, 20).trim()}...`: title;
      return <View key={i} style={styles.eventWrapper}>
        <Pressable style={styles.blockRowContainer} onPress={() => navigation.navigate('Simple event', {isNew: false, isChild: true, eventID: el.id, parentID: selfID, title: el.name})}> 
          <View style={styles.marginRightElement}>
            {graphics.singleEventIcon}
          </View>
          <View style={styles.marginRightElement}>
            <Text style={styles.eventHeader}>{title}</Text>
            <Text style={styles.eventText}>{date}</Text>
          </View> 
        </Pressable>
        <MyDelButton style="white" name={el.id} onPress={onDelEventClick} />
      </View>;
    });
    showResultButton = <Pressable onPress={onShowResultPress}>
      {graphics.resultIcon}
    </Pressable>;
  }
  else childEventsList = <Text style={styles.emptyListText}>{selectedLang.emptyList}</Text>;
  
  return (
    <View style={styles.listContainer}>
      <ScrollView>
        {childEventsList}
      </ScrollView>
      <View style={styles.buttonsContainer}>
        {showResultButton}
        <Pressable onPress={onNewSimpleEventPress}>
          {graphics.newSimpleIcon}
        </Pressable>
      </View>        
    </View>
  );
}

//Экран с результатами составного (глобального) события
function GlobalEventResult({ events, lang, setEvent, route, navigation }) {
  let selectedLang = langPack.find(l => l.code === lang);
  if (!selectedLang) selectedLang = langPack[0];
  let initCurrency = currencies[0].label;
  let initResultCurrency = currencies[0].label;
  let initResultCurrencyVal = 1;
  let convertCurrency = [];
  let resultList = [];
  let finalResult = [];
  let spentResultList = [];
  const selfID = route.params.eventID; 
  let thisEvent = events.find(el => el.id === selfID);  
  if (thisEvent && thisEvent.eventsList.length > 0) {
    initResultCurrency = thisEvent.currency;
    let isExistCurrenciesList = false;
    if (thisEvent.results){//Проверяем, есть ли данные этого события в хранилище
      //Присваиваем значения из хранилища
      initResultCurrency = thisEvent.results.currency;
      initResultCurrencyVal = thisEvent.results.currencyValue;
      convertCurrency = thisEvent.results.convertCurrencies;
      isExistCurrenciesList = true;
      convertCurrency.forEach((cur, index) => {//Проверяем массив с курсами валют на предмет присутствия неактуальных данных
        let needToDel = true;
        thisEvent.eventsList.forEach(ev => {
          if (ev.currency === cur.name) needToDel = false;
        });
        if (needToDel) convertCurrency.splice(index, 1);//Удаляем валюту, которая осталась от удаленного события
      });
    };
    initCurrency = thisEvent.currency;
    thisEvent.members.forEach(m => {
      resultList.push({name: m.name, balance: 0});
      spentResultList.push({name: m.name, balance: 0});
    });
    thisEvent.eventsList.forEach(ev => {
      //Проверяем, есть ли у нас валюта события ev в массиве с курсами. 
      if (ev.currency !== initCurrency) {//Добавляем, если нет и если отличается от валюты по-умолчанию.
        const isCurrencyExist = convertCurrency.find(c => c.name === ev.currency);
        if (!isCurrencyExist) convertCurrency.push({name: ev.currency, value: 1});
      };
      ev.members.forEach(m => {
        let tips = ev.tipsPerPerson;
        let balance = m.balance;
        if (isExistCurrenciesList){//Если есть курсы из хранилища, получаем их и пересчитываем события 
          if (thisEvent.currency !== ev.currency) {
            let currencyFromStorage = convertCurrency.find(x => x.name === ev.currency);
            if (currencyFromStorage) {
              tips = tips / currencyFromStorage.value;
              balance = balance / currencyFromStorage.value;
            };
          };
        };
        if (m.isDebtor && m.balance > 0 && m.name !== ev.whoPay) {
          let result = resultList.find(r => r.name === m.name);
          let creditor = resultList.find(c => c.name === ev.whoPay);
          if (result && creditor) {
            result.balance = result.balance - balance - tips;
            creditor.balance = creditor.balance + balance + tips;
          };
        };
        let spentResult = spentResultList.find(w => w.name === m.name);
        if (spentResult && balance > 0) spentResult.balance = spentResult.balance + balance + tips;
      });
    });
    //Считаем, кто кому сколько должен
    let debtorsList = [];
    let creditorsList = [];
    resultList.forEach(el => {
      if (el.balance > 0) creditorsList.push({name: el.name, balance: el.balance});
      else if (el.balance < 0) debtorsList.push({name: el.name, balance: el.balance * -1});
    });
    debtorsList.sort(function (a, b) {
      if (a.balance < b.balance) {
        return 1;
      }
      if (a.balance > b.balance) {
        return -1;
      }
      return 0;
    });
    creditorsList.sort(function (a, b) {
      if (a.balance < b.balance) {
        return 1;
      }
      if (a.balance > b.balance) {
        return -1;
      }
      return 0;
    });
    creditorsList.forEach(c => {
      debtorsList.forEach(d => {
        if (d.balance > 0 && c.balance > 0) {
          if (d.balance === c.balance) {
            let final = finalResult.find(f => f.name === c.name);
            if (final){
              final.who.push({name: d.name, sum: d.balance});
            }
            else finalResult.push({name: c.name, who: [{name: d.name, sum: c.balance}]});
            c.balance = 0;
            d.balance = 0;
          }
          else if (d.balance < c.balance){
            c.balance = c.balance - d.balance;
            let final = finalResult.find(f => f.name === c.name);
            if (final){
            final.who.push({name: d.name, sum: d.balance});
            }
            else finalResult.push({name: c.name, who: [{name: d.name, sum: d.balance}]});
            d.balance = 0;
          }
          else {
            d.balance = d.balance - c.balance;
            let final = finalResult.find(f => f.name === c.name);
            if (final){
              final.who.push({name: d.name, sum: c.balance});
            }
            else finalResult.push({name: c.name, who: [{name: d.name, sum: c.balance}]});
            c.balance = 0;
          };
        };
      });
    });
  };
  const [resultCurrency, onChangeResultCurrency] = useState(initResultCurrency);
  const [currenciesList, onSetCurrenciesList] = useState(convertCurrency);
  const [totalResult, onChangeTotalResult] = useState(spentResultList);//Если подставить resultList, получится баланс дебит/кредит
  const [finalResultList, onChangeFinalResult] = useState(finalResult);
  const [resultCurrencyVal, onChangeResultCurrencyVal] = useState(initResultCurrencyVal);
  const onChangeCurrencyListVal = (value) => {
    let tempList = currenciesList.slice(0);
    let el = tempList.find(c => c.name === value.name);
    if (el) {
      let newVal = value.value.trim();
      newVal = newVal.replace(/[,\.]+/, ".");
      newVal = parseFloat(newVal);
      newVal = Math.round(newVal * 100000) / 100000;
      if (isNaN(newVal) || newVal === 0) newVal = 1;
      el.value = newVal;
      if (el.name === resultCurrency) onChangeResultCurrencyVal(newVal);
      if (thisEvent && thisEvent.eventsList.length > 0) {
        resultList = [];
        spentResultList = [];
        thisEvent.members.forEach(m => {
          resultList.push({name: m.name, balance: 0});
          spentResultList.push({name: m.name, balance: 0});
        });
        thisEvent.eventsList.forEach(ev => {
          const eventCurrency = ev.currency;
          ev.members.forEach(m => {
            let tips = ev.tipsPerPerson;
            let balance = m.balance;
            if (thisEvent.currency !== eventCurrency) {
              let currencyFromStorage = tempList.find(x => x.name === eventCurrency);
              if (currencyFromStorage) {
                tips = tips / currencyFromStorage.value;
                balance = balance / currencyFromStorage.value;
              };
            };
            if (m.isDebtor && m.balance > 0 && m.name !== ev.whoPay) {
              let result = resultList.find(r => r.name === m.name);
              let creditor = resultList.find(c => c.name === ev.whoPay);
              if (result && creditor) {
                result.balance = result.balance - balance - tips;
                creditor.balance = creditor.balance + balance + tips;
              };
            };
            let spentResult = spentResultList.find(w => w.name === m.name);
            if (spentResult && balance > 0) spentResult.balance = spentResult.balance + balance + tips;
          });
        });
        //Считаем, кто кому сколько должен
        let debtorsList = [];
        let creditorsList = [];
        let finalResult = [];
        resultList.forEach(el => {
          if (el.balance > 0) creditorsList.push({name: el.name, balance: el.balance});
          else if (el.balance < 0) debtorsList.push({name: el.name, balance: el.balance * -1});
        });
        debtorsList.sort(function (a, b) {
          if (a.balance < b.balance) {
          return 1;
        }
        if (a.balance > b.balance) {
          return -1;
        }
        return 0;
        });
        creditorsList.sort(function (a, b) {
        if (a.balance < b.balance) {
          return 1;
        }
        if (a.balance > b.balance) {
          return -1;
        }
        return 0;
        });
        creditorsList.forEach(c => {
          debtorsList.forEach(d => {
            if (d.balance > 0 && c.balance > 0) {
              if (d.balance === c.balance) {
                let final = finalResult.find(f => f.name === c.name);
                if (final){
                  final.who.push({name: d.name, sum: d.balance});
                }
                else finalResult.push({name: c.name, who: [{name: d.name, sum: c.balance}]});
                c.balance = 0;
                d.balance = 0;
              }
              else if (d.balance < c.balance){
                c.balance = c.balance - d.balance;
                let final = finalResult.find(f => f.name === c.name);
                if (final){
                  final.who.push({name: d.name, sum: d.balance});
                }
                else finalResult.push({name: c.name, who: [{name: d.name, sum: d.balance}]});
                d.balance = 0;
              }
            else {
              d.balance = d.balance - c.balance;
              let final = finalResult.find(f => f.name === c.name);
              if (final){
                final.who.push({name: d.name, sum: c.balance});
              }
              else finalResult.push({name: c.name, who: [{name: d.name, sum: c.balance}]});
              c.balance = 0;
            };
            };
          });
        });
        onChangeFinalResult(finalResult);
        onChangeTotalResult(spentResultList);
      };
      onSetCurrenciesList(tempList);
    };
  };
  const onChangeResult = (value) => {
    let tempCurrencies = currenciesList.slice(0);
    let currencyValue = tempCurrencies.find(el => el.name === value);
    if (currencyValue){
      onChangeResultCurrencyVal(currencyValue.value);
    }
    else onChangeResultCurrencyVal(1);
    onChangeResultCurrency(value);
  };
  const onChangeConvert = (value) => {
    let newVal = value.trim();
    newVal = newVal.replace(/[,\.]+/, ".");
    newVal = parseFloat(newVal);
    newVal = Math.round(newVal * 100000) / 100000;
    if (isNaN(newVal) || newVal === 0) newVal = 1;
    onChangeResultCurrencyVal(newVal);
  };
  const onSubmitPress = () => {//Сохраняем изменения в redux & AsyncStorage
    let event = thisEvent;
    event.results = {currency: resultCurrency, currencyValue: resultCurrencyVal, convertCurrencies: currenciesList};
    setEvent(event);
    let evList = events.slice();
    let curEvent = evList.find(e => e.id === thisEvent.id);
    if (curEvent) curEvent = event;
    AsyncStorage.setItem('events', JSON.stringify(evList));
    navigation.goBack();
  };
  let currencyBlock, convertResultCurrencyBlock, statisticBlock, debtorsBlock;
  if (finalResultList.length > 0) {
    let finalBlock = finalResultList.map((el, i) => {
      let cList;
      if (el.who.length > 0) cList = el.who.map((c, index) => {
        let balance = Math.round((c.sum * resultCurrencyVal) * 100) / 100;
        return <View key={index} style={styles.debtorsListLineWrapper}>
            <Text style={styles.eventText}>{c.name} {selectedLang.whoDebtDesc} </Text>
            <Text style={styles.eventText}>{balance} {resultCurrency}</Text>
          </View>;
      });
      return <View key={i} style={styles.singleResultWrapper}>
        <View style={styles.blockRowContainer}>
          <View style={styles.marginRightElement}>
            {graphics.richIcon}
          </View>
          <Text style={styles.eventText}>{el.name}</Text>
        </View>
        <View style={styles.debtorsListWrapper}>
          {cList}
        </View>
        </View>;
    });
    debtorsBlock = <View>
        {finalBlock}
      </View>;
  }
  else debtorsBlock = <View><Text style={styles.emptyListText}>{selectedLang.noDebts}!</Text></View>;
  if (initCurrency !== resultCurrency){
    let isExist = currenciesList.find(el => el.name === resultCurrency);
    if (!isExist) convertResultCurrencyBlock = <View style={styles.inrow}>
      <View style={styles.marginRightElement}>
        <Text style={styles.mediumText}>1 {initCurrency} =</Text>
      </View>
      <View style={styles.marginRightElement}>
        <TextInput 
          style={styles.inputCurrency} 
          onChangeText={onChangeConvert}
          keyboardType={'decimal-pad'}
        />
      </View>
      <Text style={styles.mediumText}>{resultCurrencyVal} {resultCurrency}</Text>
    </View>;
  };
  if (totalResult.length > 0) {
    let resultBlock = totalResult.map((el, i) => {
      let balance = Math.round((el.balance * resultCurrencyVal) * 100) / 100;
      return <View key={i} style={styles.debtorsListLineWrapper}>
        <Text style={styles.mediumText}>{el.name} </Text>
        <Text style={styles.mediumText}>{balance} {resultCurrency}</Text>
      </View>;
    });
    statisticBlock = <View>
      <View style={styles.blockRowContainer}>
        <View style={styles.marginRightElement}>
          {graphics.statisticIcon}
        </View>
        <Text style={styles.dateText}>{selectedLang.totalSum}:</Text>
      </View>
      <View style={styles.debtorsListWrapper}>
        {resultBlock}
      </View>
    </View>
  };
  if (currenciesList.length > 0) {
    currencyBlock = currenciesList.map((el, i) => {
      return <View key={i} style={styles.inrow}>
         <View style={styles.marginRightElement}>
          <Text style={styles.mediumText}>1 {initCurrency} =</Text>
         </View>        
        <View style={styles.marginRightElement}>
          <MyCurrencyInput
            name={el.name}
            onChange={onChangeCurrencyListVal}
          />
        </View>
        <Text style={styles.mediumText}>{el.value} {el.name}</Text>
      </View>;
    });
  };
  return (
    <View style={styles.listContainer}>
      <View style={styles.inrowMarginTop}>
        <View style={styles.marginRightElement}>
          <Text style={styles.mediumText}>{selectedLang.resultCurrency}</Text>
        </View>
        <RNPickerSelect
            onValueChange={onChangeResult}
            items={currencies}
            placeholder={{label: resultCurrency, value: resultCurrency}}
            style={styles}
            useNativeAndroidPickerStyle={false}
        />
      </View>
      <View>
        {currencyBlock}
        {convertResultCurrencyBlock}
      </View>
      <ScrollView>
        {debtorsBlock}
        {statisticBlock}
      </ScrollView>
      <View>
        <TouchableOpacity
          style={styles.darkButton}
          onPress={onSubmitPress}
        >
          <Text style={styles.darkButtonText}>{selectedLang.buttons.save}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Settings ({ lang, globalCurrency, setLang, setCurrency }){//Глобальные настройки приложения
  let initialLocalLang;
  let initialLangValue = langPack.find(l => l.code === lang);
  if (initialLangValue) {//Если находим язык в массиве - устанавливаем соответствующие значения
    initialLocalLang = initialLangValue;
    initialLangValue = {label: initialLangValue.name, value: initialLangValue.code};    
  }
  else {//Если нет - устанавливаем в качестве языка первый в массиве
    initialLocalLang = langPack[0];
    initialLangValue = {label: langPack[0].name, value: langPack[0].code};
  };
  const [selectedLang, setLocalLang] = useState(initialLocalLang);
  const langList = [];//Массив значений для пикера
  langPack.forEach(el => langList.push({label: el.name, value: el.code}));
  const onChangeLang = (value) => {
    let newLang = langPack.find(l => l.code === value);
    if (newLang) {
      setLocalLang(newLang);
      setLang(value);
      AsyncStorage.setItem('lang', JSON.stringify({code: value}));
    };
  };
  const onChangeCurrency = (value) => {
    setCurrency(value);
    AsyncStorage.setItem('currency', JSON.stringify({value: value}));
  }; 
  return (
    <View style={styles.listContainer}>
      <View style={styles.marginRowContainer}>
        <View style={styles.marginRightElement}>
          <Text style={styles.mediumText}>{selectedLang.appLang}</Text>
        </View>
        <RNPickerSelect
            onValueChange={onChangeLang}
            items={langList}
            placeholder={initialLangValue}
            useNativeAndroidPickerStyle={false}
            style={styles}
        />
      </View>
      <View style={styles.marginRowContainer}>
        <View style={styles.marginRightElement}>
          <Text style={styles.mediumText}>{selectedLang.defaultCurrency}</Text>
        </View>
        <RNPickerSelect
            onValueChange={onChangeCurrency}
            items={currencies}
            placeholder={{label: globalCurrency, value: globalCurrency}}
            useNativeAndroidPickerStyle={false}
            style={styles}
        />
      </View>
      <View style={styles.marginRowContainer}>
        <Text style={styles.mediumText}>{selectedLang.appVersion}: 0.9</Text>
      </View>    
    </View>
  );
}

function MainNavigation ({ lang }){
  let selectedLang = langPack.find(l => l.code === lang);
  if (!selectedLang) selectedLang = langPack[0];
  return (
    <Stack.Navigator initialRouteName="Events list"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#339999',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
    >
      <Stack.Screen name="Events list" component={StartScreen} options={{ title: selectedLang.eventManager, headerTitleAlign: 'center' }}/>
      <Stack.Screen name="Simple event" component={SimpleEventScreen} options={({ route }) => ({ title: route.params.title, headerTitleAlign: 'center' })}/>
      <Stack.Screen name="Global event" component={GlobalEventScreen} options={({ route }) => ({ title: route.params.title, headerTitleAlign: 'center' })}/>
      <Stack.Screen name="Set Global event" component={SetGlobalEventScreen} options={({ route }) => ({ title: route.params.title, headerTitleAlign: 'center' })}/>
      <Stack.Screen name="Global event result" component={GlobalEventResultScreen} options={{ title: selectedLang.eventResult, headerTitleAlign: 'center' }}/>
    </Stack.Navigator>
  );
}

function Main ({ lang, globalCurrency, setCurrency, setLang, loadEvent }){
  let selectedLang = langPack.find(l => l.code === lang);
  if (!selectedLang) selectedLang = langPack[0];
  useEffect(() => {
    AsyncStorage.getItem('currency').then((c) => {
      if (c){
        c = JSON.parse(c);
        if (c.value && c.value !== globalCurrency) setCurrency(c.value);
      };
    });
    AsyncStorage.getItem('lang').then((l) => {
      if (l){
        l = JSON.parse(l);
        if (l.code && l.code !== lang) setLang(l.code);
      };
    });
    AsyncStorage.getItem('events').then((ev) => {
      AsyncStorage.getItem('counter').then((c) => {
        if (ev && c){
          ev = JSON.parse(ev);
          c = JSON.parse(c);
          loadEvent(ev, c.value);
        };
      });
    });
  }, []);
  return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#339999',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
        drawerContentOptions={{
          activeTintColor: '#339999',
          inactiveTintColor: '#666666',
          labelStyle: {
            fontWeight: 'bold',
            fontSize: 16
          }
        }}
        >
          <Drawer.Screen name="Home" component={MainNavigationScreen} options={{ headerShown: false, title: selectedLang.eventsTitle }}/>
          <Drawer.Screen name="Settings" component={SettingsScreen} options={{ headerTitleAlign: 'center', title: selectedLang.settings }}/>
        </Drawer.Navigator>
      </NavigationContainer>
  );
}

function mapStatetoProps(state){
    const { events, lang, globalCurrency, idCounter } = state;
    return {
        events,
        lang,
        globalCurrency,
        idCounter
    };
}
function mapDispatchToProps(dispatch){
    return {
        loadEvent: bindActionCreators(actions.loadEvent, dispatch),
        addEvent: bindActionCreators(actions.addEvent, dispatch),
        setEvent: bindActionCreators(actions.setEvent, dispatch),
        delEvent: bindActionCreators(actions.delEvent, dispatch),
        setLang: bindActionCreators(actions.setLang, dispatch),
        setCurrency: bindActionCreators(actions.setCurrency, dispatch),
        addChildEvent: bindActionCreators(actions.addChildEvent, dispatch),
        setChildEvent: bindActionCreators(actions.setChildEvent, dispatch),
        delChildEvent: bindActionCreators(actions.delChildEvent, dispatch)
    };
}
//Connect screens with redux
let StartScreen = connect(
  mapStatetoProps,
  mapDispatchToProps
)(EventsManager);
let SimpleEventScreen = connect(
  mapStatetoProps,
  mapDispatchToProps
)(SimpleEvent);
let GlobalEventScreen = connect(
  mapStatetoProps,
  mapDispatchToProps
)(GlobalEvent);
let SetGlobalEventScreen = connect(
  mapStatetoProps,
  mapDispatchToProps
)(SetGlobalEvent);
let GlobalEventResultScreen = connect(
  mapStatetoProps,
  mapDispatchToProps
)(GlobalEventResult);
let SettingsScreen = connect(
  mapStatetoProps,
  mapDispatchToProps
)(Settings);
let MainNavigationScreen = connect(
  mapStatetoProps,
  mapDispatchToProps
)(MainNavigation);
let MainScreen = connect(
  mapStatetoProps,
  mapDispatchToProps
)(Main);

export default MainScreen;
