import { useState } from 'react';
import { ColorButton,CssTextField } from '../componenets/FormComponenets.js';
import { useNavigate } from "react-router-dom";
import { useLogin } from '../hooks/useLogin'

const Login = () => {
    const [emailId,setEmailId] = useState("")
    const [password,setPassword] = useState("")
    const { login,loading,error } = useLogin()
    const navigate = useNavigate();

    const handleSubmit = ()=>{
        console.log(emailId,password)
        login(emailId,password)
    }

    return(
        <div className="login">
            <CssTextField label="Email Id" id="email-field-2" variant="standard" sx={{ width: '40vw', marginBottom: '3vh' }} type='email' value={emailId} onChange={(e)=>setEmailId(e.target.value)}/>
            <CssTextField label="Password" id="password-field-2" variant="standard" sx={{ width: '40vw' }} type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <ColorButton variant="contained" sx={{ width: '30vw', marginLeft: '5vw', marginTop: '8vh' }} onClick={handleSubmit}>SUBMIT</ColorButton>
            { error && <div className="error">{error}</div> }
        </div>
    );
}

export default Login;