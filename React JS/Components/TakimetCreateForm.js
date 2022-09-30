import React, {useState} from 'react'
import Constants from '../utilities/Constants'

export default function TakimetCreateForm(props) {
    const initialFormData = Object.freeze({
        LlojiTakimit: "",
        DataTakimit: "",
        PerdoruesiID: "",
        LokacioniID: ""
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

    const takimetToCreate = {
        TakimetID: 0,
        LlojiTakimit: formData.LlojiTakimit,
        DataTakimit: formData.DataTakimit,
        PerdoruesiID: formData.PerdoruesiID,
        LokacioniID: formData.LokacioniID
    };

    const url = Constants.API_URL_CREATE_TAKIMET;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
           
        },
        body: JSON.stringify(takimetToCreate)
      })
      .then(response => response.json())
      .then(responseTakimetFromServer =>{
        console.log(responseTakimetFromServer);
      })
      .catch((error) => {
          console.log(error);
        alert(error);
      });
      props.onTakimetCreated(takimetToCreate);
};

  return (
    <div>
        <form className='w-50 mx-auto'>
            <h2 className='mt-2'>Create new Takim</h2><br></br>
            <div className='mt-2'>
                <label className='h5 form-label'>Lloji i Takimit</label>
                <input value={formData.LlojiTakimit} name='LlojiTakimit' type="String" className="form-control" placeholder='Lloji i Takimit...' onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Data e Takimit</label>
                <input value={formData.DataTakimit} name='DataTakimit' type="date" className="form-control" placeholder='Data e Takimit...' onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Perdoruesi ID</label>
                <input value={formData.PerdoruesiID} name='PerdoruesiID' type="number" className="form-control" placeholder='Perdoruesi ID...' onChange={handleChange} />
            </div>

            <div className='mt-2'>
                <label className='h5 form-label'>Lokacioni ID</label>
                <input value={formData.LokacioniID} name='LokacioniID' type="number" className="form-control" placeholder='Lokacioni ID...' onChange={handleChange} />
            </div>

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-2">Submit</button>
            <button onClick={() => props.onTakimetCreated(null)} className="btn btn-secondary btn-lf 2-100 mt-2">Cancel</button>
        </form>
    </div>
  )
}