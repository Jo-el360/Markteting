
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
        AI Marketing Copy Generator
      </h1>
      <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
        Instantly generate compelling marketing copy for your products. Just provide a name and description, and let our AI do the rest.
      </p>
    </header>
  );
};
