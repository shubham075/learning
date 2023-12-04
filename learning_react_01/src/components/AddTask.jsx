import { useState } from 'react';
import './ShowTask.css';

export default function AddTask({ list, setList }) {
    const [Target, setTarget] = useState('');
    const [progress, setProgress] = useState(false);
    const handleReset = () => {
        setProgress(false);
        setTarget('');
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const taskData = {
            id: Math.floor(Math.random() * 10000),
            title: Target,
            completed: Boolean(progress),
        }
        console.log(taskData);
        setList([...list, taskData]);
        handleReset();
    }
    return (
        <div className='todoContainer'>
            <div className='todosubContainer'>
                <form onSubmit={handleSubmit}>
                    <div className='d-flex justify-content-between p-4'>
                        <div className="input-groupOne" style={{ width: '30vw' }}>
                            <input type="text" onChange={(e) => { setTarget(e.target.value) }} id="todoDescription" className="form-control" placeholder='Enter Task here' value={Target} />
                        </div>
                        <select className='ms-2' onChange={(event) => { setProgress(event.target.value) }} value={progress}>
                            <option value="true">Completed</option>
                            <option value="false">Pending</option>
                        </select>
                        <span className='btn btn-danger ms-2' onClick={handleReset}>Reset</span>
                        <button className='btn btn-success ms-2' type='submit'>Add</button>
                    </div>
                </form>
                <div className='d-dlex justify-content-center align-item-center'>
                    <p>Word Count: {Target.length}</p>
                </div>
            </div>
        </div>
    )
}
