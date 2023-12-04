import { useParams } from 'react-router-dom';

export const ProductDetail = () => {
  const params = useParams();

  return (
    <div>ProductDetail - {params.id}</div>
  )
}
