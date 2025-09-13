
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header.tsx';
import { TextInput } from './components/TextInput.tsx';
import { TextArea } from './components/TextArea.tsx';
import { Button } from './components/Button.tsx';
import { Spinner } from './components/Spinner.tsx';
import { Alert } from './components/Alert.tsx';
import { CopyCard } from './components/CopyCard.tsx';
import { generateMarketingCopy } from './services/geminiService.ts';
import type { GeneratedCopy } from './types.ts';
import { CopyType } from './types.ts';

const App: React.FC = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [generatedCopy, setGeneratedCopy] = useState<GeneratedCopy[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!productName.trim() || !productDescription.trim()) {
      setError('Please fill in both product name and description.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedCopy(null);

    try {
      const result = await generateMarketingCopy(productName, productDescription);
      setGeneratedCopy(result);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to generate copy: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [productName, productDescription]);

  const getTitleForCopyType = (type: CopyType): string => {
    switch (type) {
      case CopyType.SOCIAL_MEDIA_POST:
        return 'Social Media Post';
      case CopyType.AD_HEADLINE:
        return 'Ad Headline';
      case CopyType.EMAIL_SUBJECT:
        return 'Email Subject Line';
      default:
        return 'Generated Copy';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-3xl mx-auto">
        <Header />
        <main className="mt-8">
          <form onSubmit={handleSubmit} className="p-8 bg-slate-800/50 rounded-2xl shadow-lg border border-slate-700 backdrop-blur-sm">
            <div className="space-y-6">
              <TextInput
                id="productName"
                label="Product Name"
                placeholder="e.g., Quantum Sneakers"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                disabled={isLoading}
              />
              <TextArea
                id="productDescription"
                label="Product Description"
                placeholder="e.g., Lightweight running shoes with self-tying laces and adaptive cushioning."
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                disabled={isLoading}
                rows={4}
              />
            </div>
            <div className="mt-8">
              <Button type="submit" loading={isLoading} fullWidth>
                {isLoading ? 'Generating...' : 'Generate Copy'}
              </Button>
            </div>
          </form>

          <div className="mt-12">
            {isLoading && (
              <div className="flex flex-col items-center justify-center text-center">
                <Spinner />
                <p className="mt-4 text-slate-400">AI is crafting your marketing copy...</p>
              </div>
            )}
            {error && <Alert message={error} />}
            {generatedCopy && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center text-slate-200">Your AI-Generated Copy</h2>
                {generatedCopy.map((copy, index) => (
                  <CopyCard
                    key={index}
                    title={getTitleForCopyType(copy.type)}
                    content={copy.content}
                  />
                ))}
              </div>
            )}
             {!isLoading && !error && !generatedCopy && (
              <div className="text-center py-10 px-6 bg-slate-800/50 rounded-2xl border border-slate-700">
                <p className="text-slate-400">Your generated marketing copy will appear here.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;