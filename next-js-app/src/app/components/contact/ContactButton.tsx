
'use client';

import { useState } from 'react';
import ContactForm from './ContactForm';

export default function ContactButton() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <button
        className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg"
        onClick={() => setShowForm(true)}
      >
        Contact Me
      </button>
      {showForm && <ContactForm onClose={() => setShowForm(false)} />}
    </>
  );
}
