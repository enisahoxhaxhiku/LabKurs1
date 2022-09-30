import React, {useState} from 'react'
import Constants from '../utilities/Constants'

export default function PerdoruesiCreateForm(props) {
    const initialFormData = Object.freeze({
        PerdoruesiName: "",
        PerdoruesiSurname: "",
        PerdoruesiEmail: "",
        
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

    const PerdoruesiToCreate = {
        PerdoruesiID: 0,
        PerdoruesiName: formData.PerdoruesiName,
        PerdoruesiSurname: formData.PerdoruesiSurname,
        PerdoruesiEmail: formData.PerdoruesiEmail
    };

    const url = Constants.API_URL_CREATE_PERDORUESI;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
           
        },
        body: JSON.stringify(perdoruesiToCreate)
      })
      .then(response => response.json())
      .then(responsePerdoruesiFromServer =>{
        console.log(responsePerdoruesiFromServer);
      })
      .catch((error) => {
          console.log(error);
        alert(error);
      });
      props.onPerdoruesiCreated(perdoruesiToCreate);
};

  return (
    <div>
        <form className='w-50 mx-auto'>
            <h2 className='mt-2'>Create new Perdoruesi</h2><br></br>
            <div className='mt-2'>
                <label className='h5 form-label'>Perdoruesi Name</label>
                <input value={formData.PerdoruesiName} name='PerdoruesiName' type="String" className="form-control" placeholder='Name...' onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Perdoruesi Surname</label>
                <input value={formData.PerdoruesiSurname} name='productId' type="String" className="form-control" placeholder='Surname...' onChange={handleChange} />
            </div>
        
            <div className='mt-2'>
                <label className='h5 form-label'>Perdoruesi Email</label>
                <input value={formData.PerdoruesiEmail} name='productId' type="String" className="form-control" placeholder='Email...' onChange={handleChange} />
            </div>
            

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-2">Submit</button>
            <button onClick={() => props.onPerdoruesiCreated(null)} className="btn btn-secondary btn-lf 2-100 mt-2">Cancel</button>
        </form>
    </div>
  )
}