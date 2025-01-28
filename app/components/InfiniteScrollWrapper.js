import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { generateBooks } from "../utils/bookGenerator";

export default function InfiniteScrollWrapper({
  language,
  seed,
  likes,
  reviews,
}) {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(0);

  const fetchBooks = (reset = false) => {
    const newBooks = generateBooks({ seed, page, likes, reviews, language });

    if (reset) {
      setBooks(newBooks);
    } else {
      setBooks((prev) => [...prev, ...newBooks]);
    }
  };

  useEffect(() => {
    // Reset books and fetch new data on seed change
    setBooks([]);
    setPage(0);
    fetchBooks(true); // Reset the data when seed changes
  }, [language, seed, likes, reviews]);

  useEffect(() => {
    if (page > 0) fetchBooks();
  }, [page]);

  return (
    <InfiniteScroll
      dataLength={books.length}
      next={() => setPage((prev) => prev + 1)}
      hasMore={true}
      loader={<h4>Loading...</h4>}
    >
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>ISBN</th>
            <th>Title</th>
            <th>Author(s)</th>
            <th>Publisher</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.index}>
              <td>{book.index}</td>
              <td>{book.isbn}</td>
              <td>{book.title}</td>
              <td>{book.authors}</td>
              <td>{book.publisher}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </InfiniteScroll>
  );
}
