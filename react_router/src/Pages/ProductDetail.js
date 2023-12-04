import { useParams } from 'react-router-dom';

export const ProductDetail = () => {
  const params = useParams();

  return (
    <main>
      <div>ProductDetail - {params.id}</div>
    </main>
  )
}
