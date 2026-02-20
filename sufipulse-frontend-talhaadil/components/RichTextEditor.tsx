'use client';

import { useState, useEffect } from 'react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
  const [htmlContent, setHtmlContent] = useState(content);

  useEffect(() => {
    setHtmlContent(content);
  }, [content]);

  const handleInput = () => {
    const editableDiv = document.getElementById('rich-text-editor');
    if (editableDiv) {
      const newContent = editableDiv.innerHTML;
      setHtmlContent(newContent);
      onChange(newContent);
    }
  };

  const formatText = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    const editableDiv = document.getElementById('rich-text-editor');
    if (editableDiv) {
      onChange(editableDiv.innerHTML);
    }
  };

  return (
    <div className="border text-black border-gray-300 rounded-md">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 p-2 border-b border-gray-300 bg-gray-50 rounded-t-md">
        <button
          type="button"
          onClick={() => formatText('bold')}
          className="p-2 rounded hover:bg-gray-200"
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => formatText('italic')}
          className="p-2 rounded hover:bg-gray-200"
          title="Italic"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => formatText('underline')}
          className="p-2 rounded hover:bg-gray-200"
          title="Underline"
        >
          <u>U</u>
        </button>
        <div className="border-r border-gray-300 h-6 mx-1"></div>
        <button
          type="button"
          onClick={() => formatText('insertUnorderedList')}
          className="p-2 rounded hover:bg-gray-200"
          title="Bullet List"
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => formatText('insertOrderedList')}
          className="p-2 rounded hover:bg-gray-200"
          title="Numbered List"
        >
          1. List
        </button>
        <div className="border-r border-gray-300 h-6 mx-1"></div>
        <select
          onChange={(e) => formatText('formatBlock', e.target.value)}
          className="p-2 border border-gray-300 rounded"
          defaultValue=""
        >
          <option value="">Format</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="p">Paragraph</option>
        </select>
        <button
          type="button"
          onClick={() => formatText('formatBlock', 'blockquote')}
          className="p-2 rounded hover:bg-gray-200"
          title="Quote"
        >
          "
        </button>
      </div>
      
      {/* Editor */}
      <div
        id="rich-text-editor"
        contentEditable
        className="min-h-[300px] p-4 focus:outline-none"
        onInput={handleInput}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
};

export default RichTextEditor;