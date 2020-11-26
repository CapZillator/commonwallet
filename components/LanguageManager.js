function LanguageManager(){
    const lang = [{code: "ru", name: "Русский", tips: "Общие расходы (чаевые, налоги и т.д.)", eventPlaceholder: "Заголовок", 
                    newMemberHeader: "Участник", includingTips: "Включая общие расходы",
                    buttons: 
                      {add: "Добавить", save: "Сохранить", submit: "Подтверждаю", cancel: "Отмена",
                      addSimple: "+ Событие", addComplex: "+ Составное событие", results: "Итоги"},
                    totalSum: "Всего потрачено", whoPay: "Заплатил(а)", debtDesc: "ему(ей) должны", whoDebtDesc: "должен(на)", 
                    defaultCurrency: "Валюта по умолчанию", newEvent: "Новое событие", eventManager: "Управление событиями", 
                    eventsTitle: "События", settings: "Настройки", whoPayTitle: "Кто платил?", 
                    payStringDesc: "Укажите, кто сколько потратил. Значения можно записывать через пробел.",
                    eventResult: "Итоги", splitEqually: "Разделить поровну", appLang: "Язык приложения",
                    emptyList: "Событий нет", resultCurrency: "Валюта", noDebts: "Никто никому не должен", 
                    appVersion: "Версия приложения", debtorMan: "Должник", clearMan: "Нет долга",
                    alerts: 
                      {clearDebt: {title: "Списать долг?", message: "Пожалуйста, подтвердите погашение долга."}, 
                       delEvent: {title: "Удалить событие?", message: "Пожалуйста, подтвердите удаление события."}},
                    stateString: 
                      {delMember: "удален(а) из списка участников", tooShortHeader: "Заголовок не может быть короче двух символов",
                       tooShortName: "Имя не может быть короче одного символа", notUnicName: "Это имя уже используется",
                        clearDebt: "долг погашен"}},
                  {code: "en", name: "English", tips: "Common expenses (tips, taxes, etc.)", eventPlaceholder: "Title", 
                  newMemberHeader: "Participant", includingTips: "Including common expenses",
                  buttons: 
                    {add: "Add", save: "Save", submit: "Submit", cancel: "Cancel",
                    addSimple: "+ Event", addComplex: "+ Compound event", results: "Results"},
                  totalSum: "Total spent", whoPay: "Paid by", debtDesc: "he (she) is owed", whoDebtDesc: "owe(s)", 
                  defaultCurrency: "Default currency", newEvent: "New event", eventManager: "Event manager",
                  eventsTitle: "Events", settings: "Settings", whoPayTitle: "Who paid?", 
                  payStringDesc: "Indicate who spent how much. The values can be written separated by a space.",
                  eventResult: "Results", splitEqually: "Divide equally", appLang: "Application language",
                  emptyList: "No events", resultCurrency: "Currency", noDebts: "Nobody owes anyone", 
                  appVersion: "Application version", debtorMan: "Debtor", clearMan: "No debt",
                  alerts: 
                    {clearDebt: {title: "To write off the debt?", message: "Please confirm debt repayment."}, 
                     delEvent: {title: "Delete event?", message: "Please confirm deletion of the event."}},
                  stateString: 
                    {delMember: "removed from the list of participants", tooShortHeader: "The title can't be shorter than two characters",
                     tooShortName: "The name can't be shorter than one character", notUnicName: "This name is already exist",
                      clearDebt: "debt is paid off"}}];
    return lang;
}
export default LanguageManager;
