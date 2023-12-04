import { useEffect } from "react";
import pagenotfound from "../assets/images/pagenotfound.png";
import { Link } from 'react-router-dom';
export const PageNotFound = () => {

  useEffect(() => {
    document.title = `Page Not Found / Cinemate`;
  });

  return (
    <main>
      <section className="flex flex-col justify-center px-2">
        <div className="flex flex-col items-center my-4">
          <p className="text-5xl text-gray-700 dark:text-white font-bold">404 -Page not found</p>
          <div className="max-w-xl m-5">
            <img className="rounded" src={pagenotfound} alt="404- page not found" />
          </div>
          <Link to='/'>
            <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Back To Home</button>
          </Link>
        </div>
      </section>
    </main>
  )
}
