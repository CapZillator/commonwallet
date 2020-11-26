function StylesManager(){
    const styles = {
    listContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    scrollView: {
    },
    buttonsContainer: {
        position: 'absolute',
        bottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        width: '100%'
    },
    singleContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    blockContainer: {
        alignItems: 'center',
        padding: 5
    },
    blockRowContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    marginRowContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    eventWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#339999',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        borderRadius: 4
    },
    singleResultWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#339999',
        margin: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 4
    },
    debtorsListWrapper: {
        marginTop: 10
    },
    debtorsListLineWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    inrow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5
    },
    inrowMarginTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10
    },
    inrowSpaceAround: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 10
    },
    stateBlock: {
        alignItems: 'center',
        backgroundColor: '#ffff99',
        padding: 5
    },
    nameBlock: {
        width: 80,
        overflow: 'hidden'
    },
    sumBlock: {
        width: 100,
        overflow: 'hidden'
    },
    mediumText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    boldText: {
        fontWeight: 'bold'
    },
    eventText: {
        fontSize: 16,
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    dateText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    legendText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left',
        marginLeft: 10
    },
    darkButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    whiteButtonText: {
        color: '#339999',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    emptyListText: {
        color: '#339999',
        fontWeight: 'bold',
        fontSize: 18,
        margin: 20
    },
    darkHeaderText: {
        color: '#339999',
        fontWeight: 'bold',
        fontSize: 18,
    },
    eventHeader: {
        fontSize: 18,
        color: '#ffffff',
        textAlign: 'center'
    },
    blockBottomContainer: {
        alignItems: 'center',
        backgroundColor: '#339999',
        padding: 5
    },
    input: {
        borderBottomWidth: 2,
        width: 100,
        color: '#339999',
        fontSize: 16,
        fontWeight: 'bold'
    },
    inputHeader: {
        borderBottomWidth: 2,
        width: 150,
        color: '#339999',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    inputCurrency: {
        borderBottomWidth: 2,
        width: 50,
        color: '#339999',
        fontSize: 14,
        fontWeight: 'bold'
    },
    darkButton: {
        alignItems: "center",
        backgroundColor: "#339999",
        padding: 10,
        margin: 10,
        borderRadius: 4
    },
    whiteButton: {
        alignItems: "center",
        backgroundColor: "#ffffff",
        padding: 10,
        margin: 10,
        borderRadius: 4
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    sideheader: {
        paddingRight: 10
    },
    sum: {
        paddingLeft: 10
    },
    marginElement: {
        margin: 5
    },
    marginRightElement: {
        marginRight: 10
    },
    inputIOS: {//Стили пикера
        fontSize: 14,
        fontWeight: '500',
        paddingVertical: 2,
        paddingHorizontal: 10,
        borderRadius: 4,
        backgroundColor: '#339999',
        color: '#ffffff',
        maxWidth: 150,
    },
    inputAndroid: {
        fontSize: 14,
        fontWeight: '500',
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 4,
        backgroundColor: '#339999',
        textAlign: 'center',
        color: '#ffffff',
        maxWidth: 150,
    },
    placeholder: {
        color: '#ffffff'
    }
    };
    return styles;
}

export default StylesManager;