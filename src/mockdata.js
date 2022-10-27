import casual from "casual";

// Create an object for config file
var db = { movies: [] };

for (var i = 101; i <= 115; i++) {
    var movie = {};
    movie.id = i;

    // Create a random 1-6 word title
    movie.title = casual.words(casual.integer(1, 6));
    movie.director = casual.first_name + " " + casual.last_name;

    // Randomly rate the book between 0 and 5
    movie.rating = Math.floor(Math.random() * 100 + 1) / 20;

    // Assign a publishing year between 1700 and 2016
    movie.year_published = casual.integer(1700, 2016);
    db.movies.push(movie);
}
console.log(JSON.stringify(db));