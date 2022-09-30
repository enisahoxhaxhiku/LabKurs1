import React, {useEffect, useState} from 'react'
import Constants from '../utilities/Constants';
import KohaCreateForm from './KohaCreateForm';
import KohaUpdateForm from './KohaUpdateForm';

function KohaTable()  {
    const [koha, setKoha] = useState([]);
    const [showingCreateNewKohaForm, setShowingCreateNewKohaForm] = useState(false);
    const [kohaCurrentlyBeingUpdated, setKohaCurrentlyBeingUpdated] = useState(null);

    function getKoha(){
    const url = Constants.API_URL_GET_ALL_KOHA;
    
    fetch(url, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(kohaFromServer =>{
      console.log(kohaFromServer);
      setKoha(kohaFromServer.value);
    })
    .catch((error) => {
        alert(localStorage.getItem('token'))
      alert(error);
    });
  }

  function deleteKoha(KohaID){
    const url = `${Constants.API_URL_DELETE_KOHA_BY_ID}/${KohaID}`;
    
    fetch(url, {
      method: 'DELETE',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(responseFromServer =>{
      console.log(responseFromServer);
      onKohaDeleted(KohaID);
    })
    .catch((error) => {
        console.log(error);
      alert(error);
    });
  }
  
return (
    <div className='m-5'>
        
       { useEffect(() => {
    getKoha();
  }, [])}
        
        {(koha.length>0 && showingCreateNewKohaForm === false && kohaCurrentlyBeingUpdated === null) && 
        localStorage.getItem('token')  && (
        localStorage.getItem('Role')==="Admin" ||
        localStorage.getItem('Role')==="HeadAdmin"  ||
        localStorage.getItem('Role')==="bHead"  ||
        localStorage.getItem('Role')==="dHead" ||
        localStorage.getItem('Role')==="secretary") 
        && renderKohaTable() }
        
        {showingCreateNewKohaForm && 
        localStorage.getItem('token')  && (
        localStorage.getItem('Role')==="Admin" ||
        localStorage.getItem('Role')==="HeadAdmin"  ||
        localStorage.getItem('Role')==="bHead"  ||
        localStorage.getItem('Role')==="dHead" ||
        localStorage.getItem('Role')==="secretary") 
        && <KohaCreateForm onKohaCreated={onKohaCreated}/>}

        {kohaCurrentlyBeingUpdated!==null && 
        localStorage.getItem('token')  && (
        localStorage.getItem('Role')==="Admin" ||
        localStorage.getItem('Role')==="HeadAdmin"  ||
        localStorage.getItem('Role')==="bHead"  ||
        localStorage.getItem('Role')==="dHead" ||
        localStorage.getItem('Role')==="secretary") 
        && <KohaUpdateForm koha={kohaCurrentlyBeingUpdated} onKohaUpdated={onKohaUpdated} />}
    </div>
  )
  
function renderKohaTable(){
    return(
        
        <div className='w-75 mx-auto'>
        <button onClick={() => setShowingCreateNewKohaForm(true)} className='btn btn-outline-dark btn-lg w-25 float-right m-1'>Create new Koha</button>
        <table className='table table-hover table-striped w-100 p-3 mx-auto'>
            <thead className='thead-dark'>
                <tr>
                    <th colSpan={9}>
                        <h4>Koha</h4>
                    </th>
                </tr>
                <tr>
                    <th>Dita e Takimit</th>
                    <th>Muaji i Takimit</th>
                    <th>Viti i Takimit </th>
                    <th>Takimet ID</th>                 
                    <th>Update</th>
                    {localStorage.getItem('token')  && (
                    localStorage.getItem('Role')==="Admin" ||
                    localStorage.getItem('Role')==="HeadAdmin"  ||
                    localStorage.getItem('Role')==="bHead" )  
                    &&<th>Delete</th>}
                </tr>
            </thead>
            <tbody>
                {koha.map((koha) => (
                    <tr key={koha.KohaID}>
                        <td>{koha.LlojiTakimit}</td>
                        <td>{koha.KohaDay}</td>
                        <td>{koha.KohaMonth}</td>
                        <td>{koha.KohaYear}</td>
                        <td>{koha.TakimetID}</td>
                        <td><button onClick={() => setKohaCurrentlyBeingUpdated(koha) } className='btn btn-dark btn-lg mx-3 my-3'>Update</button></td>
                        {localStorage.getItem('token')  && (
                        localStorage.getItem('Role')==="Admin" ||
                        localStorage.getItem('Role')==="HeadAdmin"  ||
                        localStorage.getItem('Role')==="bHead" )  
                        && <td><button onClick={() => {if(window.confirm(`Are you sure you want to delete this Kohe?`)) deleteKoha(koha.KohaID)}} className='btn btn-secondary btn-lg mx-3 my-3'>Delete</button></td>}
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
    )

    
}


function onKohaCreated(createdKoha){
    setShowingCreateNewKohaForm(false);
    if(createdKoha === null){
        return;
    }


    alert('Koha successfully created');

    getKoha();
}

function onKohaUpdated(updatedKoha){
    setKohaCurrentlyBeingUpdated(null);
    if(updatedKoha === null){
        return;
    }
   ///////////$
    let kohaCopy=[...koha];

    const index = kohaCopy.findIndex((kohaCopyKoha, currentIndex) => {
        if(kohaCopyKoha.KohaID === updatedKoha.KohaID){
            return true;
        }
    });

    if(index!== -1){
        kohaCopy[index] = updatedKoha;
    }
    setKoha(kohaCopy);
    alert('Koha successfully updated');

    getKoha();
}


function onKohaDeleted(deletedKohaKohaID){
    let kohaCopy=[...koha];

    const index = kohaCopy.findIndex((kohaCopyKoha, currentIndex) => {
        if(kohaCopyKoha.KohaID === deletedKohaKohaID){
            return true;
        }
    });

    if(index!== -1){
        kohaCopy.splice(index,1);
    }
    setKoha(kohaCopy);
    alert('Koha successfully deleted');

    getKoha();
}

}


export default KohaTable