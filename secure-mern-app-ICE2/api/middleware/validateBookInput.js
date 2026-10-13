const allowedGenres = ['Fiction', 'Non-Fiction', 'Thriller', 'Self-Help', 'Fantasy', 'Biography'];

const validateBookInput = (req, res, next) => {
  const { title, author, genre, year, description } = req.body;

  if (!title || !author || !genre || !year || !description) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (
    typeof title !== 'string' ||
    typeof author !== 'string' ||
    typeof genre !== 'string' ||
    typeof description !== 'string'
  ) {
    return res.status(400).json({ error: 'Title, author, genre, and description must be text values' });
  }

  if (typeof year !== 'number') {
    return res.status(400).json({ error: 'Year must be a number' });
  }

  const trimmedTitle = title.trim();
  const trimmedAuthor = author.trim();
  const trimmedGenre = genre.trim();
  const trimmedDescription = description.trim();

  if (trimmedTitle.length < 2 || trimmedTitle.length > 100) {
    return res.status(400).json({ error: 'Title must be between 2 and 100 characters' });
  }

  if (trimmedAuthor.length < 2 || trimmedAuthor.length > 60) {
    return res.status(400).json({ error: 'Author must be between 2 and 60 characters' });
  }

  if (!allowedGenres.includes(trimmedGenre)) {
    return res.status(400).json({ error: `Genre must be one of: ${allowedGenres.join(', ')}` });
  }

  if (year < 1000 || year > new Date().getFullYear()) {
    return res.status(400).json({ error: 'Year must be a valid publication year' });
  }

  if (trimmedDescription.length < 5 || trimmedDescription.length > 250) {
    return res.status(400).json({ error: 'Description must be between 5 and 250 characters' });
  }

  req.body = {
    title: trimmedTitle,
    author: trimmedAuthor,
    genre: trimmedGenre,
    year,
    description: trimmedDescription
  };

  next();
};

module.exports = validateBookInput;
