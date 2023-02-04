import { useState } from 'react';
import { ColorButton,CssTextField } from '../componenets/FormComponenets.js';
import { useNavigate } from "react-router-dom";

const Registration = () => {
    const [name,setName] = useState("")
    const [emailId,setEmailId] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate();

    const handleSubmit = ()=>{
        console.log(name,emailId,password)
        navigate("/home")
    }

    return(
        <div className="registration">
            <CssTextField label="Name" id="name-field-1" variant="standard" sx={{ width: '40vw' }} value={name} onChange={(e)=>setName(e.target.value)}/>
            <CssTextField label="Email Id" id="email-field-1" variant="standard" sx={{ width: '40vw', marginTop: '3vh', marginBottom: '3vh' }} type='email' value={emailId} onChange={(e)=>setEmailId(e.target.value)}/>
            <CssTextField label="Password" id="password-field-1" variant="standard" sx={{ width: '40vw' }} type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <ColorButton variant="contained" sx={{ width: '30vw', marginLeft: '5vw', marginTop: '8vh' }} onClick={handleSubmit}>SUBMIT</ColorButton>
        </div>
    );
}

export default Registration;