import React, {useState} from 'react'
import Constants from '../utilities/Constants'

export default function TakimetUpdateForm(props) {
    const initialFormData = Object.freeze({
        LlojiTakimit: props.takimet.LlojiTakimit,
        DataTakimit: props.takimet.DataTakimit,
        PerdoruesiID: props.takimet.PerdoruesiID,
        LokacioniID: props.takimet.LokacioniID
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

    const takimetToUpdate = {
        TakimetID: props.takimet.TakimetID,
        LlojiTakimit: formData.LlojiTakimit,
        DataTakimit: formData.DataTakimit,
        PerdoruesiID: formData.PerdoruesiID,
        LokacioniID: formData.LokacioniID
    };

    const url = Constants.API_URL_UPDATE_TAKIMET;

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(takimetToUpdate)
      })
      .then(response => response.json())
      .then(responseTakimetFromServer =>{
        console.log(responseTakimetFromServer);
      })
      .catch((error) => {
          console.log(error);
        alert(error);
      });
      props.onTakimetUpdated(takimetToUpdate);
};

  return (
    <div>
        <form className='w-50 mx-auto'>
            <h2 className='mt-2'>Updating Takimet</h2>
            <div className='mt-2'>
                <label className='h5 form-label'>Lloji i Takimit</label>
                <input value={formData.LlojiTakimit} name='LlojiTakimit' type="String" className="form-control" placeholder='Lloji i Takimit...' onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Data e Takimit</label>
                <input value={formData.DataTakimi} name='DataTakimit' type="date" className="form-control" placeholder='Data e Takimit...' onChange={handleChange} />
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
            <button onClick={() => props.onTakimetUpdated(null)} className="btn btn-secondary btn-lf 2-100 mt-3">Cancel</button>
        </form>
    </div>
  )
}