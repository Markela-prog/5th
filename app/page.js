'use client';

import { useState } from 'react';
import ControlPanel from './components/ControlPanel';
import BookTable from './components/BookTable';
import GalleryView from './components/GalleryView';

export default function Home() {
  const [language, setLanguage] = useState('ru');
  const [seed, setSeed] = useState(42);
  const [likes, setLikes] = useState(1);
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState(5);
  const [viewMode, setViewMode] = useState('table');

  return (
    <div className="p-4">
      <ControlPanel
        language={language}
        setLanguage={setLanguage}
        seed={seed}
        setSeed={setSeed}
        likes={likes}
        setLikes={setLikes}
        rating={rating}
        setRating={setRating}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      {viewMode === 'table' ? (
        <BookTable
          language={language}
          seed={seed}
          likes={likes}
          rating={rating}
          reviews={reviews}
        />
      ) : (
        <GalleryView
          language={language}
          seed={seed}
          likes={likes}
          rating={rating}
          reviews={reviews}
        />
      )}
    </div>
  );
}
