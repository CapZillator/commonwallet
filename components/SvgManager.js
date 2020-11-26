import React from 'react';
import Svg, { Polygon, Rect, Circle, Path } from 'react-native-svg';

function SvgManager(){
    const debtorIcon = <Svg width="30" height="30" viewBox="0 0 30 30">
    <Path fill="#339999" d="M19.634,1.642v1.517h-2.681V1.642h-2.682v1.517h-2.681V1.642H8.918v1.517H6.236V1.642H3.556v25.455h2.681
        V25.43h2.682v1.667h2.673V25.43h2.681v1.667h2.682V25.43h2.681v1.667h2.682V1.642H19.634z M14.563,18.965H6.236v-2.303h8.326V18.965
        z M14.563,14.369H6.236v-2.302h8.326V14.369z M14.563,9.774H6.236V7.472h8.326V9.774z M19.634,18.965h-3.06v-2.303h3.06V18.965z
        M19.634,14.369h-3.06v-2.302h3.06V14.369z M19.634,9.774h-3.06V7.472h3.06V9.774z"/>
    <Circle fill="#FFFFFF" stroke="#339999" stroke-width="2" stroke-miterlimit="10" cx="19.69" cy="21.603" r="6.754"/>
        <Rect x="19.533" y="17.79" transform="matrix(0.7087 -0.7055 0.7055 0.7087 -9.5053 20.1853)" fill="#339999" width="0.313" height="7.624"/>
        <Path fill="#339999" d="M22.143,23.834c-0.074,0.073-0.147,0.147-0.222,0.221c0.235,0,0.472,0,0.707,0
            c-1.797-1.797-3.595-3.594-5.392-5.391c0,0.235,0,0.472,0,0.707c0.074-0.073,0.147-0.147,0.222-0.221c-0.235,0-0.472,0-0.707,0
            c1.797,1.797,3.595,3.594,5.392,5.391c0.456,0.456,1.163-0.251,0.707-0.707c-1.797-1.797-3.595-3.594-5.392-5.391
            c-0.193-0.193-0.514-0.192-0.707,0c-0.074,0.073-0.147,0.147-0.222,0.221c-0.193,0.192-0.192,0.515,0,0.707
            c1.797,1.797,3.595,3.594,5.392,5.391c0.193,0.193,0.514,0.192,0.707,0c0.074-0.073,0.147-0.147,0.222-0.221
            C23.307,24.086,22.6,23.379,22.143,23.834z"/>
        <Rect x="19.533" y="17.791" transform="matrix(0.7055 0.7087 -0.7087 0.7055 21.107 -7.5921)" fill="#339999" width="0.313" height="7.625"/>
        <Path fill="#339999" d="M17.457,24.056c-0.073-0.074-0.147-0.147-0.221-0.222c0,0.235,0,0.472,0,0.707
            c1.798-1.797,3.595-3.594,5.393-5.391c-0.235,0-0.472,0-0.707,0c0.073,0.073,0.147,0.147,0.221,0.221c0-0.235,0-0.472,0-0.707
            c-1.798,1.797-3.595,3.595-5.393,5.392c-0.456,0.456,0.251,1.163,0.707,0.707c1.798-1.797,3.595-3.595,5.393-5.392
            c0.192-0.192,0.192-0.515,0-0.707c-0.073-0.073-0.147-0.147-0.221-0.221c-0.192-0.192-0.515-0.192-0.707,0
            c-1.798,1.797-3.595,3.594-5.393,5.391c-0.193,0.193-0.192,0.514,0,0.707c0.073,0.074,0.147,0.147,0.221,0.222
          C17.205,25.22,17.912,24.513,17.457,24.056z"/>
    </Svg>;
    const noDebtIcon = <Svg width="30" height="30" viewBox="0 0 30 30">
        <Circle fill="none" stroke="#339999" stroke-width="3" stroke-miterlimit="10" cx="15" cy="15" r="11.188"/>
        <Path fill="none" stroke="#339999" stroke-width="2" stroke-miterlimit="10" d="M2,13.313"/>
        <Path fill="none" stroke="#339999" stroke-width="2" stroke-miterlimit="10" d="M12.712,12.748c0-2.397-4.024-2.491-4.024,0"/>
        <Path fill="none" stroke="#339999" stroke-width="2" stroke-miterlimit="10" d="M21.313,12.999c0-2.397-4.024-2.491-4.024,0"/>
        <Path fill="#339999" d="M20.846,17.313c0,2.559-2.605,4.648-5.839,4.648s-5.852-2.09-5.852-4.648H20.846z"/>
    </Svg>;
    const calendarIcon = <Svg width="30" height="30" viewBox="0 0 30 30">
        <Rect x="3.229" y="6.5" fill="none" stroke="#339999" stroke-width="3" stroke-miterlimit="10" width="23.542" height="20.055"/>
        <Rect x="5.875" y="14.637" fill="#339999" width="3.813" height="3.813"/>
        <Rect x="5.875" y="19.449" fill="#339999" width="3.813" height="3.813"/>
        <Rect x="10.688" y="9.793" fill="#339999" width="3.813" height="3.813"/>
        <Rect x="10.688" y="14.637" fill="#339999" width="3.813" height="3.813"/>
        <Rect x="10.688" y="19.449" fill="#339999" width="3.813" height="3.813"/>
        <Rect x="15.5" y="9.793" fill="#339999" width="3.813" height="3.813"/>
        <Rect x="15.5" y="19.449" fill="#339999" width="3.813" height="3.813"/>
        <Rect x="20.313" y="9.793" fill="#339999" width="3.813" height="3.813"/>
        <Rect x="20.313" y="14.637" fill="#339999" width="3.813" height="3.813"/>
        <Rect x="3.229" y="3.625" fill="none" stroke="#339999" stroke-width="3" stroke-miterlimit="10" width="23.542" height="1.313"/>
    </Svg>;
    const singleEventIcon = <Svg width="30" height="30" viewBox="0 0 30 30">
        <Polygon fill="#FFFFFF" points="22.49,4.21 22.49,25.79 7.51,25.79 7.51,9.48 12.78,9.48 12.78,4.21 "/>
        <Polygon fill="#FFFFFF" points="11.876,4.21 11.876,8.576 7.51,8.576 "/>
    </Svg>;
    const compoundEventIcon = <Svg width="30" height="30" viewBox="0 0 30 30">
        <Polygon fill="#FFFFFF" points="25.69,7.1 25.69,28.68 10.71,28.68 10.71,12.37 15.98,12.37 15.98,7.1 "/>
        <Polygon fill="#FFFFFF" points="15.076,7.1 15.076,11.466 10.71,11.466 "/>
        <Polygon fill="#FFFFFF" points="22.49,4.24 22.49,6.24 14.45,6.24 9.58,11.11 9.58,25.82 7.51,25.82 7.51,4.24 "/>
        <Polygon fill="#FFFFFF" points="19.29,1.32 19.29,3.32 6.381,3.32 6.381,22.9 4.311,22.9 4.311,1.32 "/>
    </Svg>;
    const resultIcon = <Svg width="100" height="100" viewBox="0 0 30 30">
        <Circle fill="rgba(255, 255, 255, .8)" cx="15" cy="15" r="15"/>
        <Circle fill="#339999" cx="15" cy="15" r="12.688"/>
        <Rect x="10.719" y="8.833" fill="#FFFFFF" width="8.563" height="12.334"/>
        <Rect x="12.125" y="7.875" fill="#339999" width="5.75" height="1.917"/>
        <Rect x="12.667" y="7.708" fill="#FFFFFF" width="4.667" height="1.542"/>
        <Circle fill="#339999" cx="15" cy="14.999" r="3.416"/>
        <Rect x="12.846" y="15.137" transform="matrix(0.807 0.5906 -0.5906 0.807 11.9769 -5.3683)" fill="#FFFFFF" width="2.708" height="1"/>
        <Rect x="15.188" y="13.194" transform="matrix(-0.808 -0.5892 0.5892 -0.808 19.4982 36.4517)" fill="#FFFFFF" width="1.002" height="3.709"/>
    </Svg>;
    const newSimpleIcon = <Svg width="100" height="100" viewBox="0 0 30 30">
        <Circle fill="rgba(255, 255, 255, .8)" cx="15" cy="15" r="15"/>
        <Circle fill="#339999" cx="15" cy="15" r="12.688"/>
        <Polygon fill="#FFFFFF" points="19.281,8.832 19.281,21.167 10.719,21.167 10.719,11.846 13.731,11.846 13.731,8.832 "/>
        <Polygon fill="#FFFFFF" points="13.213,8.832 13.213,11.328 10.719,11.328 "/>
        <Rect x="12.38" y="14.43" fill="#339999" width="5.237" height="1.537"/>
        <Rect x="14.231" y="12.58" fill="#339999" width="1.539" height="5.238"/>
    </Svg>;
    const newCompoundIcon = <Svg width="100" height="100" viewBox="0 0 30 30">
        <Circle fill="rgba(255, 255, 255, .8)" cx="15" cy="15" r="15"/>
        <Circle fill="#339999" cx="15" cy="15" r="12.688"/>
        <Polygon fill="#FFFFFF" points="21.11,10.484 21.11,22.819 12.548,22.819 12.548,13.498 15.56,13.498 15.56,10.484 "/>
        <Polygon fill="#FFFFFF" points="15.042,10.484 15.042,12.98 12.548,12.98 "/>
        <Polygon fill="#FFFFFF" points="19.28,8.85 19.28,9.993 14.685,9.993 11.901,12.777 11.901,21.185 10.718,21.185 10.718,8.85 "/>
        <Polygon fill="#FFFFFF" points="17.451,7.181 17.451,8.324 10.073,8.324 10.073,19.518 8.89,19.518 8.89,7.181 "/>
        <Rect x="14.209" y="16.082" fill="#339999" width="5.237" height="1.537"/>
        <Rect x="16.06" y="14.232" fill="#339999" width="1.538" height="5.238"/>
    </Svg>;
    const richIcon = <Svg width="30" height="30" viewBox="0 0 30 30">
        <Path fill="#FFFFFF" d="M28.262,18.457v10.859l-4.68-2.979l-11.73,1.32c-0.67,0.069-1.3-0.131-1.81-0.511l-0.01,0.011l-1.22-0.78
        l-3.83-2.45l-3.09-1.97c-1.17-0.75-1.5-2.3-0.76-3.46c0.75-1.17,2.29-1.511,3.46-0.761l3.09,1.961l3.83,2.449l0.53,0.351l6.28-0.71
        c0.301-0.19,0.48-0.53,0.44-0.9c-0.06-0.49-0.49-0.85-0.99-0.81l-2.62,0.29c-1.27,0.149-2.41-0.71-2.54-1.91s0.78-2.28,2.05-2.42
        l7.56-0.85c0.62-0.04,1.22,0.16,1.68,0.53l0.011-0.01l2.909,1.85l0.011-0.01L28.262,18.457z"/>
        <Rect x="2.178" y="8.8" fill="#FFFFFF" width="19.833" height="1.083"/>
        <Rect x="2.178" y="10.55" fill="#FFFFFF" width="19.833" height="1.083"/>
        <Rect x="2.178" y="12.466" fill="#FFFFFF" width="19.833" height="1.083"/>
        <Path fill="#FFFFFF" d="M2.18,0.68v7.37h19.83V0.68H2.18z M5.18,5.36c-0.55,0-1-0.44-1-1c0-0.55,0.45-1,1-1c0.55,0,1,0.45,1,1
        C6.18,4.92,5.73,5.36,5.18,5.36z M12.09,7.24c-1.58,0-2.87-1.29-2.87-2.87c0-1.59,1.29-2.88,2.87-2.88c1.59,0,2.88,1.29,2.88,2.88
        C14.97,5.95,13.68,7.24,12.09,7.24z M19.08,5.37c-0.55,0-1-0.45-1-1c0-0.56,0.45-1,1-1s1,0.44,1,1C20.08,4.92,19.63,5.37,19.08,5.37
        z"/>
    </Svg>;
    const statisticIcon = <Svg width="30" height="30" viewBox="0 0 30 30">
        <Rect x="1.719" y="17.563" fill="#339999" width="4.813" height="10"/>
        <Path fill="#339999" d="M6.531,27.063c-1.604,0-3.208,0-4.813,0c0.167,0.167,0.333,0.333,0.5,0.5c0-3.333,0-6.667,0-10
          c-0.167,0.167-0.333,0.333-0.5,0.5c1.604,0,3.208,0,4.813,0c-0.167-0.167-0.333-0.333-0.5-0.5c0,3.333,0,6.667,0,10
          c0,0.645,1,0.645,1,0c0-3.333,0-6.667,0-10c0-0.272-0.228-0.5-0.5-0.5c-1.604,0-3.208,0-4.813,0c-0.272,0-0.5,0.228-0.5,0.5
          c0,3.333,0,6.667,0,10c0,0.272,0.228,0.5,0.5,0.5c1.604,0,3.208,0,4.813,0C7.176,28.063,7.176,27.063,6.531,27.063z"/>
        <Rect x="8.969" y="11.875" fill="#339999" width="4.813" height="15.688"/>
        <Path fill="#339999" d="M13.781,27.063c-1.604,0-3.208,0-4.813,0c0.167,0.167,0.333,0.333,0.5,0.5c0-5.229,0-10.458,0-15.688
          c-0.167,0.167-0.333,0.333-0.5,0.5c1.604,0,3.208,0,4.813,0c-0.167-0.167-0.333-0.333-0.5-0.5c0,5.229,0,10.458,0,15.688
          c0,0.645,1,0.645,1,0c0-5.229,0-10.458,0-15.688c0-0.272-0.228-0.5-0.5-0.5c-1.604,0-3.208,0-4.813,0c-0.272,0-0.5,0.228-0.5,0.5
          c0,5.229,0,10.458,0,15.688c0,0.272,0.228,0.5,0.5,0.5c1.604,0,3.208,0,4.813,0C14.426,28.063,14.426,27.063,13.781,27.063z"/>
        <Rect x="16.219" y="2.438" fill="#339999" width="4.813" height="25.125"/>
        <Path fill="#339999" d="M21.031,27.063c-1.604,0-3.208,0-4.813,0c0.166,0.167,0.334,0.333,0.5,0.5c0-8.375,0-16.75,0-25.125
          c-0.166,0.167-0.334,0.333-0.5,0.5c1.604,0,3.208,0,4.813,0c-0.167-0.167-0.333-0.333-0.5-0.5c0,8.375,0,16.75,0,25.125
          c0,0.645,1,0.645,1,0c0-8.375,0-16.75,0-25.125c0-0.272-0.228-0.5-0.5-0.5c-1.604,0-3.208,0-4.813,0c-0.272,0-0.5,0.228-0.5,0.5
          c0,8.375,0,16.75,0,25.125c0,0.272,0.228,0.5,0.5,0.5c1.604,0,3.208,0,4.813,0C21.676,28.063,21.676,27.063,21.031,27.063z"/>
        <Rect x="23.469" y="7.188" fill="#339999" width="4.813" height="20.375"/>
        <Path fill="#339999" d="M28.281,27.063c-1.604,0-3.208,0-4.813,0c0.167,0.167,0.333,0.333,0.5,0.5c0-6.792,0-13.583,0-20.375
          c-0.167,0.167-0.333,0.333-0.5,0.5c1.604,0,3.208,0,4.813,0c-0.167-0.167-0.333-0.333-0.5-0.5c0,6.792,0,13.583,0,20.375
          c0,0.645,1,0.645,1,0c0-6.792,0-13.583,0-20.375c0-0.272-0.228-0.5-0.5-0.5c-1.604,0-3.208,0-4.813,0c-0.272,0-0.5,0.228-0.5,0.5
          c0,6.792,0,13.583,0,20.375c0,0.272,0.228,0.5,0.5,0.5c1.604,0,3.208,0,4.813,0C28.926,28.063,28.926,27.063,28.281,27.063z"/>
    </Svg>;
    const delDarkIcon = <Svg width="30" height="30" viewBox="0 0 30 30">
        <Polygon fill="#339999" points="22.257,28.313 7.744,28.313 5.844,7.75 24.156,7.75 	"/>
        <Path fill="#339999" d="M22.257,27.813c-4.838,0-9.675,0-14.513,0c0.167,0.167,0.333,0.333,0.5,0.5
        c-0.633-6.854-1.267-13.708-1.9-20.563c-0.167,0.167-0.333,0.333-0.5,0.5c6.104,0,12.208,0,18.313,0
        c-0.167-0.167-0.333-0.333-0.5-0.5c-0.633,6.854-1.267,13.708-1.899,20.563c-0.06,0.643,0.941,0.637,1,0
        c0.633-6.854,1.267-13.708,1.899-20.563c0.025-0.272-0.246-0.5-0.5-0.5c-6.104,0-12.208,0-18.313,0c-0.253,0-0.525,0.228-0.5,0.5
        c0.633,6.854,1.267,13.708,1.9,20.563c0.025,0.271,0.208,0.5,0.5,0.5c4.837,0,9.675,0,14.513,0
        C22.901,28.813,22.901,27.813,22.257,27.813z"/>
        <Rect x="4.156" y="3.969" fill="#339999" width="21.688" height="2.031"/>
        <Path fill="#339999" d="M19.625,3.984c-3.083,0-6.167,0-9.25,0c0.333,0.333,0.667,0.667,1,1c0-1.099,0-2.198,0-3.297
        c-0.333,0.333-0.667,0.667-1,1c3.083,0,6.167,0,9.25,0c-0.333-0.333-0.667-0.667-1-1c0,1.099,0,2.198,0,3.297c0,1.29,2,1.29,2,0
        c0-1.099,0-2.198,0-3.297c0-0.545-0.455-1-1-1c-3.083,0-6.167,0-9.25,0c-0.545,0-1,0.455-1,1c0,1.099,0,2.198,0,3.297
        c0,0.545,0.455,1,1,1c3.083,0,6.167,0,9.25,0C20.915,5.984,20.915,3.984,19.625,3.984z"/>
    </Svg>;
    const delWhiteIcon = <Svg width="30" height="30" viewBox="0 0 30 30">
        <Polygon fill="#ffffff" points="22.257,28.313 7.744,28.313 5.844,7.75 24.156,7.75 	"/>
        <Path fill="#ffffff" d="M22.257,27.813c-4.838,0-9.675,0-14.513,0c0.167,0.167,0.333,0.333,0.5,0.5
        c-0.633-6.854-1.267-13.708-1.9-20.563c-0.167,0.167-0.333,0.333-0.5,0.5c6.104,0,12.208,0,18.313,0
        c-0.167-0.167-0.333-0.333-0.5-0.5c-0.633,6.854-1.267,13.708-1.899,20.563c-0.06,0.643,0.941,0.637,1,0
        c0.633-6.854,1.267-13.708,1.899-20.563c0.025-0.272-0.246-0.5-0.5-0.5c-6.104,0-12.208,0-18.313,0c-0.253,0-0.525,0.228-0.5,0.5
        c0.633,6.854,1.267,13.708,1.9,20.563c0.025,0.271,0.208,0.5,0.5,0.5c4.837,0,9.675,0,14.513,0
        C22.901,28.813,22.901,27.813,22.257,27.813z"/>
        <Rect x="4.156" y="3.969" fill="#ffffff" width="21.688" height="2.031"/>
        <Path fill="#ffffff" d="M19.625,3.984c-3.083,0-6.167,0-9.25,0c0.333,0.333,0.667,0.667,1,1c0-1.099,0-2.198,0-3.297
        c-0.333,0.333-0.667,0.667-1,1c3.083,0,6.167,0,9.25,0c-0.333-0.333-0.667-0.667-1-1c0,1.099,0,2.198,0,3.297c0,1.29,2,1.29,2,0
        c0-1.099,0-2.198,0-3.297c0-0.545-0.455-1-1-1c-3.083,0-6.167,0-9.25,0c-0.545,0-1,0.455-1,1c0,1.099,0,2.198,0,3.297
        c0,0.545,0.455,1,1,1c3.083,0,6.167,0,9.25,0C20.915,5.984,20.915,3.984,19.625,3.984z"/>
    </Svg>;
    const graphics = {debtorIcon: debtorIcon, noDebtIcon: noDebtIcon, calendarIcon: calendarIcon, singleEventIcon: singleEventIcon, 
        compoundEventIcon: compoundEventIcon, resultIcon: resultIcon, newSimpleIcon: newSimpleIcon, richIcon: richIcon, 
        statisticIcon: statisticIcon, delDarkIcon: delDarkIcon, delWhiteIcon: delWhiteIcon, newCompoundIcon: newCompoundIcon
    };
    return graphics;
}

export default SvgManager;