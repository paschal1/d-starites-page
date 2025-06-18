'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useEffect } from 'react';

interface TipTapEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const TipTapEditor: React.FC<TipTapEditorProps> = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value]);

  return (
    <div className="border p-2 rounded min-h-[150px] bg-white">
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTapEditor;
