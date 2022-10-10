const formulario = document.querySelector("form")

formulario.addEventListener("submit", async (e) => {
    e.preventDefault()
    let urlForm = "https://pokeapi.co/api/v2/pokemon/";
    const nome = document.getElementById("name")
    urlForm = (urlForm + nome.value).toLocaleLowerCase()
    const resposta = document.getElementById('content')
    const imagem = document.getElementById('imgPokemon')
    respostaApi(urlForm, resposta, imagem)
})

async function respostaApi(url, resposta, imagem) {
    try {
        const { data } = await axios.get(url)
        resposta.innerHTML = 'Nome: ' + maiuscula(data.name) + '<br>' + 'Type: ' + maiuscula(data.types[0].type.name)
        imagem.innerHTML = "<img src='" + data.sprites.front_default + "'><img src='" + data.sprites.back_default + "'>"
    } catch (error) {
        if (error == 'SyntaxError: Unexpected token N in JSON at position 0') return resposta.innerHTML = "'Pokémon não encontrado! 😒'"
        return resposta.innerHTML = error
    }
}

function maiuscula(val) {
    return val[0].toUpperCase() + val.substr(1)
}