require("dotenv").config();
const express = require("express");


const PORT = process.env.PORT || 4000;
const app = express();

key = process.env.XRapidAPIKey
host = process.env.XRapidAPIHost
link = process.env.url 

const url = link;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': key,
		'X-RapidAPI-Host': host
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