import { Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface VictoryModalProps {
  score: number;
  onClose: () => void;
}

export function VictoryModal({ score, onClose }: VictoryModalProps) {
  const navigate = useNavigate();

  const handlePlayAgain = () => {
    onClose();
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 transform animate-fadeIn">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-6">
            <Trophy className="w-8 h-8 text-yellow-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Victoria!</h2>
          <p className="text-gray-600 mb-6">You've defeated the Language Master!</p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">Final Score</p>
            <p className="text-3xl font-bold text-blue-600">{score}</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handlePlayAgain}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Play Again
            </button>
            <button
              onClick={handleGoHome}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}