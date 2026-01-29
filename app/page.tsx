import PromptGenerator from '@/components/PromptGenerator';

export default function Home() {
  return (
    <main className="min-h-screen py-16 px-6 flex flex-col items-center justify-start gap-12 relative z-10">
      <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-50"></div>

      <header className="flex flex-col items-center gap-6 text-center max-w-4xl">
        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter liminal-glow font-[family-name:var(--font-sans)] leading-[0.9]">
          NANO BANANA
          <span className="block text-2xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mt-2 font-[family-name:var(--font-mono)] tracking-normal opacity-80">
             // PROMPT GENERATOR //
          </span>
        </h1>
        <p className="max-w-2xl text-gray-500 font-mono text-sm md:text-base border border-gray-800 p-4 mt-4 bg-[var(--color-surface)]">
          ARCHITECTING THE SUBCONSCIOUS. SELECT YOUR REALITY.
        </p>
      </header>

      <PromptGenerator />

      <footer className="mt-auto py-8 text-center text-gray-700 text-xs font-mono uppercase tracking-widest flex gap-4">
        <span>EST. 2026</span>
        <span>•</span>
        <span>SYSTEM: ONLINE</span>
        <span>•</span>
        <span>V 1.0.0</span>
      </footer>
    </main>
  );
}
