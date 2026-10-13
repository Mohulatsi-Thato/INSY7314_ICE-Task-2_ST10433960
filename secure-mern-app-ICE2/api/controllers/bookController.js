const books = [
  {
    id: 'b1',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    genre: 'Thriller',
    year: 2019,
    description: 'A psychotherapist becomes obsessed with treating a woman who refuses to speak.'
  },
  {
    id: 'b2',
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Self-Help',
    year: 2018,
    description: 'A practical guide to building good habits and breaking bad ones.'
  }
];

const getAllBooks = (req, res) => {
  const safeBooks = books.map(({ id, title, author, genre, year }) => ({
    id,
    title,
    author,
    genre,
    year
  }));

  res.status(200).json({
    count: safeBooks.length,
    data: safeBooks
  });
};

const getBookById = (req, res) => {
  const { id } = req.params;

  if (!/^[a-zA-Z0-9-]+$/.test(id)) {
    return res.status(400).json({ error: 'Invalid book ID format' });
  }

  const book = books.find((item) => item.id === id);

  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  res.status(200).json({ data: book });
};

const createBook = (req, res) => {
  const { title, author, genre, year, description } = req.body;

  const newBook = {
    id: `b${books.length + 1}`,
    title,
    author,
    genre,
    year,
    description
  };

  books.push(newBook);

  res.status(201).json({
    message: 'Book created',
    data: newBook
  });
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook
};
