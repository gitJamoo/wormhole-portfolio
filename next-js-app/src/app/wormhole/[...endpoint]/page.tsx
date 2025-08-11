'use client';

import { useEffect, useState } from 'react';

export default function WormholePage() {
  const [content, setContent] = useState('');

  useEffect(() => {
    const generatedContent = localStorage.getItem('generatedContent');
    if (generatedContent) {
      setContent(generatedContent);
    }
  }, []);

  if (!content) {
    return <div>Loading content...</div>;
  }

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}
