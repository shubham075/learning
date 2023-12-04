import './ShowTask.css'

export const TaskCard = ({ list, handleDelete }) => {
    return (
        <>
            {/* <div className='card' style={{ maxWidth: '40vw', border: ShowTask ? '2px solid green' : '2px solid red' }}> */}
            <li key={list.id} className={list.completed ? "completed" : "incomplete"}>
                <div className='card' style={{ maxWidth: '40vw', margin: '1vh' }}>
                    <div className="card-body d-flex justify-content-between">
                        <h5 className="card-title">{list.id}-{list.title}</h5>
                        <div className="card-button">
                            <button type="button" className="btn btn-info me-1"><i className='fa-solid fa-pen'></i></button>
                            <button type="button" className="btn btn-danger" onClick={() => handleDelete(list.id)}>
                                <i className='fa-solid fa-trash'></i>
                            </button>
                        </div>
                    </div>
                </div>
            </li>
        </>
    )
}
