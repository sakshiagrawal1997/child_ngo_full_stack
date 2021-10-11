import {useState} from "react";
import axios from "axios";
import RenderLogo from "./RenderLogo";
import {useHistory} from "react-router-dom";
function Login(){
    const [username,setUsername] = useState();
    const [password,setPassword] = useState();
    const history = useHistory();
    async function handleLogin(e) {
        e.preventDefault();
        try{
            const createTask = await axios.post(`/authenticate/login`, {
            email: username,
            password: password});
            localStorage.setItem("userToken", createTask.data.token);
            history.push("/home");
        }
        catch (e) {
            console.log(e);
            alert(e.message);
        }
        
    }
    if(localStorage.getItem('userToken') === null){
        return(
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <RenderLogo />
                    <h2 className="mb-5 mt-5">Login</h2>
                    <form>
                        <div className="form-outline mb-4">
                            <input type="" id="form1Example1" className="form-control style-inp" placeholder="Username" onChange = {(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="form-outline mb-4">
                            <input type="password" id="form1Example2" className="form-control style-inp" placeholder="Password" onChange = {(e) => setPassword(e.target.value)}/>
                        </div>
                        <button type="submit" onClick = {handleLogin} className="btn btn-primary btn-block theme-color-fill w-100">Login</button>
                    </form>
                </div>
            </div>

        </div>);
    }
    else{
        history.push("/home");
        return(<div></div>);
    }
}
export default Login;