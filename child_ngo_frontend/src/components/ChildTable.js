import React from 'react';
import {useState,useEffect} from "react";
import axios from "axios";
import { BsArrowLeft } from 'react-icons/bs';
import {Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row } from 'reactstrap';
import Login from './Login';
function Child() {
    const [childData,updateChildData] = useState([]);
    const [modal, setModal] = useState(false);
    const [child,setChild] = useState();
    const toggle = () => setModal(!modal);
    var childRow;
    var childInfo;
    var token = localStorage.getItem('userToken');
    async function fetchChildData() {

        try{
            if(token === null){
                return;
            }
            const childdata = await axios.get(`http://localhost:8080/child/getAll`,{ headers: {"auth-token" : `${token}`} });
            const dataFromAPI = childdata.data.results;
            updateChildData(dataFromAPI);
        }
        catch (e) {
            console.log(e);
            alert(e.message);
        }
        
    }
    useEffect(()=>{
        fetchChildData();
        setModal(false);
        setChild(null);
    }, []);

    if(childData){
         childRow = childData.map((child)=>{
        return(
            <tr>
                <td>{child.name}</td>
                <td>{child.sex}</td>
                <td>{child.dateOfBirth.split("T")[0]}</td>
                <td>{child.fatherName}</td>
                <td>{child.motherName}</td>
                <td>{child.state}</td>
                <td>{child.district}</td>
                <td><Button onClick = {() => viewChild(child._id)}>View</Button></td>
            </tr>
        )
        })
    }
    function viewChild(props){
        const mychild = childData.filter((child)=> child._id === props)[0];
        console.log(mychild);
        setChild(mychild);
        console.log(child);
        setModal(!modal);


    }
    if(child){
        const ImageSrc = "/assets/childImages/" + child.imgName;
        const style = { width: "150px" };
        childInfo = 
            <div>
            <ModalHeader toggle={toggle}>{child.name}</ModalHeader>
                <ModalBody>
                <div className='container'>
                    <Row>
                    <Col md={1}>
                        <Button color="secondary" onClick={toggle} className="leftArrow"><BsArrowLeft size="30"/></Button>
                    </Col>
                
                    <Col sm="3" xs="6" md="10">
                        <img
                            alt="..."
                            className=" img-fluid rounded-circle shadow"
                            src="https://demos.creative-tim.com/argon-design-system-pro/assets/img/faces/team-2.jpg"
                            style={style}
                        ></img>
                        <div className='row mt-4'>
                            <div className='col-md-4'>Name : {child.name}</div>
                            <div className='col-md-4'>Sex : {child.sex}</div>
                            <div className='col-md-4'>Date of Birth : {child.dateOfBirth.split("T")[0]}</div>
                        </div>
                        <div className='row mt-4'>
                            <div className='col-md-4'>Father's Name : {child.fatherName}</div>
                            <div className='col-md-4'>Monther's Name : {child.motherName}</div>
                            <div className='col-md-4'>State : {child.state}</div>
                        </div>
                        <div className='row mt-4'>
                            <div className='col-md-4'>District : {child.district}</div>
                        </div>
                    </Col>
                        
                    </Row>
                </div>
                </ModalBody>
                <ModalFooter>
                
            </ModalFooter>
            </div>
    }
    if(token === null){
        return(<div><h3>Please Login First</h3>
        <Login />
        </div>);
     }
     else{
    return (
        <div className='container'>
            <Button><a href="/addchild">Add Child</a></Button>
            <Table hover variant="dark">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Sex</th>
                    <th>DOB</th>
                    <th>Father Name</th>
                    <th>Mother Name</th>
                    <th>State</th>
                    <th>District</th>
                </tr>
            </thead>
            <tbody>
                {childRow}
            </tbody>
            </Table>
            <Modal isOpen={modal} toggle={toggle} size='lg' className='childInfoModal'>
                {childInfo}
            </Modal>
        </div>
    )}
}

export default Child;
