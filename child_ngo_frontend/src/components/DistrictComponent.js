import { BsArrowRight } from 'react-icons/bs';
import {useState,useEffect} from 'react';
import axios from "axios";
import Login from './Login';
function District(){
    var token = localStorage.getItem('userToken');
    const [districtData,updateDistrictData] = useState([]);
    const [stateData,updateStateData] = useState([]);
    var stateOptions;
    var districtNumber = 0;

    async function fetchDistrictData() {
        if(token === null){
            return;
        }
        try{
            
            const districtData = await axios.get(`http://localhost:8080/district/getAll`,{ headers: {"auth-token" : `${token}`} });
            const dataFromAPI = districtData.data.results;
            updateDistrictData(dataFromAPI);
        }
        catch (e) {
            console.log(e);
            alert(e.message);
        }
        
    }
    async function fetchStateData() {
        if(token === null){
            return;
        }
        try{
            const statedata = await axios.get(`http://localhost:8080/state/getAll`,{ headers: {"auth-token" : `${token}`} });
            const dataFromAPI = statedata.data.results;
            updateStateData(dataFromAPI);
        }
        catch (e) {
            console.log(e);
            alert(e.message);
        }
        
    }
    useEffect(()=>{
        fetchDistrictData();
        fetchStateData();
    }, []);
    if(stateData){
    stateOptions = stateData.map((state)=> {
        return (
            <option key={state._id} value = {state.stateName}>{state.stateName}</option>
        )
    });
    }
    const district = districtData.map((district)=> {
    districtNumber++;
    return (
    <div className="col-md-4" key={district._id}>
            <div className="row district-col mb-3">
                <div className="col-md-4">
                    <div className="circles float-left">
                        <div className="circle-with-text theme-color-text">{districtNumber}</div>
                    </div>
                </div>
                <div className="col-md-4 d-flex align-items-center">
                    <div className="district-name">
                        {district.districtName}<br></br>{district.stateName}</div>
                </div>
                <div className="col-md-4 d-flex align-items-center justify-content-end   ">
                    <div className="district-name"><BsArrowRight size="40"/></div>
                </div>
            </div>
    </div>
    )
    });
    const [districtInputText, updateDistrictInputText] = useState("");
    const [stateInputText, updateStateInputText] = useState("");
    async function handleAddingItems() {
         const createTask = await axios.post(`http://localhost:8080/district/add`,{
                districtName: districtInputText,
                stateName: stateInputText,
                districtNumber: 1
         }, { headers: {"auth-token" : `${token}`} });
         console.log(createTask);
        //  alert("States added successfully");
         updateDistrictInputText("");
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
            <div className="row district-col mb-3">
                <div className="col-md-4">
                    <div className="circles float-left">
                        <div className="circle-with-text theme-color-text">+</div>
                    </div>
                </div>
                <div className="col-md-4 d-flex align-items-center">
                    <div className="district-name">
                    <form>
                        <div className="form-outline mb-4">
                            <select className="form-control style-inp focus:outline-none" onChange = {(e) => updateStateInputText(e.target.value)}> <option value="Select State" disabled selected>Select State</option>
                                {stateOptions}
                            </select>
                        </div>
                        <div className="form-outline mb-4">
                            <input type="" id="form1Example1" className="form-control style-inp focus:outline-none" placeholder="Enter District"  value = {districtInputText}
                                 onChange = {(e) => updateDistrictInputText(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block theme-color-fill w-100" onClick = {() => handleAddingItems()}>Add District</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
            
            {district}
        </div>
    </div>)
    }
};

export default District;