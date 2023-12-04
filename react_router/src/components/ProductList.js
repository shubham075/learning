import { useSearchParams, useLocation } from 'react-router-dom';

export const ProductList = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  console.log(location);
  console.log(searchParams.get('firstKeyword'));
  console.log(searchParams.get('secondKeyword'));
  return (
    <div className="productCard">ProductList</div>
  )
}
