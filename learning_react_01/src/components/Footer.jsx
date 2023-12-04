import React from 'react'

export default function Footer(props) {
    return (
        <footer>
            <p className='text-center p-1' style={
                {
                    color: '#ccc',
                }
            }>
                Copyright <i className="fa-solid fa-copyright"></i> {props.newYear}
            </p>
        </footer>




    )
}

