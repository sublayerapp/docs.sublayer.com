'use client';
import React, { useEffect } from 'react';

export function Iframe({ path }) {
  const src = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://blueprints.sublayer.com';

  // Add an event listener to resize the iframe
  useEffect(() => {
    function resizeIframe(event) {
      console.log(event);
      const iframe = document.querySelector('iframe');
      iframe.style.height = event.data.height + 'px';
    }

    window.addEventListener('message', resizeIframe);

    return () => {
      window.removeEventListener('message', resizeIframe);
    }
  })

  return (
    <iframe src={`${src}/${path}`} width="100%" title="Rails Content" className="min-h-52"></iframe>
  )
}
