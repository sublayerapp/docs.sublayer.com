'use client';
import React, { useEffect } from 'react';

export function VideoEmbed({ src }) {
  return (
    <div style={{
      position: "relative",
      paddingBottom: "64.99999999999999%",
      height: 0
      }}>
      <iframe 
        src={src}
        frameBorder="0"
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        allowFullScreen={true}
        style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
        }}
      >
      </iframe>
    </div>
  )
}
