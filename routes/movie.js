const router = require('express').Router();
const {
  validateMovie,
  validateDeleteMovie,
} = require('../middlewares/Validation');

const {
  getMovies,
  postMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getMovies);
router.post('/movies', validateMovie, postMovie);
router.delete('/movies/:movieId', validateDeleteMovie, deleteMovie);

module.exports = router;
