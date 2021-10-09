import React from 'react';
import {useState,useEffect} from "react";
import axios from "axios";
import {Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
function Child() {
    var childRow;
    const [childData,updateChildData] = useState([]);
    const [modal, setModal] = useState(false);
    const [child,setChild] = useState(false);
    const toggle = () => setModal(!modal);
    async function fetchChildData() {

        try{
            const childdata = await axios.get(`http://localhost:8080/child/getAll`);
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
        console.log(childData);
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
        console.log(childRow);
    }
    function viewChild(props){
        console.log(props);
        const mychild = childData.filter((child)=> child._id === props);
        setChild(mychild);
        setModal(!modal);
    }
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
            <Modal isOpen={modal} toggle={toggle} size='lg'>
                <ModalHeader toggle={toggle}>Child Info</ModalHeader>
                <ModalBody>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-4'>{}</div>
                    </div>
                </div>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default Child
