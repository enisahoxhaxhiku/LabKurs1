import React, {useState} from 'react'
import Constants from '../utilities/Constants'

export default function RestaurantetUpdateForm(props) {
    const initialFormData = Object.freeze({
        RestaurantetName: props.restaurantet.RestaurantetName,
        RestaurantetAddress: props.restaurantet.RestaurantetAddress,
        RestaurantetMenu: props.restaurantet.RestaurantetMenu,
        LokacioniID: props.restaurantet.LokacioniID
    });

  const [formData, setFormData] = useState(initialFormData);

  

const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
};

const handleSubmit = (e) => {
    e.preventDefault();

    const restaurantetToUpdate = {
        RestaurantetID: props.restaurantet.RestaurantetID,
        RestaurantetName: formData.RestaurantetName,
        RestaurantetAddress: formData.RestaurantetAddress,
        RestaurantetMenu: formData.RestaurantetMenu,
        LokacioniID: formData.LokacioniID
    };

    const url = Constants.API_URL_UPDATE_RESTAURANTET;

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(restaurantetToUpdate)
      })
      .then(response => response.json())
      .then(responseRestaurantetFromServer =>{
        console.log(responseRestaurantetFromServer);
      })
      .catch((error) => {
          console.log(error);
        alert(error);
      });
      props.onRestaurantetUpdated(restaurantetToUpdate);
};

  return (
    <div>
        <form className='w-50 mx-auto'>
            <h2 className='mt-2'>Updating Restaurantet</h2>
            <div className='mt-2'>
                <label className='h5 form-label'>Emri i Restaurantit</label>
                <input value={formData.RestaurantiName} name='RestaurantiName' type="String" className="form-control" placeholder='Emri i Restaurantit...' onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Adresa e Restaurantit</label>
                <input value={formData.RestaurantetAddress} name='RestaurantetAddress' type="date" className="form-control" placeholder='Adresa e Restaurantit...' onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Menu e Restaurantit</label>
                <input value={formData.RestaurantetMenu} name='RestaurantetMenu' type="number" className="form-control" placeholder='Menu e Restaurantit...' onChange={handleChange} />
            </div>

            <div className='mt-2'>
                <label className='h5 form-label'>Lokacioni ID</label>
                <input value={formData.LokacioniID} name='LokacioniID' type="number" className="form-control" placeholder='Lokacioni ID...' onChange={handleChange} />
            </div>

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-2">Submit</button>
            <button onClick={() => props.onRestaurantetUpdated(null)} className="btn btn-secondary btn-lf 2-100 mt-3">Cancel</button>
        </form>
    </div>
  )
}