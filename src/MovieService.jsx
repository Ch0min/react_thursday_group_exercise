import React, {useState, useEffect} from 'react';

function MovieService() {
    const [movies, setMovies] = useState([]);
    const [moviesChanged, setMoviesChanged] = useState(false);
    // const [movieId, setMovieId] = useState({});

    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:4001/movies');
                const data = await response.json();
                setMovies(data);
            })();
    }, [moviesChanged]);

    return (
        <>
            <MovieForm isChanged={setMoviesChanged} changed={moviesChanged}/>
            <MovieDelete isChanged={setMoviesChanged} changed={moviesChanged}/>
            <MovieEdit isChanged={setMoviesChanged} changed={moviesChanged}/>

            <br/>


            {movies.length &&
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>TITLE</th>
                        <th>DIRECTOR</th>
                        <th>RATING</th>
                        <th>YEAR PUBLISHED</th>
                    </tr>
                    </thead>
                    <tbody>{movies.map((movie) => {
                        return (<tr key={movie.id}>
                                <td>{movie.id}</td>
                                <td>{movie.title}</td>
                                <td>{movie.director}</td>
                                <td>{movie.rating}</td>
                                <td>{movie.year_published}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            }
        </>
    );
}

const MovieForm = (props) => {
    const [newMovie, setNewMovie] = useState({});
    const update = (evt) => {
        const value = evt.target.value;
        const propertyName = evt.target.id;
        setNewMovie({...newMovie, [propertyName]: value});
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log(newMovie);
        fetch('http://localhost:4001/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMovie)
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('DATA:', data);
                props.isChanged(!props.changed);
            });
    }
    return (
        <>
            <h3>Create Movie</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Title:" id="title" value={newMovie.title} onChange={update}/>
                <input type="text" placeholder="Director:" id="director" value={newMovie.director} onChange={update}/>
                <input type="text" placeholder="Rating:" id="rating" value={newMovie.rating} onChange={update}/>
                <input type="text" placeholder="Year Published:" id="year_published" value={newMovie.year_published}
                       onChange={update}/>
                <input type="submit" value="Submit"/>
            </form>
        </>
    );
}

const MovieDelete = (props) => {
    const [movie, setMovie] = useState({id:''});
    const update = (evt) => {
        const value = evt.target.value;
        setMovie({movie, id: value});
    }

    const handleSubmitDelete = (evt) => {
        evt.preventDefault();
        console.log(movie)
        fetch('http://localhost:4001/movies/' + movie.id, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('DATA:', data);
                props.isChanged(!props.changed);
            });
    }

    return (
        <>
            <h3>Delete</h3>
            <form onSubmit={handleSubmitDelete}>
                <input type="text" placeholder="ID:" id="id" value={movie.id} onChange={update}/>
                <input type="submit" value="Submit"/>
            </form>
        </>
    )
};

const MovieEdit = (props) => {
    const [editMovie, setEditMovie] = useState({});
    const update = (evt) => {
        const value = evt.target.value;
        const propertyName = evt.target.id;
        setEditMovie({...editMovie, [propertyName]: value});
    }

    const handleSubmitEdit = (evt) => {
        evt.preventDefault();
        fetch('http://localhost:4001/movies/' + editMovie.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editMovie)
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('DATA:', data);
                props.isChanged(!props.changed);
            });
    }
    return (
        <>
            <h3>Edit Movie</h3>
            <form onSubmit={handleSubmitEdit}>
                <input type="text" placeholder="ID:" id="id" value={editMovie.id} onChange={update}/>
                <input type="text" placeholder="Title:" id="title" value={editMovie.title} onChange={update}/>
                <input type="text" placeholder="Director:" id="director" value={editMovie.director} onChange={update}/>
                <input type="text" placeholder="Rating:" id="rating" value={editMovie.rating} onChange={update}/>
                <input type="text" placeholder="Year Published:" id="year_published" value={editMovie.year_published}
                       onChange={update}/>
                <input type="submit" value="Submit"/>
            </form>
        </>
    );
}















export default MovieService;