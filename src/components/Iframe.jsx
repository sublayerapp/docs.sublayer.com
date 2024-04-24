'use client';
import React, { useEffect } from 'react';

export function Iframe({ path, example=true }) {
  const src = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://blueprints.sublayer.com';

  // Add an event listener to resize the iframe
  useEffect(() => {
    function resizeIframe(event) {
      const iframe = Array.from(document.querySelectorAll('iframe')).find(iframe => iframe.contentWindow === event.source)
      iframe.style.height = event.data.height + 'px';
    }

    window.addEventListener('message', resizeIframe);

    return () => {
      window.removeEventListener('message', resizeIframe);
    }
  })

  return (
    <iframe src={`${src}/${path}?example=${example}`} width="100%" title="Rails Content" className="min-h-52"></iframe>
  )
}
