import axios from 'axios';
import React, { useState } from 'react';
import myyutub from './myyutub.png';

const Recepi = () => {
    const [query, setquery] = useState('');
    const [rescepidata, setrescepidata] = useState([]);
    const [loading, setloading] = useState(false);
    const [heading, setheading] = useState('Search Any Recipe');
    const [err, seterr] = useState('');

    const fetchdata = async () => {
        setloading(true);
        seterr(''); // Clear previous errors when a new search is made.
        try {
            const response = await axios.get(
                `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
            );

            if (response.data.meals) {
                setrescepidata(response.data.meals);
                setheading('Search Results');
            } else {
                setrescepidata([]);
                seterr('No recipes found');
                setheading('No Results');
            }
        } catch (error) {
            seterr('Failed to fetch data. Please try again later.');
        } finally {
            setloading(false);
        }
    };

    return (
        <div>
            <div className="searcharea">
                <input
                    onChange={(e) => setquery(e.target.value)}
                    placeholder="Search..."
                    id="input"
                    className="input"
                    name="text"
                    type="text"
                />

                <button onClick={fetchdata} type="button" class="btn">
                    <strong>Search</strong>
                    <div id="container-stars">
                        <div id="stars"></div>
                    </div>

                    <div id="glow">
                        <div class="circle"></div>
                        <div class="circle"></div>
                    </div>
                </button>


            </div><br></br><br></br><br></br>
            <h1 style={{ color: 'white', textAlign: 'center' }}>{heading}</h1>

            {err && <p style={{ color: 'red' }}>{err}</p>} {/* Display error message */}

            {loading && <h2 style={{ textAlign: 'center', color: 'white' }}>Loading...</h2>}

            <div className="Rarea">
                {rescepidata.length > 0 &&
                    rescepidata.map((meal) => (
                        <div key={meal.idMeal} className="recipidata">
                            <img src={meal.strMealThumb} alt={meal.strMeal} width="100px" />
                            <h3>{meal.strMeal}</h3>
                            <p>{meal.strCategory}</p>
                            <p>Belongs to {meal.strArea}</p>
                            <a style={{ fontSize: '18px', textDecoration: 'none', fontWeight: '600', color: 'white' }} href={meal.strYoutube}> <span>Watch on </span> <img src={myyutub} style={{ width: '40px', height: '35px' }} /></a>

                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Recepi;
