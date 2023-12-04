import { useNavigate } from 'react-router-dom';

export const Contact = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log('job done!');
    navigate('/');
  }
  return (
    <>
      <div className="productCard">Contact</div>
      <button className='productCard' onClick={handleSubmit}>Back To Home</button>
    </>
  )
}
