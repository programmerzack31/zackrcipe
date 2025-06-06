import axios from 'axios';
import React, { useState } from 'react';


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
                setheading(query+" recipes");
                setquery('');
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
    const handelkeydown =(e)=>{
        if(e.key === 'Enter'){
            fetchdata();
        };
    }

    return (
        <div>
            <div className="searcharea">
                <input
                    onChange={(e) => setquery(e.target.value)}
                    value={query}
                    placeholder="Search..."
                    id="input"
                    className="input"
                    name="text"
                    type="text"
                    onKeyDown={handelkeydown}
                />
            </div>
            <div className='msgcontainer'>
                {!loading && <h1>{heading}</h1>}

                {err && <p style={{ color: 'white' }}>{err}</p>} {/* Display error message */}

                {loading && <h2 style={{ color: 'white' }}>Loading...</h2>}
            </div>
            <div className="Rarea">
                {rescepidata.length > 0 &&
                    rescepidata.map((meal) => (
                        <div key={meal.idMeal} className="recipidata">
                            <img src={meal.strMealThumb} alt={meal.strMeal} width="100px" />
                            <h3>{meal.strMeal}</h3>
                            <p>{meal.strCategory}</p>
                            <p>Belongs to {meal.strArea}</p>
                            <a href={meal.strYoutube}>
                                <button className='wtchbtn'>Watch Recipe</button>
                            </a>

                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Recepi;
