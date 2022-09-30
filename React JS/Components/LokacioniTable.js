import React, {useEffect, useState} from 'react'
import Constants from '../utilities/Constants';
import LokacioniCreateForm from './LokacioniCreateForm';
import LokacioniUpdateForm from './LokacioniUpdateForm';

function LokacioniTable()  {
    const [lokacioni, setLokacioni] = useState([]);
    const [showingCreateNewLokacioniForm, setShowingCreateNewLokacioniForm] = useState(false);
    const [lokacioniCurrentlyBeingUpdated, setLokacioniCurrentlyBeingUpdated] = useState(null);

    function getLokacioni(){
    const url = Constants.API_URL_GET_ALL_LOKACIONI;
    
    fetch(url, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(lokacioniFromServer =>{
      console.log(lokacioniFromServer);
      setLokacioni(lokacioniFromServer.value);
    })
    .catch((error) => {
        alert(localStorage.getItem('token'))
      alert(error);
    });
  }

  function deleteLokacioni(LokacioniID){
    const url = `${Constants.API_URL_DELETE_LOKACIONI_BY_ID}/${LokacioniID}`;
    
    fetch(url, {
      method: 'DELETE',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(responseFromServer =>{
      console.log(responseFromServer);
      onLokacioniDeleted(LokacioniID);
    })
    .catch((error) => {
        console.log(error);
      alert(error);
    });
  }
  
return (
    <div className='m-5'>
        
       { useEffect(() => {
    getLokacioni();
  }, [])}
        
        {(lokacioni.length>0 && showingCreateNewLokacioniForm === false && lokacioniCurrentlyBeingUpdated === null) && 
        localStorage.getItem('token')  && (
        localStorage.getItem('Role')==="Admin" ||
        localStorage.getItem('Role')==="HeadAdmin"  ||
        localStorage.getItem('Role')==="bHead"  ||
        localStorage.getItem('Role')==="dHead" ||
        localStorage.getItem('Role')==="secretary") 
        && renderLokacioniTable() }
        
        {showingCreateNewLokacioniForm && 
        localStorage.getItem('token')  && (
        localStorage.getItem('Role')==="Admin" ||
        localStorage.getItem('Role')==="HeadAdmin"  ||
        localStorage.getItem('Role')==="bHead"  ||
        localStorage.getItem('Role')==="dHead" ||
        localStorage.getItem('Role')==="secretary") 
        && <LokacioniCreateForm onLokacioniCreated={onLokacioniCreated}/>}

        {lokacioniCurrentlyBeingUpdated!==null && 
        localStorage.getItem('token')  && (
        localStorage.getItem('Role')==="Admin" ||
        localStorage.getItem('Role')==="HeadAdmin"  ||
        localStorage.getItem('Role')==="bHead"  ||
        localStorage.getItem('Role')==="dHead" ||
        localStorage.getItem('Role')==="secretary") 
        && <LokacioniUpdateForm lokacioni={lokacioniCurrentlyBeingUpdated} onLokacioniUpdated={onLokacioniUpdated} />}
    </div>
  )
  
function renderLokacioniTable(){
    return(
        
        <div className='w-75 mx-auto'>
        <button onClick={() => setShowingCreateNewLokacioniForm(true)} className='btn btn-outline-dark btn-lg w-25 float-right m-1'>Create new Lokacioni</button>
        <table className='table table-hover table-striped w-100 p-3 mx-auto'>
            <thead className='thead-dark'>
                <tr>
                    <th colSpan={9}>
                        <h4>Lokacioni</h4>
                    </th>
                </tr>
                <tr>
                    <th>Aktivitetet</th>
                    <th>Lloji i Lokacionit </th>             
                    <th>Update</th>
                    {localStorage.getItem('token')  && (
                    localStorage.getItem('Role')==="Admin" ||
                    localStorage.getItem('Role')==="HeadAdmin"  ||
                    localStorage.getItem('Role')==="bHead" )  
                    &&<th>Delete</th>}
                </tr>
            </thead>
            <tbody>
                {lokacioni.map((lokacioni) => (
                    <tr key={lokacioni.LokacioniID}>
                        <td>{lokacioni.Aktivitetet}</td>
                        <td>{lokacioni.LlojiLokacionit}</td>
                        <td><button onClick={() => setlokacioniCurrentlyBeingUpdated(lokacioni) } className='btn btn-dark btn-lg mx-3 my-3'>Update</button></td>
                        {localStorage.getItem('token')  && (
                        localStorage.getItem('Role')==="Admin" ||
                        localStorage.getItem('Role')==="HeadAdmin"  ||
                        localStorage.getItem('Role')==="bHead" )  
                        && <td><button onClick={() => {if(window.confirm(`Are you sure you want to delete this lokacion?`)) deleteLokacioni(lokacioni.LokacioniID)}} className='btn btn-secondary btn-lg mx-3 my-3'>Delete</button></td>}
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
    )

    
}


function onLokacioniCreated(createdLokacioni){
    setShowingCreateNewLokacioniForm(false);
    if(createdLokacioni === null){
        return;
    }


    alert('Lokacioni successfully created');

    getLokacioni();
}

function onLokacioniUpdated(updatedLokacioni){
    setLokacioniCurrentlyBeingUpdated(null);
    if(updatedLokacioni === null){
        return;
    }

    let lokacioniCopy=[...lokacioni];

    const index = lokacioniCopy.findIndex((lokacioniCopyLokacioni, currentIndex) => {
        if(lokacioniCopyLokacioni.LokacioniID === updatedLokacioni.LokacioniID){
            return true;
        }
    });

    if(index!== -1){
        lokacioniCopy[index] = updatedLokacioni;
    }
    setLokacioni(lokacioniCopy);
    alert('Lokacioni successfully updated');

    getLokacioni();
}


function onLokacioniDeleted(deletedLokacioniLokacioniiID){
    let lokacioniCopy=[...lokacioni];

    const index = lokacioniCopy.findIndex((lokacioniCopyLokacioni, currentIndex) => {
        if(lokacioniCopyLokacioni.LokacioniID === deletedLokacioniLokacioniID){
            return true;
        }
    });

    if(index!== -1){
        lokacioniCopy.splice(index,1);
    }
    setLokacioni(lokacioniCopy);
    alert('Lokacioni successfully deleted');

    getLokacioni();
}

}


export default LokacioniTable