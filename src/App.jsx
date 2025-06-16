import React, { useState } from 'react';

const stages = [
  { label: "Initialize a git repo", answer: "git init" },
  { label: "Stage all changes", answer: "git add ." },
  { label: "Commit your changes as message", answer: 'git commit -m "message"' },
  { label: "Check the repo status", answer: "git status" },
  { label: "View commit history", answer: "git log" },
  { label: "Push code to remote", answer: "git push" },
];

export default function App() {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    const expected = stages[step].answer;
    if (input.trim() === expected) {
      const nextStep = step + 1;
      if (nextStep === stages.length) {
        setMessage("🏆 You completed the GitHub journey!");
      } else {
        setMessage("✅ Correct! Move forward.");
      }
      setStep(nextStep);
      setInput('');
    } else {
      setMessage("❌ Wrong command. Restarting...");
      setStep(0);
      setInput('');
    }
  };

  const resetGame = () => {
    setStep(0);
    setInput('');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">🚗 Drive with GitHub</h1>

      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 text-center relative">
        <div className="mb-4 text-gray-800 text-lg">
          {step < stages.length ? (
            <>🚧 <strong>{stages[step].label}</strong></>
          ) : (
            <>🎉 <strong>All steps completed!</strong></>
          )}
        </div>

        <div className="flex justify-center gap-4 mb-4">
          {stages.map((_, i) => (
            <div
              key={i}
              className={`w-6 h-6 rounded-full ${
                i < step ? 'bg-green-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <div className="relative w-full h-24 bg-gray-200 rounded-lg overflow-hidden mt-4">
          <img
            src="https://emojicdn.elk.sh/🚗"
            alt="Car"
            className="w-10 h-10 absolute bottom-2 transition-all duration-500"
            style={{ left: `${(step / stages.length) * 100}%` }}
          />
        </div>

        {step < stages.length && (
          <div className="mt-6">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type the Git command..."
              className="px-4 py-2 w-full border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
              onClick={handleSubmit}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>
        )}

        {message && (
          <p className="mt-4 text-sm text-gray-700">
            {message}
          </p>
        )}

        {step === stages.length && (
          <button
            onClick={resetGame}
            className="mt-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            🔁 Play Again
          </button>
        )}
      </div>
    </div>
  );
}
