
'use client';

import { useState } from 'react';
import ContactForm from './ContactForm';

export default function ContactButton() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <button
        className="fixed bottom-4 right-4 bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-full shadow-lg border border-gray-300"
        onClick={() => setShowForm(true)}
      >
        Contact Me
      </button>
      {showForm && <ContactForm onClose={() => setShowForm(false)} />}
    </>
  );
}
