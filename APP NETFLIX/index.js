const movieInput = document.getElementById("movieInput")
const seacrhBtn = document.getElementById("searchBtn")
const results = document.getElementById("results")

seacrhBtn.addEventListener("click", searchMovie)

movieInput.addEventListener("keydown", (e) =>{
    if(e.key === "Enter") {
        searchMovie()
    }
})

async function searchMovie() {
    const title = movieInput.value.trim()
    if (title === "") return

    results.innerHTML = "⏳ Buscando..."

    try{
        const response =await fetch (
            `https://www.omdbapi.com/?t=${title}&apikey=${API_KEY}&plot=full`
        )

        const data = await response.json()

        if (data.Response === "False") {
            results.innerHTML = "❌ Película no encontrada"
            return
        }
        showMovie(data)
    } catch (error) {
        results.innerHTML = "⚠️ Error al buscar la película"
    }
} 

function showMovie(movie){
    results.innerHTML= `
    <div class="movie">
    <img src= "${movie.Poster}" alt="${movie.Title}"> 
    <div>
    <h2>${movie.Title} (${movie.Year})</h2>
    <p><strong>⭐ Rating:</strong>${movie.imdbRating}</p>
    <p><strong>Género:</strong> ${movie.Genre}</p>
    <p><strong>Duración:</strong> ${movie.Runtime}</p>
    <p id="plot">${shortenText(movie.Plot, 250)}</p>
    <button id="verMas">Ver más</button>
    </div>
    </div>
    `
   agregarEventoVerMas(movie.Plot)
}

function agregarEventoVerMas(fullPlot){
    const plot = document.getElementById("plot")
    const btn = document.getElementById("verMas")

    let expanded = false

    btn.addEventListener("click", () => {
        if(!expanded) {
            plot.textContent = fullPlot
            btn.textContent = "ver menos"
        } else {
            plot.textContent = shortenText(fullPlot, 250)
            btn.textContent = "ver mas"
        }
        expanded = !expanded
    })
}

function shortenText(text, maxLength) {
    if(text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
}