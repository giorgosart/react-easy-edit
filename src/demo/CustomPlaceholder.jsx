import React from 'react';

export default props => {
  const val = props.value || 'redlohecalp motsuC';
  return (
    <div>
      {val.split('').reverse().join('')}
    </div>
  );
}