import React from 'react';

const ClickMe = ({ text }) => {
  const style = {
    cursor: 'pointer',
    userSelect: 'none',
    fontSize: '24px',
    color: 'hotpink'
  }

  const handleClick = () => {
    console.log('clicked ..');
    alert('click');
  }

  return (
    <div style={style}>
      <span className="click-text" onClick={handleClick}>{text}</span>
    </div>
  )
}

export default ClickMe;