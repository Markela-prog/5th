"use client";

import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function GalleryView({ language, seed, likes, rating, reviews }) {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [expandedCard, setExpandedCard] = useState(null);

  const batchSize = 20;

  const fetchBooks = async (pageNumber) => {
    const { generateBooks } = await import("../utils/bookGenerator");
    const newBooks = generateBooks({
      seed,
      page: pageNumber,
      batchSize,
      likes,
      reviews,
      language,
    });

    if (newBooks.length === 0) {
      setHasMore(false);
      return;
    }

    setBooks((prev) => [...prev, ...newBooks]);
  };

  useEffect(() => {
    setBooks([]);
    setPage(0);
    setHasMore(true);
    fetchBooks(0);
  }, [language, seed, likes, rating]);

  const loadMoreBooks = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchBooks(nextPage);
  };

  const toggleCard = (isbn) => {
    setExpandedCard((prev) => (prev === isbn ? null : isbn));
  };

  return (
    <InfiniteScroll
      dataLength={books.length}
      next={loadMoreBooks}
      hasMore={hasMore}
      loader={<h4 className="text-center mt-4">Loading...</h4>}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 relative">
        {books.map((book, index) => (
          <div
            key={`${book.isbn}-${index}`} // Include page to ensure uniqueness
            className="bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 relative"
          >
            {/* Book Cover */}
            <div className="relative mb-4">
              <img
                src={`https://picsum.photos/id/137/400/600`}
                alt={`Cover of ${book.title}`}
                className="w-full h-auto object-cover rounded-lg"
                style={{ aspectRatio: "2 / 3" }}
              />
            </div>

            {/* Book Details */}
            <h3 className="font-bold text-lg mb-2 truncate">{book.title}</h3>
            <p className="text-sm text-gray-600 mb-2 truncate">{book.authors}</p>
            <button
              onClick={() => toggleCard(book.isbn)}
              className="text-blue-500 hover:underline text-sm"
            >
              {expandedCard === book.isbn ? "Hide Details" : "Show Details"}
            </button>

            {/* Expanded Details */}
            {expandedCard === book.isbn && (
              <div className="absolute top-full left-0 mt-2 w-full bg-gray-50 border rounded-lg shadow-lg p-4 z-10">
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-semibold">Publisher:</span>{" "}
                  {book.publisher}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-semibold">Likes:</span> {book.likes}
                </p>
                <h4 className="font-semibold text-sm mt-2">Reviews:</h4>
                <ul className="list-disc ml-4 mt-1">
                  {book.reviews.map((review, idx) => (
                    <li key={`${book.isbn}-review-${idx}`}>
                      <p className="text-sm">
                        "{review.text}" -{" "}
                        <span className="font-semibold">{review.author}</span>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
}
