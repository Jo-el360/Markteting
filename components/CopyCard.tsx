
import React, { useState, useCallback } from 'react';

interface CopyCardProps {
  title: string;
  content: string;
}

const ClipboardIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const CheckIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);


export const CopyCard: React.FC<CopyCardProps> = ({ title, content }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
        console.error("Failed to copy text: ", err);
    });
  }, [content]);

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl shadow-md overflow-hidden relative p-6">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-cyan-400">{title}</h3>
        <button
            onClick={handleCopy}
            className={`
                px-3 py-1.5 text-sm font-medium rounded-md flex items-center transition-colors duration-200
                ${copied 
                    ? 'bg-green-600/20 text-green-400' 
                    : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                }
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500
            `}
        >
            {copied ? <CheckIcon className="w-4 h-4 mr-1.5" /> : <ClipboardIcon className="w-4 h-4 mr-1.5" />}
            {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <p className="mt-4 text-slate-300 whitespace-pre-wrap">{content}</p>
    </div>
  );
};
