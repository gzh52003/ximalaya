import React from 'react'

function User(props) {
    // console.log(props)
    return (
        <p className='user' style={{ color: '#0cf' }} >
            <span style={{ color: "#c8c" }}>欢迎您！</span>
            {props.user}
        </p>
    )
}
export default User
