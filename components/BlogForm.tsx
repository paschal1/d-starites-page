'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface BlogFormProps {
  formData: {
    title: string;
    excerpt: string;
    image: string;
    author: string;
    date: string;
    slug: string;
  };
  onChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel?: () => void;
  isEditing?: boolean;
}

export default function BlogForm({
  formData,
  onChange,
  onSubmit,
  onCancel,
  isEditing = false,
}: BlogFormProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: formData.excerpt || '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange('excerpt', html);
    },
  });

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => onChange('title', e.target.value)}
        className="border rounded p-2 col-span-2 sm:col-span-1"
      />
      <input
        type="text"
        placeholder="Image URL"
        value={formData.image}
        onChange={(e) => onChange('image', e.target.value)}
        className="border rounded p-2 col-span-2 sm:col-span-1"
      />
      <input
        type="text"
        placeholder="Author"
        value={formData.author}
        onChange={(e) => onChange('author', e.target.value)}
        className="border rounded p-2 col-span-2 sm:col-span-1"
      />
      <input
        type="text"
        placeholder="Date"
        value={formData.date}
        onChange={(e) => onChange('date', e.target.value)}
        className="border rounded p-2 col-span-2 sm:col-span-1"
      />
      <input
        type="text"
        placeholder="Slug"
        value={formData.slug}
        onChange={(e) => onChange('slug', e.target.value)}
        className="border rounded p-2 col-span-2"
      />

      <div className="col-span-2">
        <label className="block text-sm text-gray-700 mb-1">Excerpt</label>
        <div className="border rounded p-2 min-h-[200px]">
          <EditorContent editor={editor} />
        </div>
      </div>

      <div className="col-span-2 flex gap-4">
        <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">
          {isEditing ? 'Save' : 'Add Blog Post'}
        </button>
        {isEditing && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
