import React from 'react'
import {useState,useEffect} from 'react';
import axios from "axios";
import {useHistory} from "react-router-dom";
import Login from './Login';
function AddChild() {
   var token = localStorage.getItem('userToken');
   const [stateData,updateStateData] = useState([]);
   const [districtData,updateDistrictData] = useState([]);
   const [state,updateState] = useState();
   const history = useHistory();
   var stateOptions,districtOptions;
   const [file, setFile] = useState();
   const [fileName, setFileName] = useState("");

   const saveFile = (e) => {
     setFile(e.target.files[0]);
     setFileName(e.target.files[0].name);
   };
   async function fetchStateData() {

      try{
         if(token === null){
            return;
        }
          const statedata = await axios.get(`http://localhost:8080/state/getAll`,{ headers: {"auth-token" : `${token}`} });
          const dataFromAPI = statedata.data.results;
          updateStateData(dataFromAPI);
      }
      catch (e) {
          console.log(e);
          alert(e.message);
      }
      
  }
  async function fetchDistrictData(state_) {
   const state = state_;
   try{
       const Districtdata = await axios.get(`http://localhost:8080/district/${state}`,{ headers: {"auth-token" : `${token}`} });
       const dataFromAPI = Districtdata.data.results;
       updateDistrictData(dataFromAPI);
   }
   catch (e) {
       console.log(e);
       alert(e.message);
   }
   
}
  
  useEffect(()=>{
      fetchStateData();
  }, []);
   if(districtData){
      districtOptions = districtData.map((district)=> {
          return (
              <option key={district._id} value = {district.districtName}>{district.districtName}</option>
          )
      });
      }
   if(stateData){
      stateOptions = stateData.map((state)=> {
            return (
               <option key={state._id} value = {state.stateName}>{state.stateName}</option>
            )
      });
      }
   function handleSelectState(state){
      updateState(state);
      fetchDistrictData(state);
   }
   async function handleAddChild(event) {
      event.preventDefault();

      try{
         const createTask = await axios.post(`http://localhost:8080/child/add`,{
               name: event.target.child_name.value,
               sex: event.target.sex.value,
               dateOfBirth: event.target.dob.value,
               fatherName: event.target.fname.value,
               motherName: event.target.mname.value,
               state: event.target.state.value,
               district: event.target.district.value,
               imgName: fileName,
               img: file
         }, { headers: {"auth-token" : `${token}`} });
         alert('Child ' + event.target.child_name.value + ' added succesfully');
         history.push("/child");
      }
      catch(e){
         console.log(e);
         alert(e.message);
      }
     //  alert("States added successfully");
     //  fetchStateData();
 }
 if(token === null){
      return(<div><h3>Please Login First</h3>
      <Login />
      </div>);
   }
   else{
    return (
        <div className="form-content">
            <div className="form">
                <h2 className="form-title">Add Child</h2>
                {/* <form className="form" id="form">
                     <div className="form-group">
                        <input type="text" name="name" id="name" autoComplete="off" placeholder="Name"></input>
                     </div>
                     <div className="form-group">
                        <label for="sex">Sex</label>
                          <select name="sex" id="sex">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                           </select>
                     </div>
                     <div className="form-group">
                        <input type="text" name="name" id="name" autoComplete="off" placeholder="Name"></input>
                     </div>
                     <div className="form-group">
                        <input type="text" name="name" id="name" autoComplete="off" placeholder="Name"></input>
                     </div>
                     <div className="form-group">
                        <input type="text" name="name" id="name" autoComplete="off" placeholder="Name"></input>
                     </div>
                     <div className="form-group">
                        <input type="text" name="name" id="name" autoComplete="off" placeholder="Name"></input>
                     </div>
                     <div className="form-group">
                        <input type="text" name="name" id="name" autoComplete="off" placeholder="Name"></input>
                     </div>
                </form> */}
               <div className="container">
                  <div className="row">
                     <div className="col-md-8 offset-md-2">
                        <form onSubmit={handleAddChild}>
                           <div className="form-outline mb-4">
                              <input type="" required name="child_name" id="form1Example1" className="form-control style-inp" placeholder="Name"/>
                           </div>
                           <div className="form-outline mb-4">
                              <select name="sex" required id="sex" className="form-control style-inp">
                                 <option value="Sex" disabled selected>Sex</option>
                                 <option value="Male">Male</option>
                                 <option value="Female">Female</option>
                              </select>
                           </div>
                           <div className="form-outline mb-4">
                              <input type="date" name="dob" required id="form1Example2" className="form-control style-inp" placeholder="Date of Birth"/>
                           </div>
                           <div className="form-outline mb-4">
                              <input type="text" name="fname" required id="form1Example2" className="form-control style-inp" placeholder="Father's Name"/>
                           </div> 
                           <div className="form-outline mb-4">
                              <input type="text" name="mname" required id="form1Example2" className="form-control style-inp" placeholder="Mother's Name"/>
                           </div>  
                           <div className="form-outline mb-4">
                              <select className="form-control style-inp focus:outline-none" name="state" onChange = {(e) => handleSelectState(e.target.value)}> <option value="Select State" disabled selected>Select State</option>
                                 {stateOptions}
                              </select>
                           </div> 
                           <div className="form-outline mb-4">
                              <select className="form-control style-inp focus:outline-none" name="district"> <option value="Select District" disabled selected>Select District</option>
                                 {districtOptions}
                              </select>
                           </div>
                           {/* <div className="form-outline mb-4">
                              <input type="file" onChange={saveFile}/>
                               
                           </div>  */}
                            
                           <button type="submit" className="btn btn-primary btn-block theme-color-fill w-100">Add Child</button>
                     </form>
                     </div>
                  </div>
               </div>

            </div>
        </div>
    )
   }
}

export default AddChild
