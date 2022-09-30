import React, {useEffect, useState} from 'react'
import Constants from '../utilities/Constants';
import PerdoruesiCreateForm from './PerdoruesiCreateForm';
import PerdoruesiUpdateForm from './PerdoruesiUpdateForm';

function PerdoruesiTable()  {
    const [perdoruesi, setPerdoruesi] = useState([]);
    const [showingCreateNewPerdoruesiForm, setShowingCreateNewPerdoruesiForm] = useState(false);
    const [perdoruesiCurrentlyBeingUpdated, setPerdoruesiCurrentlyBeingUpdated] = useState(null);

    function getPerdoruesi(){
    const url = Constants.API_URL_GET_ALL_PERDORUESI;
    
    fetch(url, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(perdoruesiFromServer =>{
      console.log(perdoruesiFromServer);
      setPerdoruesi(perdoruesiFromServer.value);
    })
    .catch((error) => {
        alert(localStorage.getItem('token'))
      alert(error);
    });
  }

  function deletePerdoruesi(PerdoruesiID){
    const url = `${Constants.API_URL_DELETE_PERDORUESI_BY_ID}/${PerdoruesiID}`;
    
    fetch(url, {
      method: 'DELETE',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(responseFromServer =>{
      console.log(responseFromServer);
      onPerdoruesiDeleted(PerdoruesiID);
    })
    .catch((error) => {
        console.log(error);
      alert(error);
    });
  }
  
return (
    <div className='m-5'>
        
       { useEffect(() => {
    getPerdoruesi();
  }, [])}
        
        {(perdoruesi.length>0 && showingCreateNewPerdoruesiForm === false && perdoruesiCurrentlyBeingUpdated === null) && 
        localStorage.getItem('token')  && (
        localStorage.getItem('Role')==="Admin" ||
        localStorage.getItem('Role')==="HeadAdmin"  ||
        localStorage.getItem('Role')==="bHead"  ||
        localStorage.getItem('Role')==="dHead" ||
        localStorage.getItem('Role')==="secretary") 
        && renderPerdoruesiTable() }
        
        {showingCreateNewPerdoruesiForm && 
        localStorage.getItem('token')  && (
        localStorage.getItem('Role')==="Admin" ||
        localStorage.getItem('Role')==="HeadAdmin"  ||
        localStorage.getItem('Role')==="bHead"  ||
        localStorage.getItem('Role')==="dHead" ||
        localStorage.getItem('Role')==="secretary") 
        && <PerdoruesiCreateForm onPerdoruesiCreated={onPerdoruesiCreated}/>}

        {perdoruesiCurrentlyBeingUpdated!==null && 
        localStorage.getItem('token')  && (
        localStorage.getItem('Role')==="Admin" ||
        localStorage.getItem('Role')==="HeadAdmin"  ||
        localStorage.getItem('Role')==="bHead"  ||
        localStorage.getItem('Role')==="dHead" ||
        localStorage.getItem('Role')==="secretary") 
        && <PerdoruesiUpdateForm perdoruesi={perdoruesiCurrentlyBeingUpdated} onPerdoruesiUpdated={onPerdoruesiUpdated} />}
    </div>
  )
  
function renderPerdoruesiTable(){
    return(
        
        <div className='w-75 mx-auto'>
        <button onClick={() => setShowingCreateNewPerdoruesiForm(true)} className='btn btn-outline-dark btn-lg w-25 float-right m-1'>Create new Perdoruesi</button>
        <table className='table table-hover table-striped w-100 p-3 mx-auto'>
            <thead className='thead-dark'>
                <tr>
                    <th colSpan={9}>
                        <h4>Perdoruesi</h4>
                    </th>
                </tr>
                <tr>
                    <th>Perdoruesi Name</th>
                    <th>Perdoruesi Surname</th>
                    <th>Perdoruesi Email</th>                 
                    <th>Update</th>
                    {localStorage.getItem('token')  && (
                    localStorage.getItem('Role')==="Admin" ||
                    localStorage.getItem('Role')==="HeadAdmin"  ||
                    localStorage.getItem('Role')==="bHead" )  
                    &&<th>Delete</th>}
                </tr>
            </thead>
            <tbody>
                {perdoruesi.map((perdoruesi) => (
                    <tr key={perdoruesi.PerdoruesiID}>
                        <td>{perdoruesi.PerdoruesiName}</td>
                        <td>{perdoruesi.PerdoruesiSurname}</td>
                        <td>{perdoruesi.PerdoruesiEmail}</td>
                        <td><button onClick={() => setPerdoruesiCurrentlyBeingUpdated(perdoruesi) } className='btn btn-dark btn-lg mx-3 my-3'>Update</button></td>
                        {localStorage.getItem('token')  && (
                        localStorage.getItem('Role')==="Admin" ||
                        localStorage.getItem('Role')==="HeadAdmin"  ||
                        localStorage.getItem('Role')==="bHead" )  
                        && <td><button onClick={() => {if(window.confirm(`Are you sure you want to delete this perdorues?`)) deletePerdoruesi(perdoruesi.PerdoruesiID)}} className='btn btn-secondary btn-lg mx-3 my-3'>Delete</button></td>}
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
    )

    
}


function onPerdoruesiCreated(createdPerdoruesi){
    setShowingCreateNewPerdoruesiForm(false);
    if(createdPerdoruesi === null){
        return;
    }


    alert('Perdoruesisuccessfully created');

    getPerdoruesi();
}

function onPerdoruesiUpdated(updatedPerdoruesi){
    setPerdoruesiCurrentlyBeingUpdated(null);
    if(updatedPerdoruesi === null){
        return;
    }

    let perdoruesiCopy=[...perdoruesi];

    const index = perdoruesiCopy.findIndex((perdoruesiCopyPerdoruesi, currentIndex) => {
        if(perdoruesiCopyPerdoruesi.PerdoruesiID === updatedPerdoruesi.PerdoruesiID){
            return true;
        }
    });

    if(index!== -1){
        perdoruesiCopy[index] = updatedPerdoruesi;
    }
    setPerdoruesi(perdoruesiCopy);
    alert('Perdoruesi successfully updated');

    getPerdoruesi();
}


function onPerdoruesiDeleted(deletedPerdoruesiPerdoruesiID){
    let perdoruesiCopy=[...perdoruesi];

    const index = perdoruesiCopy.findIndex((perdoruesiCopyPerdoruesi, currentIndex) => {
        if(perdoruesiCopyPerdoruesi.PerdoruesiID === deletedPerdoruesiPerdoruesiID){
            return true;
        }
    });

    if(index!== -1){
        perdoruesiCopy.splice(index,1);
    }
    setPerdoruesi(perdoruesiCopy);
    alert('Perdoruesi successfully deleted');

    getPerdoruesi();
}

}


export default PerdoruesiTable