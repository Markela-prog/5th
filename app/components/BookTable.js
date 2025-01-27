"use client";

import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function BookTable({ language, seed, likes, rating, reviews}) {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [expandedRow, setExpandedRow] = useState(null);

  const batchSize = 20;

  const fetchBooks = async (pageNumber) => {
    const { generateBooks } = await import("../utils/bookGenerator");

    const allBooks = generateBooks({
      seed,
      page: pageNumber,
      batchSize,
      likes,
      reviews,
      language,
    });

    const filteredBooks = allBooks.filter(
      (book) => book.likes <= likes && book.rating >= rating
    );

    if (filteredBooks.length === 0 && pageNumber === 0) {
      setBooks([]);
      setHasMore(false);
      return;
    } else if (filteredBooks.length === 0) {
      setHasMore(false);
      return;
    }

    setBooks((prev) => [...prev, ...filteredBooks]);
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

  const toggleRow = (isbn) => {
    setExpandedRow((prev) => (prev === isbn ? null : isbn));
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={books.length}
        next={loadMoreBooks}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">#</th>
              <th className="border border-gray-300 px-4 py-2">ISBN</th>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Author(s)</th>
              <th className="border border-gray-300 px-4 py-2">Publisher</th>
              <th className="border border-gray-300 px-4 py-2">Likes</th>
              <th className="border border-gray-300 px-4 py-2">Rating</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <React.Fragment key={`${book.isbn}-${index}`}>
                {/* Main Row */}
                <tr
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => toggleRow(book.isbn)}
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {book.index}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {book.isbn}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {book.title}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {book.authors}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {book.publisher}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {book.likes}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {book.rating.toFixed(1)}
                  </td>
                </tr>
                {/* Expanded Row */}
                {expandedRow === book.isbn && (
                  <tr>
                    <td
                      colSpan="7"
                      className="border border-gray-300 px-4 py-2 bg-gray-50"
                    >
                      <div className="flex gap-4">
                        {/* Book Cover with Like Count */}
                        <div className="flex flex-col items-center">
                          {/* Book Cover */}
                          <div className="relative w-48 h-72 bg-gray-200 border rounded-lg overflow-hidden shadow-md">
                            {/* Title at the Top */}
                            <div className="absolute top-2 left-0 right-0 bg-gray-600 bg-opacity-60 text-white text-xl font-bold text-center py-2 z-10 whitespace-normal break-words px-2">
                              {book.title}
                            </div>
                            {/* Book Cover Image */}
                            <img
                              src={`https://picsum.photos/id/137/200/300`}
                              alt={`Cover of ${book.title}`}
                              className="absolute inset-0 w-full h-full object-cover z-0"
                            />
                            {/* Author at the Bottom */}
                            <div className="absolute bottom-1 left-0 right-0 bg-opacity-60 text-white text-sm text-center py-2 z-10 whitespace-normal break-words px-2">
                              {book.authors}
                            </div>
                          </div>
                          {/* Like Count */}
                          <div className="mt-2 text-gray-700 font-semibold text-sm flex items-center gap-1">
                            ❤️ {book.likes} Likes
                          </div>
                        </div>

                        {/* Book Details */}
                        <div>
                          <h3 className="font-bold text-lg whitespace-normal break-words">
                            {book.title}
                          </h3>
                          <p className="italic">
                            by{" "}
                            <span className="font-semibold whitespace-normal break-words">
                              {book.authors}
                            </span>
                          </p>
                          <p className="text-sm text-gray-600">
                            Published by {book.publisher}
                          </p>
                          <div className="mt-2">
                            <h4 className="font-semibold text-md">Reviews:</h4>
                            <ul className="list-disc ml-4">
                              {book.reviews.map((review, idx) => (
                                <li key={`${book.isbn}-review-${idx}`}>
                                  <p className="text-sm">
                                    "{review.text}" -{" "}
                                    <span className="font-semibold">
                                      {review.author}
                                    </span>
                                  </p>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </InfiniteScroll>
    </div>
  );
}
