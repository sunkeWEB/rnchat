const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const ERR_MSG = 'ERR';
const Clear_USER = 'Clear_USER';
const init = {
    name: '',
    msg: '',
    token: '',
    errMsg: '',
    redicertTo:'',
    role:1,
    roles:[]
};

export function user(state = init, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            let x = action.payload;
            return {...state, isAuth: true, errMsg: '', redicertTo: '/home', token: x.token, name: x.data.realname,role:x.data.role,roles:JSON.parse(x.data.roles)};
        case ERR_MSG:
            return {...state, errMsg: action.msg};
        case Clear_USER:
            return {...state, errMsg: ''};
        default:
            return state;
    }
}

export function loginSuccess(data) {
    return {type: LOGIN_SUCCESS, payload: data}
}

function errMsg(msg) {
    return {type: ERR_MSG, msg: msg}
}

export function Logins({name, pwd}) {
    return dispatch => {
        axios.post('/userlogin', {name, pwd}).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(loginSuccess(res.data));
            } else {
                message.error(res.data.msg);
                dispatch(errMsg(res.data.msg)); // 登录错误
            }
        });
    };
}

export function loadDate(data) {
    return {type: LOGIN_SUCCESS, payload: data}
}

export function ClearUser() {
    return {type: Clear_USER}
}