'use client';

import { useState } from 'react';

type Style = 'liminal' | 'brutalism' | 'dream' | 'y2k';

export default function PromptGenerator() {
    const [keywords, setKeywords] = useState('');
    const [style, setStyle] = useState<Style>('liminal');
    const [generatedPrompt, setGeneratedPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        if (!keywords.trim()) return;

        setLoading(true);
        setError('');
        setGeneratedPrompt('');

        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ keywords, style }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to generate');
            }

            setGeneratedPrompt(data.prompt);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedPrompt);
        // Could add a toast here
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-4 flex flex-col gap-8">
            {/* Input Section */}
            <div className="flex flex-col gap-2">
                <label className="uppercase font-bold tracking-widest text-sm text-gray-400">
                    Input Keywords
                </label>
                <textarea
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="e.g., empty mall, concrete stairs, swimming pool at night"
                    className="w-full bg-black border-2 border-[var(--color-border)] p-4 text-lg outline-none focus:border-[var(--color-primary)] transition-colors h-32 resize-none rounded-none placeholder-gray-700"
                />
            </div>

            {/* Style Selection */}
            <div className="flex flex-col gap-2">
                <label className="uppercase font-bold tracking-widest text-sm text-gray-400">
                    Select Aesthetic
                </label>
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => setStyle('liminal')}
                        className={`p-4 border-2 font-bold uppercase tracking-wider transition-all
              ${style === 'liminal'
                                ? 'bg-[var(--color-secondary)] text-white border-[var(--color-secondary)] brutal-shadow'
                                : 'bg-transparent border-[var(--color-border)] hover:border-[var(--color-secondary)] text-gray-400'
                            }`}
                    >
                        Liminal Space
                    </button>
                    <button
                        onClick={() => setStyle('brutalism')}
                        className={`p-4 border-2 font-bold uppercase tracking-wider transition-all
              ${style === 'brutalism'
                                ? 'bg-[var(--color-primary)] text-black border-[var(--color-primary)] brutal-shadow'
                                : 'bg-transparent border-[var(--color-border)] hover:border-[var(--color-primary)] text-gray-400'
                            }`}
                    >
                        Brutalism
                    </button>
                    <button
                        onClick={() => setStyle('dream')}
                        className={`p-4 border-2 font-bold uppercase tracking-wider transition-all
              ${style === 'dream'
                                ? 'bg-pink-500/20 text-pink-200 border-pink-400 shadow-[0_0_15px_rgba(244,114,182,0.4)] backdrop-blur-sm'
                                : 'bg-transparent border-[var(--color-border)] hover:border-pink-400 hover:text-pink-300 text-gray-400'
                            }`}
                    >
                        Dreams
                    </button>
                    <button
                        onClick={() => setStyle('y2k')}
                        className={`p-4 border-2 font-bold uppercase tracking-wider transition-all
              ${style === 'y2k'
                                ? 'bg-cyan-900/40 text-cyan-300 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)] font-sans'
                                : 'bg-transparent border-[var(--color-border)] hover:border-cyan-400 hover:text-cyan-300 text-gray-400'
                            }`}
                    >
                        Y2K Future
                    </button>
                </div>
            </div>

            {/* Generate Button */}
            <button
                onClick={handleGenerate}
                disabled={loading || !keywords.trim()}
                className={`brutal-button w-full p-6 text-xl mt-4 disabled:opacity-50 disabled:cursor-not-allowed
          ${loading ? 'animate-pulse' : ''}`}
            >
                {loading ? 'GENERATING...' : 'GENERATE PROMPT'}
            </button>

            {/* Error Display */}
            {error && (
                <div className="p-4 border-2 border-red-500 bg-red-900/20 text-red-500 font-bold uppercase">
                    ERROR: {error}
                </div>
            )}

            {/* Output Section */}
            {generatedPrompt && (
                <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <label className="uppercase font-bold tracking-widest text-sm text-gray-400 flex justify-between items-center">
                        <span>Generated Prompt</span>
                        <button
                            onClick={copyToClipboard}
                            className="text-[var(--color-primary)] hover:underline cursor-pointer"
                        >
                            [COPY TEXT]
                        </button>
                    </label>
                    <div className="p-6 border-2 border-[var(--color-border)] bg-[#1a1a1a] text-lg leading-relaxed font-mono whitespace-pre-wrap relative group">
                        {generatedPrompt}
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[var(--color-primary)]"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[var(--color-primary)]"></div>
                    </div>
                </div>
            )}
        </div>
    );
}
