import React, {useState} from 'react';
import SignInForm from "../Components/SignInForm";
import SignUpForm from "../Components/SignUpForm/SignUpForm";
import {useSelector, useDispatch} from "react-redux";

const LoginPage = () => {
    const [signState, setSignState] = useState(true)
    const currentUser = useSelector(state => state.currentUser)
    const dispatch = useDispatch()

    const toggle = () => {
        setSignState(!signState)
    }

    const logOut = () => {
        dispatch({type: 'SET_USER', payload: ''})
    }

    return (
        <div style={{textAlign: 'center'}}> <br/>
            {currentUser &&
                <>
                    User: {currentUser} <br/>
                    <input className={'btn'} type="button" value={'Log out'} onClick={logOut}/>
                </>
            }
            {signState ?
                <>
                    <SignInForm/>
                    <input className={'btn'} type="button" value={'Don\'t have an account?'} onClick={toggle}/>
                </>
                :
                <>
                    <SignUpForm/>
                    <input className={'btn'} type="button" value={'Sign in'} onClick={toggle}/>
                </>
            }
        </div>
    );
};

export default LoginPage;