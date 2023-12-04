import './App.css';

import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ShowTask from './components/ShowTask';
import AddTask from './components/AddTask';


function App() {
  const [list, setList] = useState([
    { id: '123', title: 'Learning React part I', description: 'JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file', completed: false },
    { id: '124', title: 'Learning React part II', description: 'JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file', completed: false },
    { id: '125', title: 'Learning Node and Express JS', description: 'JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file', completed: true },
    { id: '126', title: 'Learning WebRTC part I', description: 'JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file', completed: true },
  ]);

  let year = new Date().getFullYear();
  return (
    <>
      <Header />
      <main>
        <AddTask list={list} setList={setList} />
        <ShowTask list={list} setList={setList} />
      </main>
      <Footer newYear={year} />
    </>
  );
}

export default App;
