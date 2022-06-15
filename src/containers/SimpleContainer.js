import React from 'react';

export default SimpleContainer = ({ links }) => {
  const state = store.getSates();

  console.log('SimpleContainer state :>> ', state);

  return (
    <div>
      <ul>
        {links.maps((link, i) => `<li key={i}>${link.getAttribute && link.getAttribute('shopback-serp') || 'link'}</li>`) }
      </ul>
    </div>
  )
}