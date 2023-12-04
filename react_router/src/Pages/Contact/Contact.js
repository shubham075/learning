import { useNavigate, Outlet } from 'react-router-dom';

export const Contact = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log('job done!');
    navigate('/');
  }
  return (
    <main>
      <div className="productCard">Contact</div>
      <Outlet />
      <button className='productCard' onClick={handleSubmit}>Back To Home</button>
    </main>
  )
}
