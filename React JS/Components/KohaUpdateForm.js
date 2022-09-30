import React, {useState} from 'react'
import Constants from '../utilities/Constants'

export default function KohaUpdateForm(props) {
    const initialFormData = Object.freeze({
        KohaDay: props.koha.KohaDay,
        KohaMonth: props.koha.KohaMonth,
        KohaYear: props.koha.KohaYear,
        TakimetID: props.koha.TakimetID
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

    const kohaToUpdate = {
        KohaID: props.koha.KohaID,
        KohaDay: formData.KohaDay,
        KohaMonth: formData.KohaMonth,
        KohaYear: formData.KohaYear,
        TakimetID: formData.TakimetID
    };

    const url = Constants.API_URL_UPDATE_KOHA;
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(kohaToUpdate)
      })
      .then(response => response.json())
      .then(responseKohaFromServer =>{
        console.log(responseKohaFromServer);
      })
      .catch((error) => {
          console.log(error);
        alert(error);
      });
      props.onKohaUpdated(kohaToUpdate);
};

  return (
    <div>
        <form className='w-50 mx-auto'>
            <h2 className='mt-2'>Updating Koha</h2>
            <div className='mt-2'>
                <label className='h5 form-label'>Dita e Takimit</label>
                <input value={formData.KohaDay} name='KohaDay' type="number" className="form-control" placeholder='Dita e Takimit...' onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Muaji i Takimit</label>
                <input value={formData.KohaMonth} name='KohaMonth' type="String" className="form-control" placeholder='Muaji i Takimit...' onChange={handleChange} />
            </div>
            <div className='mt-2'>
                <label className='h5 form-label'>Viti i Takimit </label>
                <input value={formData.KohaYear} name='KohaYear' type="number" className="form-control" placeholder='Viti i Takimit...' onChange={handleChange} />
            </div>

            <div className='mt-2'>
                <label className='h5 form-label'>Takimet ID</label>
                <input value={formData.TakimetID} name='TakimetID' type="number" className="form-control" placeholder='Takimet ID...' onChange={handleChange} />
            </div>

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-2">Submit</button>
            <button onClick={() => props.onKohaUpdated(null)} className="btn btn-secondary btn-lf 2-100 mt-3">Cancel</button>
        </form>
    </div>
  )
}