import React, { useState } from 'react'
import './ShowTask.css'
import { TaskCard } from './TaskCard'

export default function ShowTask({ list, setList }) {

    const [show, setShow] = useState(true);

    function handleDelete(id) {
        setList(list.filter((element) => element.id !== id));
    }

    return (
        <div className='todoContainer'>
            <div className='todosubContainer'>
                <div className='todoHeader'>
                    <h2>Todo list </h2>
                    <button type='button' className='btn btn-primary' onClick={() => setShow(!show)}>{show ? 'Hide Tasks' : 'Show Tasks'}</button>
                </div>
                <ul>
                    {
                        show && list.map((li) => (
                            <TaskCard key={li.id} list={li} handleDelete={handleDelete} />
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}
