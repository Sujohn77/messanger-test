// import * as consts from "./../actions/loginActions";
// // import {initialState} from "./../initialState";

// export const initialState = {
//     user:{
//         email:null,
//         password:null,
//         firstName:null,
//         lastName: null
//     },
//     isVerified:false
// };

// export const userReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case consts.LOG_IN:
//             return {
//                 ...state,
//                 user: action.payload,
//             };
//         case consts.LOG_OUT:
//             return {
//                 ...state,
//                 user: null
//             };
//         case consts.SIGN_UP_TRIAL:
//             return {
//                 ...state,
//                 user:{
//                     ...state.userData.user,
//                     email: action.payload.email,
//                     password: action.payload.password
//                }
                
//             };
//         case consts.SIGN_UP:
//             return {
//                 ...state,
//                 user:{
//                     ...state.userData.user,
//                     firstName: action.payload.firstName,
//                     lastName: action.payload.lastName,
//                }
//             };
//         case consts.VERIFY_CODE:
//             return {
//                 ...state,
//                 isVerified: true,
//             };
//         default:
//             return state;
//     }
// };