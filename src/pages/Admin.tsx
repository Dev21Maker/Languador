import { useState, useEffect } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';
import { getTopics } from '../services/wordService';
import { addWord, addTopic } from '../services/adminService';
import type { Topic } from '../types/game';
import { Navbar } from '../components/layout/Navbar';

export function Admin() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [newWord, setNewWord] = useState({ english: '', spanish: '', difficulty: 1 });
  const [newTopic, setNewTopic] = useState({ name: '', description: '', difficulty: 1 });
  const [showTopicForm, setShowTopicForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadTopics();
  }, []);

  const loadTopics = async () => {
    try {
      const fetchedTopics = await getTopics();
      setTopics(fetchedTopics);
      if (fetchedTopics.length > 0 && !selectedTopic) {
        setSelectedTopic(fetchedTopics[0].id);
      }
    } catch (error) {
      setError('Failed to load topics');
    }
  };

  const handleAddWord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTopic) {
      setError('Please select a topic');
      return;
    }

    try {
      await addWord({
        ...newWord,
        topicId: selectedTopic,
      });
      setNewWord({ english: '', spanish: '', difficulty: 1 });
      setSuccess('Word added successfully');
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      setError('Failed to add word');
    }
  };

  const handleAddTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addTopic(newTopic);
      setNewTopic({ name: '', description: '', difficulty: 1 });
      setShowTopicForm(false);
      loadTopics();
      setSuccess('Topic added successfully');
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      setError('Failed to add topic');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Word Management</h1>
            <button
              onClick={() => setShowTopicForm(!showTopicForm)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Topic
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-md">
              {success}
            </div>
          )}

          {showTopicForm && (
            <form onSubmit={handleAddTopic} className="mb-8 p-4 bg-gray-50 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Add New Topic</h2>
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Topic Name
                  </label>
                  <input
                    type="text"
                    value={newTopic.name}
                    onChange={(e) => setNewTopic({ ...newTopic, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={newTopic.description}
                    onChange={(e) => setNewTopic({ ...newTopic, description: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Difficulty (1-5)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={newTopic.difficulty}
                    onChange={(e) => setNewTopic({ ...newTopic, difficulty: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Topic
                </button>
              </div>
            </form>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Topic
              </label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                {topics.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.name}
                  </option>
                ))}
              </select>
            </div>

            <form onSubmit={handleAddWord} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  English Word
                </label>
                <input
                  type="text"
                  value={newWord.english}
                  onChange={(e) => setNewWord({ ...newWord, english: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Spanish Translation
                </label>
                <input
                  type="text"
                  value={newWord.spanish}
                  onChange={(e) => setNewWord({ ...newWord, spanish: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty (1-5)
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={newWord.difficulty}
                  onChange={(e) => setNewWord({ ...newWord, difficulty: Number(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Word
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}