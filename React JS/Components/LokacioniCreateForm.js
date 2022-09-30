import React, {useState} from 'react'
import Constants from '../utilities/Constants'

export default function LokacioniCreateForm(props) {
    const initialFormData = Object.freeze({
        Aktivitetet: "",
        LlojiLokacionit: "",
      
        
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

    const LokacioniToCreate = {
        LokacioniID: 0,
        Aktivitetet: formData.Aktivitetet,
        LlojiLokacionit: formData.LlojiLokacionit
        
    };

    const url = Constants.API_URL_CREATE_LOKACIONI;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
           
        },
        body: JSON.stringify(lokacioniToCreate)
      })
      .then(response => response.json())
      .then(responseLokacioniFromServer =>{
        console.log(responseLokacioniFromServer);
      })
      .catch((error) => {
          console.log(error);
        alert(error);
      });
      props.onLokacioniCreated(lokacioniToCreate);
};

  return (
    <div>
        <form className='w-50 mx-auto'>
            <h2 className='mt-2'>Create new Lokacion</h2><br></br>
            <div className='mt-2'>
                <label className='h5 form-label'>Aktivitetet</label>
                <input value={formData.PerdoruesiName} name='PerdoruesiName' type="String" className="form-control" placeholder='Name...' onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Lloji i Lokacionit</label>
                <input value={formData.PerdoruesiSurname} name='productId' type="String" className="form-control" placeholder='Surname...' onChange={handleChange} />
            </div>
        
           
            

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-2">Submit</button>
            <button onClick={() => props.onLokacioniCreated(null)} className="btn btn-secondary btn-lf 2-100 mt-2">Cancel</button>
        </form>
    </div>
  )
}