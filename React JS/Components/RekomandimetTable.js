import React, {useEffect, useState} from 'react'
import Constants from '../utilities/Constants';
import RekomandimetCreateForm from './RekomandimetCreateForm';
import RekomandimetUpdateForm from './RekomandimetUpdateForm';

function RekomandimetTable()  {
    const [rekomandimet, setRekomandimet] = useState([]);
    const [showingCreateNewRekomandimetForm, setShowingCreateNewRekomandimetForm] = useState(false);
    const [rekomandimetCurrentlyBeingUpdated, setRekomandimetCurrentlyBeingUpdated] = useState(null);

    function getRekomandimet(){
    const url = Constants.API_URL_GET_ALL_REKOMANDIMET;
    
    fetch(url, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(rekomandimetFromServer =>{
      console.log(rekomandimetFromServer);
      setRekomandimet(rekomandimetFromServer.value);
    })
    .catch((error) => {
        alert(localStorage.getItem('token'))
      alert(error);
    });
  }

  function deleteRekomandimet(RekomandimetID){
    const url = `${Constants.API_URL_DELETE_REKOMANDIMET_BY_ID}/${RekomandimetID}`;
    
    fetch(url, {
      method: 'DELETE',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(responseFromServer =>{
      console.log(responseFromServer);
      onRekomandimetDeleted(RekomandimetID);
    })
    .catch((error) => {
        console.log(error);
      alert(error);
    });
  }
  
return (
    <div className='m-5'>
        
       { useEffect(() => {
    getRekomandimet();
  }, [])}
        
        {(rekomandimet.length>0 && showingCreateNewRekomandimetForm === false && rekomandimetCurrentlyBeingUpdated === null) && 
        localStorage.getItem('token')  && (
        localStorage.getItem('Role')==="Admin" ||
        localStorage.getItem('Role')==="HeadAdmin"  ||
        localStorage.getItem('Role')==="bHead"  ||
        localStorage.getItem('Role')==="dHead" ||
        localStorage.getItem('Role')==="secretary") 
        && renderRekomandimetTable() }
        
        {showingCreateNewRekomandimetForm && 
        localStorage.getItem('token')  && (
        localStorage.getItem('Role')==="Admin" ||
        localStorage.getItem('Role')==="HeadAdmin"  ||
        localStorage.getItem('Role')==="bHead"  ||
        localStorage.getItem('Role')==="dHead" ||
        localStorage.getItem('Role')==="secretary") 
        && <RekomandimetCreateForm onRekomandimetCreated={onRekomandimetCreated}/>}

        {rekomandimetCurrentlyBeingUpdated!==null && 
        localStorage.getItem('token')  && (
        localStorage.getItem('Role')==="Admin" ||
        localStorage.getItem('Role')==="HeadAdmin"  ||
        localStorage.getItem('Role')==="bHead"  ||
        localStorage.getItem('Role')==="dHead" ||
        localStorage.getItem('Role')==="secretary") 
        && <RekomandimetUpdateForm rekomandimet={rekomandimetCurrentlyBeingUpdated} onRekomandimetUpdated={onRekomandimetUpdated} />}
    </div>
  )
  
function renderRekomandimetTable(){
    return(
        
        <div className='w-75 mx-auto'>
        <button onClick={() => setShowingCreateNewRekomandimetForm(true)} className='btn btn-outline-dark btn-lg w-25 float-right m-1'>Create new Rekomandim</button>
        <table className='table table-hover table-striped w-100 p-3 mx-auto'>
            <thead className='thead-dark'>
                <tr>
                    <th colSpan={9}>
                        <h4>Rekomandimet</h4>
                    </th>
                </tr>
                <tr>
                    <th>Adresa e Rekomandimit</th>
                    <th>Restaurantet ID</th>                 
                    <th>Update</th>
                    {localStorage.getItem('token')  && (
                    localStorage.getItem('Role')==="Admin" ||
                    localStorage.getItem('Role')==="HeadAdmin"  ||
                    localStorage.getItem('Role')==="bHead" )  
                    &&<th>Delete</th>}
                </tr>
            </thead>
            <tbody>
                {rekomandimet.map((rekomandimet) => (
                    <tr key={rekomandimet.RekomandimetID}>
                        <td>{rekomandimet.RekomandimetAddress}</td>
                        <td>{rekomandimet.RestaurantetID}</td>
                        <td><button onClick={() => setRekomandimetCurrentlyBeingUpdated(rekomandimet) } className='btn btn-dark btn-lg mx-3 my-3'>Update</button></td>
                        {localStorage.getItem('token')  && (
                        localStorage.getItem('Role')==="Admin" ||
                        localStorage.getItem('Role')==="HeadAdmin"  ||
                        localStorage.getItem('Role')==="bHead" )  
                        && <td><button onClick={() => {if(window.confirm(`Are you sure you want to delete this Rekomandim?`)) deleteRekomandimet(rekomandimet.RekomandimetID)}} className='btn btn-secondary btn-lg mx-3 my-3'>Delete</button></td>}
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
    )

    
}


function onRekomandimetCreated(createdRekomandimet){
    setShowingCreateNewRekomandimetForm(false);
    if(createdRekomandimet === null){
        return;
    }


    alert('Rekomandimet successfully created');

    getRekomandimet();
}

function onRekomandimetUpdated(updatedRekomandimet){
    setRekomandimetCurrentlyBeingUpdated(null);
    if(updatedRekomandimet === null){
        return;
    }
   ///////////$
    let rekomandimetCopy=[...rekomandimet];

    const index = rekomandimetCopy.findIndex((rekomandimetCopyRekomandimet, currentIndex) => {
        if(rekomandimetCopyRekomandimet.RekomandimetID === updatedRekomandimet.RekomandimetID){
            return true;
        }
    });

    if(index!== -1){
        rekomandimetCopy[index] = updatedRekomandimet;
    }
    setRekomandimet(rekomandimetCopy);
    alert('Rekomandimet successfully updated');

    getRekomandimet();
}


function onRekomandimetDeleted(deletedRekomandimetRekomandimetID){
    let rekomandimetCopy=[...rekomandimet];

    const index = rekomandimetCopy.findIndex((rekomandimetCopyRekomandimet, currentIndex) => {
        if(rekomandimetCopyRekomandimet.RekomandimetID === deletedRekomandimetRekomandimetID){
            return true;
        }
    });

    if(index!== -1){
        rekomandimetCopy.splice(index,1);
    }
    setRekomandimet(rekomandimetCopy);
    alert('Rekomandimet successfully deleted');

    getRekomandimet();
}

}


export default RekomandimetTable