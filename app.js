require("dotenv").config();
const express = require("express");


const PORT = process.env.PORT || 4000;
const app = express();

const url = 'https://moviesverse1.p.rapidapi.com/top-box-office';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '213c0da2c1msh8abea8349ad87cbp13dbe8jsn5af631b48b12',
		'X-RapidAPI-Host': 'moviesverse1.p.rapidapi.com'
	}
};

async function getmovies() {
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
    }
}

app.get("/", async (req, res) => {
    try {
        const movies = await getmovies();
        res.json(movies); // Sending the movies data as JSON response
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(PORT, () => console.log(`Port ${PORT} is Running`));