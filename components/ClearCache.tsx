"use client";

import React from 'react';

const ClearCacheButton = () => {
  const clearCache = () => {
    localStorage.clear();
    alert("Cache cleared! Reload the page to see the changes.");
  };

  return (
    <button onClick={clearCache} className='z-[999999]'>
      Clear Cache
    </button>
  );
};

export default ClearCacheButton;
