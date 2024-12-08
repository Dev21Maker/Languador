import { useState, useEffect } from 'react';
import { Timer } from '../ui/Timer';
import type { Question } from '../../../types/game';
import { CheckCircle2, XCircle } from 'lucide-react';

interface ChallengeAreaProps {
  question: Question;
  timeLeft: number;
  onAnswer: (answer: string) => void;
  disabled: boolean;
}

export function ChallengeArea({
  question,
  timeLeft,
  onAnswer,
  disabled
}: ChallengeAreaProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsCorrect(null);
  }, [question]);

  const handleAnswerClick = (option: string) => {
    if (disabled || selectedAnswer !== null) return;
    
    setSelectedAnswer(option);
    const correct = option === question.answer;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    // Show feedback for a moment before moving to next question
    setTimeout(() => {
      setShowFeedback(false);
      onAnswer(option);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white/10 backdrop-blur-md rounded-xl">
      <div className="mb-4">
        <Timer value={timeLeft} maxValue={30} />
      </div>

      <div className="text-center mb-8">
        <h3 className="text-lg text-purple-200 mb-2">{question.prompt}</h3>
        <p className="text-3xl font-bold text-white">{question.text}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswerClick(option)}
            disabled={disabled || selectedAnswer !== null}
            className={`
              relative p-4 rounded-lg font-medium transition-all transform
              ${
                selectedAnswer === null
                  ? 'bg-white/20 hover:bg-white/30 active:scale-95'
                  : selectedAnswer === option
                  ? isCorrect
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : option === question.answer && showFeedback
                  ? 'bg-green-500/50 text-white'
                  : 'bg-white/10'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {option}
            {showFeedback && selectedAnswer === option && (
              <span className="absolute -top-2 -right-2">
                {isCorrect ? (
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-400" />
                )}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}