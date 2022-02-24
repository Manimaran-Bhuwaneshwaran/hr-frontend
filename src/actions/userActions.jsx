import axios from "axios";
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILS,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAILS,

} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });

        // to handle headers
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(
            "/api/user/userLogin",
            { email, password },
            config
        );
        console.log(data);
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });
        // localStorage.setItem("userInfo", JSON.stringify(data));
        localStorage.setItem("token", data.token);
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAILS,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem("token");
    // dispatch({ type: USER_DETAILS_RESET });
    dispatch({
        type: USER_LOGOUT,
    });
};

export const register = (name, email, password, hrsign, hrposition) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });

        // to handle headers
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(
            "/api/user/userRegister",
            { name, email, password, hrsign, hrposition },
            config
        );
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
        });
        // dispatch({
        //     type: USER_LOGIN_SUCCESS,
        //     payload: data,
        // });
        // localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAILS,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

