import React, {useEffect, useState} from 'react'
import Constants from '../utilities/Constants';
import TakimetCreateForm from './TakimetCreateForm';
import TakimetUpdateForm from './TakimetUpdateForm';

function TakimetTable()  {
    const [takimet, setTakimet] = useState([]);
    const [showingCreateNewTakimetForm, setShowingCreateNewTakimetForm] = useState(false);
    const [takimetCurrentlyBeingUpdated, setTakimetCurrentlyBeingUpdated] = useState(null);

    function getTakimet(){
    const url = Constants.API_URL_GET_ALL_TAKIMET;
    
    fetch(url, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(takimetFromServer =>{
      console.log(takimetFromServer);
      setTakimet(takimetFromServer.value);
    })
    .catch((error) => {
        alert(localStorage.getItem('token'))
      alert(error);
    });
  }

  function deleteTakimet(TakimetID){
    const url = `${Constants.API_URL_DELETE_TAKIMET_BY_ID}/${TakimetID}`;
    
    fetch(url, {
      method: 'DELETE',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(responseFromServer =>{
      console.log(responseFromServer);
      onTakimetDeleted(TakimetID);
    })
    .catch((error) => {
        console.log(error);
      alert(error);
    });
  }
  
return (
    <div className='m-5'>
        
       { useEffect(() => {
    getTakimet();
  }, [])}
        
        {(takimet.length>0 && showingCreateNewTakimetForm === false && takimetCurrentlyBeingUpdated === null) && 
        localStorage.getItem('token')  && (
        localStorage.getItem('Role')==="Admin" ||
        localStorage.getItem('Role')==="HeadAdmin"  ||
        localStorage.getItem('Role')==="bHead"  ||
        localStorage.getItem('Role')==="dHead" ||
        localStorage.getItem('Role')==="secretary") 
        && renderTakimetTable() }
        
        {showingCreateNewTakimetForm && 
        localStorage.getItem('token')  && (
        localStorage.getItem('Role')==="Admin" ||
        localStorage.getItem('Role')==="HeadAdmin"  ||
        localStorage.getItem('Role')==="bHead"  ||
        localStorage.getItem('Role')==="dHead" ||
        localStorage.getItem('Role')==="secretary") 
        && <TakimetCreateForm onTakimetCreated={onTakimetCreated}/>}

        {takimetCurrentlyBeingUpdated!==null && 
        localStorage.getItem('token')  && (
        localStorage.getItem('Role')==="Admin" ||
        localStorage.getItem('Role')==="HeadAdmin"  ||
        localStorage.getItem('Role')==="bHead"  ||
        localStorage.getItem('Role')==="dHead" ||
        localStorage.getItem('Role')==="secretary") 
        && <TakimetUpdateForm takimet={takimetCurrentlyBeingUpdated} onTakimetUpdated={onTakimetUpdated} />}
    </div>
  )
  
function renderTakimetTable(){
    return(
        
        <div className='w-75 mx-auto'>
        <button onClick={() => setShowingCreateNewTakimetForm(true)} className='btn btn-outline-dark btn-lg w-25 float-right m-1'>Create new Takim</button>
        <table className='table table-hover table-striped w-100 p-3 mx-auto'>
            <thead className='thead-dark'>
                <tr>
                    <th colSpan={9}>
                        <h4>Takimet</h4>
                    </th>
                </tr>
                <tr>
                    <th>Lloji i Takimit</th>
                    <th>Data e Takimit</th>
                    <th>Perdoruesi ID</th>
                    <th>Lokacioni ID</th>                 
                    <th>Update</th>
                    {localStorage.getItem('token')  && (
                    localStorage.getItem('Role')==="Admin" ||
                    localStorage.getItem('Role')==="HeadAdmin"  ||
                    localStorage.getItem('Role')==="bHead" )  
                    &&<th>Delete</th>}
                </tr>
            </thead>
            <tbody>
                {takimet.map((takimet) => (
                    <tr key={takimet.TakimetID}>
                        <td>{takimet.LlojiTakimit}</td>
                        <td>{takimet.DataTakimit}</td>
                        <td>{takimet.PerdoruesiID}</td>
                        <td>{takimet.LokacioniID}</td>
                        <td><button onClick={() => setTakimetCurrentlyBeingUpdated(takimet) } className='btn btn-dark btn-lg mx-3 my-3'>Update</button></td>
                        {localStorage.getItem('token')  && (
                        localStorage.getItem('Role')==="Admin" ||
                        localStorage.getItem('Role')==="HeadAdmin"  ||
                        localStorage.getItem('Role')==="bHead" )  
                        && <td><button onClick={() => {if(window.confirm(`Are you sure you want to delete this Takim?`)) deleteTakimet(takimet.TakimetID)}} className='btn btn-secondary btn-lg mx-3 my-3'>Delete</button></td>}
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
    )

    
}


function onTakimetCreated(createdTakimet){
    setShowingCreateNewTakimetForm(false);
    if(createdTakimet === null){
        return;
    }


    alert('Takimet successfully created');

    getTakimet();
}

function onTakimetUpdated(updatedTakimet){
    setTakimetCurrentlyBeingUpdated(null);
    if(updatedTakimet === null){
        return;
    }
   ///////////$
    let takimetCopy=[...takimet];

    const index = takimetCopy.findIndex((takimetCopyTakimet, currentIndex) => {
        if(takimetCopyTakimet.TakimetID === updatedTakimet.TakimetID){
            return true;
        }
    });

    if(index!== -1){
        takimetCopy[index] = updatedTakimet;
    }
    setTakimet(takimetCopy);
    alert('Takimet successfully updated');

    getTakimet();
}


function onTakimetDeleted(deletedTakimetTakimetID){
    let takimetCopy=[...takimet];

    const index = takimetCopy.findIndex((takimetCopyTakimet, currentIndex) => {
        if(takimetCopyTakimet.TakimetID === deletedTakimetTakimetID){
            return true;
        }
    });

    if(index!== -1){
        takimetCopy.splice(index,1);
    }
    setTakimet(takimetCopy);
    alert('Takimet successfully deleted');

    getTakimet();
}

}


export default TakimetTable