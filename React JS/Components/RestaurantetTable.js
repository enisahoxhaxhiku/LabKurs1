import React, {useEffect, useState} from 'react'
import Constants from '../utilities/Constants';
import RestaurantetCreateForm from './RestaurantetCreateForm';
import RestaurantetUpdateForm from './RestaurantetUpdateForm';

function RestaurantetTable()  {
    const [restaurantet, setRestaurantet] = useState([]);
    const [showingCreateNewRestaurantetForm, setShowingCreateNewRestaurantetForm] = useState(false);
    const [restaurantetCurrentlyBeingUpdated, setRestaurantetCurrentlyBeingUpdated] = useState(null);

    function getRestaurantet(){
    const url = Constants.API_URL_GET_ALL_RESTAURANTET;
    
    fetch(url, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(restaurantetFromServer =>{
      console.log(restaurantetFromServer);
      setRestaurantet(restaurantetFromServer.value);
    })
    .catch((error) => {
        alert(localStorage.getItem('token'))
      alert(error);
    });
  }

  function deleteRestaurantet(RestaurantetID){
    const url = `${Constants.API_URL_DELETE_RESTAURANTET_BY_ID}/${RestaurantetID}`;
    
    fetch(url, {
      method: 'DELETE',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(responseFromServer =>{
      console.log(responseFromServer);
      onRestaurantetDeleted(RestaurantetID);
    })
    .catch((error) => {
        console.log(error);
      alert(error);
    });
  }
  
return (
    <div className='m-5'>
        
       { useEffect(() => {
    getRestaurantet();
  }, [])}
        
        {(restaurantet.length>0 && showingCreateNewRestaurantetForm === false && restaurantetCurrentlyBeingUpdated === null) && 
        localStorage.getItem('token')  && (
        localStorage.getItem('Role')==="Admin" ||
        localStorage.getItem('Role')==="HeadAdmin"  ||
        localStorage.getItem('Role')==="bHead"  ||
        localStorage.getItem('Role')==="dHead" ||
        localStorage.getItem('Role')==="secretary") 
        && renderRestaurantetTable() }
        
        {showingCreateNewRestaurantetForm && 
        localStorage.getItem('token')  && (
        localStorage.getItem('Role')==="Admin" ||
        localStorage.getItem('Role')==="HeadAdmin"  ||
        localStorage.getItem('Role')==="bHead"  ||
        localStorage.getItem('Role')==="dHead" ||
        localStorage.getItem('Role')==="secretary") 
        && <RestaurantetCreateForm onRestaurantetCreated={onRestaurantetCreated}/>}

        {restaurantetCurrentlyBeingUpdated!==null && 
        localStorage.getItem('token')  && (
        localStorage.getItem('Role')==="Admin" ||
        localStorage.getItem('Role')==="HeadAdmin"  ||
        localStorage.getItem('Role')==="bHead"  ||
        localStorage.getItem('Role')==="dHead" ||
        localStorage.getItem('Role')==="secretary") 
        && <RestaurantetUpdateForm restaurantet={restaurantetCurrentlyBeingUpdated} onRestaurantetUpdated={onRestaurantetUpdated} />}
    </div>
  )
  
function renderRestaurantetTable(){
    return(
        
        <div className='w-75 mx-auto'>
        <button onClick={() => setShowingCreateNewRestaurantetForm(true)} className='btn btn-outline-dark btn-lg w-25 float-right m-1'>Create new Restaurant</button>
        <table className='table table-hover table-striped w-100 p-3 mx-auto'>
            <thead className='thead-dark'>
                <tr>
                    <th colSpan={9}>
                        <h4>Restaurantet</h4>
                    </th>
                </tr>
                <tr>
                    <th>Emri i Restaurantit</th>
                    <th>Adresa e Restaurantit</th>
                    <th>Menu e Restaurantit</th>
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
                {restaurantet.map((restaurantet) => (
                    <tr key={restaurantet.RestaurantetID}>
                        <td>{restaurantet.RestaurantetName}</td>
                        <td>{restaurantet.RestaurantetAddress}</td>
                        <td>{restaurantet.RestaurantetMenu}</td>
                        <td>{restaurantet.LokacioniID}</td>
                        <td><button onClick={() => setRestaurantetCurrentlyBeingUpdated(restaurantet) } className='btn btn-dark btn-lg mx-3 my-3'>Update</button></td>
                        {localStorage.getItem('token')  && (
                        localStorage.getItem('Role')==="Admin" ||
                        localStorage.getItem('Role')==="HeadAdmin"  ||
                        localStorage.getItem('Role')==="bHead" )  
                        && <td><button onClick={() => {if(window.confirm(`Are you sure you want to delete this Restaurant?`)) deleteRestaurantet(restaurantet.RestaurantetID)}} className='btn btn-secondary btn-lg mx-3 my-3'>Delete</button></td>}
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
    )

    
}


function onRestaurantetCreated(createdRestaurantet){
    setShowingCreateNewRestaurantetForm(false);
    if(createdRestaurantet === null){
        return;
    }


    alert('Restaurantet successfully created');

    getRestaurantet();
}

function onRestaurantetUpdated(updatedRestaurantet){
    setRestaurantetCurrentlyBeingUpdated(null);
    if(updatedRestaurantet === null){
        return;
    }
   ///////////$
    let restaurantetCopy=[...restaurantet];

    const index = restaurantetCopy.findIndex((restaurantetCopyRestaurantet, currentIndex) => {
        if(restaurantetCopyRestaurantet.RestaurantetID === updatedRestaurantet.RestaurantetID){
            return true;
        }
    });

    if(index!== -1){
        restaurantetCopy[index] = updatedRestaurantet;
    }
    setRestaurantet(restaurantetCopy);
    alert('Restaurantet successfully updated');

    getRestaurantet();
}


function onRestaurantetDeleted(deletedRestaurantetRestaurantetID){
    let restaurantetCopy=[...restaurantet];

    const index = restaurantetCopy.findIndex((restaurantetCopyRestaurantet, currentIndex) => {
        if(restaurantetCopyRestaurantet.RestaurantetID === deletedRestaurantetRestaurantetID){
            return true;
        }
    });

    if(index!== -1){
        restaurantetCopy.splice(index,1);
    }
    setRestaurantet(restaurantetCopy);
    alert('Resturantet successfully deleted');

    getResturantet();
}

}


export default ResturantetTable