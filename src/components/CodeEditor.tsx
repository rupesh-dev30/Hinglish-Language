import React, { useEffect, useRef } from 'react';
import { Play, Save, Share } from 'lucide-react';
import { useHinglish } from '../context/HinglishContext';

export const CodeEditor: React.FC = () => {
  const { code, setCode, executeCode } = useHinglish();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Adjust textarea height based on content
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [code]);

  const handleExecute = () => {
    executeCode();
  };

  const handleSave = () => {
    // Logic to save code will be implemented
    alert('Save feature will be implemented soon!');
  };

  const handleShare = () => {
    // Logic to share code will be implemented
    alert('Share feature will be implemented soon!');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
        <h2 className="font-medium">Code Editor</h2>
        <div className="flex space-x-2">
          <button 
            onClick={handleExecute}
            className="flex items-center space-x-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md transition-colors"
          >
            <Play className="h-4 w-4" />
            <span>Run</span>
          </button>
          <button 
            onClick={handleSave}
            className="flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition-colors"
          >
            <Save className="h-4 w-4" />
            <span>Save</span>
          </button>
          <button 
            onClick={handleShare}
            className="flex items-center space-x-1 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-md transition-colors"
          >
            <Share className="h-4 w-4" />
            <span>Share</span>
          </button>
        </div>
      </div>
      <div className="p-4 bg-gray-50">
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full min-h-[300px] font-mono text-sm p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="// Start typing your Hinglish code here
// Example:
// ek variable banana 'naam' = 'Rahul'
// print karo 'Hello ' + naam"
        />
      </div>
    </div>
  );
};