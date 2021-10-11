import { BsArrowRight } from 'react-icons/bs';
import {useState,useEffect} from 'react';
import axios from "axios";
import Login from './Login';
function State(){
    var token = localStorage.getItem('userToken');
    const [stateData,updateStateData] = useState([]);
    var stateNumber = 0;
    async function fetchStateData() {

        try{
            if(token === null){
                return;
            }
            const stateData = await axios.get(`http://localhost:8080/state/getAll`,{ headers: {"auth-token" : `${token}`} });
            const dataFromAPI = stateData.data.results;
            updateStateData(dataFromAPI);
        }
        catch (e) {
            console.log(e);
            alert(e.message);
        }
        
    }
    useEffect(()=>{
        fetchStateData();
    }, []);

    const state = stateData.map((state)=> {
    stateNumber=stateNumber+1;
    return (
    <div className="col-md-4" key={state._id}>
            <div className="row state-col mb-3">
                <div className="col-md-4">
                    <div className="circles float-left">
                        <div className="circle-with-text theme-color-text">{stateNumber}</div>
                    </div>
                </div>
                <div className="col-md-4 d-flex align-items-center">
                    <div className="state-name">{state.stateName}</div>
                </div>
                <div className="col-md-4 d-flex align-items-center justify-content-end   ">
                    <div className="state-name"><BsArrowRight size="40"/></div>
                </div>
            </div>
    </div>
    )
    });
    const [stateInputText, updateStateInputText] = useState("");
    async function handleAddingItems() {
         const createTask = await axios.post(`http://localhost:8080/state/add`, {
            stateName: stateInputText,
            stateNumber: 1
         },{ headers: {"auth-token" : `${token}`} });
         console.log(createTask);
        //  alert("States added successfully");
         updateStateInputText("");
        //  fetchStateData();
    }
    if(token === null){
        return(<div><h3>Please Login First</h3>
        <Login />
        </div>);
    }
    else{
    return(
    <div className="container-fluid px-5">
        <div className="row gx-5">
        <div className="col-md-4">
            <div className="row state-col mb-3">
                <div className="col-md-4">
                    <div className="circles float-left">
                        <div className="circle-with-text theme-color-text">+</div>
                    </div>
                </div>
                <div className="col-md-4 d-flex align-items-center">
                    <div className="state-name">
                    <form>
                        <div className="form-outline mb-4">
                            <input type="" id="form1Example1" className="form-control style-inp focus:outline-none" placeholder="Enter State"  value = {stateInputText}
                                 onChange = {(e) => updateStateInputText(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block theme-color-fill w-100" onClick = {() => handleAddingItems()}>Add State</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
            
            {state}
        </div>
    </div>)
    }
};

export default State;


{/* <div className="col-sm-3 offset-sm-1">
<div className="row state-col">
    <div className="col-md-4 mb-3">
        <div className="circles float-left">
            <div className="circle-with-text theme-color-text">+</div>
        </div>
    </div>
    <div className="col-md-6 offset-md-2 mb-3">
        <div className="state-name">
        <form>
            <div className="form-outline mb-4">
                <input type="" id="form1Example1" className="form-control style-inp" placeholder="Add State" />
            </div>
            <button type="submit" className="btn btn-primary btn-block theme-color-fill w-100">Add State</button>
        </form>
        </div>
    </div>
</div>
</div> */}