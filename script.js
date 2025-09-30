let m_poke_id = 0;
let m_pagina = 1;
let m_evo = [];
let m_aux_evo = 0;
async function m_busca_pokemon(n){
    m_poke_id = n;
    let antes = n - 1;
    let prox = n + 1;
    if(antes < 1){
        antes = 1025;
    }
    if(prox > 1025){
        prox = 1;
    }
    let pokemon = document.querySelector(".m_pag_poke");
    let resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${n}`);
    let dados = await resposta.json();
    let img = dados.sprites.other['official-artwork'].front_default;
    let tipos = dados.types.map(t => t.type.name);
    let habilidades = dados.abilities.map(h => h.ability.name);
    // pegar o anterior e o proximo
    let resp_ante = await fetch(`https://pokeapi.co/api/v2/pokemon/${antes}`);
    let resp_prox = await fetch(`https://pokeapi.co/api/v2/pokemon/${prox}`);
    let dados_ante = await resp_ante.json();
    let dados_prox = await resp_prox.json();
    let img_ante = dados_ante.sprites.other['official-artwork'].front_default;
    let tipos_ante = dados_ante.types.map(t => t.type.name);
    let img_prox = dados_prox.sprites.other['official-artwork'].front_default
    let tipos_prox = dados_prox.types.map(t => t.type.name);
    // descrição
    let resdes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${n}`);
    let dados_esp = await resdes.json();
    let descricao = dados_esp.flavor_text_entries[0].flavor_text;
    pokemon.innerHTML = `
        <div class="m_barra_pesq">
            <img src="img/lupa.svg" alt="lupa">
            <input type="text" placeholder="Buscar Pokémon por nome, numero...." id="m_pesquisa">
            <button onclick="m_pesquisa()">Buscar</button>
        </div>
        <div class="m_poke_titulo">
            <h2>Pokémon</h2>
        </div>
        <div class="m_poke_pricipal">
            <img src="img/caret-left.svg" alt="seta esquerda" class="m_poke_setas" onclick="m_poke_antes()">
            <div class="m_poke_pokemon">
                <img src="img/master_ball.svg" alt="master_ball" class="m_poke_master">
                <div class="m_poke_pokemon_img">
                    <span></span>
                    <img src="${img}" alt="${dados.name}">
                </div>
                <div class="m_poke_dados">
                    <div class="m_poke_nome">
                        <h1>${dados.name}</h1>
                        <h2>#${String(dados.id).padStart(3, "0")}</h2>
                    </div>
                    <div class="m_poke_tipo">
                        ${tipos.map(t => `<h4 class="m_${t}">${t}</h4>`).join('')}
                    </div>
                    <p>${descricao}</p>
                    <div class="m_poke_medidas">
                        <h4 class="m_poke_medidas_wt"><span>WT</span>${dados.weight / 10}KG</h4>
                        <h4 class="m_poke_medidas_ht"><span>HT</span>${dados.height / 10}m</h4>
                    </div>
                    <div class="m_poke_fraq">
                        <h3>Franquezas</h3>
                        <div class="m_poke_tipo">
                            <h4>fire</h4>
                            <h4>flying</h4>
                            <h4>flying</h4>
                        </div>
                    </div>
                </div>
                <div class="m_poke_habilit">
                    <h3>Habilidades</h3>
                    ${habilidades.map(h => `<p>${h}</p>`).join(" ")}
                </div>
                <div class="m_poke_estrelas">
                    <img src="img/estrela_apagada.svg" alt="estrela_apagada">
                </div>
            </div>
            <img src="img/caret-right.svg" alt="seta direita" class="m_poke_setas" onclick="m_poke_prox()">
        </div>
        <div class="m_poke_extras">
            <div class="m_poke_sequencia">
                <div class="m_poke_seq_titulo">
                    <h1>Sequencia</h1>
                    <div class="m_poke_extras_setas">
                        <img src="img/caret-left.svg" alt="esquerda">
                        <img src="img/caret-right.svg" alt="direita">
                    </div>
                </div>
                <div class="m_poke_cards">
                    <div class="m_poke_card m_${tipos_ante[0]}" onclick="m_busca_pokemon(${m_poke_id - 1})">
                        <img src="${img_ante}" alt="${dados_ante.name}">
                        <div class="m_poke_card_des">
                            <h3>${dados_ante.name}</h3>
                            <h4>#${String(dados_ante.id).padStart(3, "0")}</h4>
                        </div>
                    </div>
                    <div class="m_poke_card m_${tipos[0]}">
                        <img src="${img}" alt="${dados.name}">
                        <div class="m_poke_card_des">
                            <h3>${dados.name}</h3>
                            <h4>#${String(dados.id).padStart(3, "0")}</h4>
                        </div>
                    </div>
                    <div class="m_poke_card m_${tipos_prox[0]}" onclick="m_busca_pokemon(${m_poke_id + 1})">
                        <img src="${img_prox}" alt="${dados_prox.name}">
                        <div class="m_poke_card_des">
                            <h3>${dados_prox.name}</h3>
                            <h4>#${String(dados_prox.id).padStart(3, "0")}</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="m_poke_evo"></div>
        </div>
    `;
    let poke_cor = document.querySelector(".m_poke_pokemon_img span");
    poke_cor.style.backgroundColor = `var(--${tipos[0]})`;
    // evolução
    let evolucao = await fetch(dados_esp.evolution_chain.url).then(r => r.json());
    let atual = evolucao.chain;
    let cont_evo = 0;
    while(atual){
        cont_evo++;
        await m_busca_evo(atual.species.name);
        atual = atual.evolves_to[0];
    }
    m_busca_evo(null);
    m_evo = [];
    document.getElementById("m_pesquisa").addEventListener("keydown", function(m_enter) {
    if (m_enter.key === "Enter") {
        m_pesquisa();
    }
});
}
function m_poke_antes(){
    if(m_poke_id < 1){
        m_poke_id = 1025;
    }
    else{
        m_poke_id -= 1;
    }
    m_busca_pokemon(m_poke_id);
}
function m_poke_prox(){
    if(m_poke_id > 1024){
        m_poke_id = 1;
    }
    else{
        m_poke_id += 1;
    }
    m_busca_pokemon(m_poke_id);
}
async function m_index_poke(n){
    if((n - 25) <= 0){
        incial = 1;
    }
    else{
        incial = n - 24;
    }
    for(let i = incial; i <= n; i++){
        let pokemon = document.querySelector(".m_cards");
        let resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        let dados = await resposta.json();
        let img = dados.sprites.other['official-artwork'].front_default;
        let tipos = dados.types.map(t => t.type.name);
        pokemon.innerHTML += `
            <div class="m_card" onclick="m_enviar_dados(${dados.id})">
                <div class="m_card_id">
                    <h5>#${String(dados.id).padStart(3, "0")}</h5>
                </div>
                <div class="m_card_info">
                    <img src="${img}" alt="${dados.name}">
                    <h3>${dados.name}</h3>
                    <div class="m_poke_tipo">
                        ${tipos.map(t => `<h4 class="m_${t}">${t}</h4>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }
}
function m_enviar_dados(id){
    let dados = JSON.stringify(id);
    localStorage.setItem("dados", dados);
    window.location.href = "pokemon.html";
}

function m_busca_id(){
    let id = localStorage.getItem("dados");
    let dados = JSON.parse(id);
    if(dados <= 0){
        m_poke_id = 1;
    }
    else{
        m_poke_id = dados;
    }
    m_busca_pokemon(m_poke_id);
}
function m_calculo_pag(){
    return m_pagina * 25;
}
function m_up_pag(n){
    let pokemon = document.querySelector(".m_cards");
    pokemon.innerHTML = " ";
    if(n == 0){
        if(m_pagina <= 1){
            m_pagina = 41;
            m_index_poke(m_calculo_pag());
        }
        else{
            m_pagina--;
            m_index_poke(m_calculo_pag());
        }
    }
    else if(n == 1){
        if(m_pagina >= 41){
            m_pagina = 1;
            m_index_poke(m_calculo_pag());
        }
        else{
            m_pagina++;
            m_index_poke(m_calculo_pag());
        }
    }
    document.getElementById("m_pag_num").innerHTML = m_pagina;
}
async function m_busca_evo(nome){
    let poke = document.querySelector(".m_poke_evo");
    m_aux_evo++;
    let resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`);
    let dados = await resposta.json();
    let img = dados.sprites.other['official-artwork'].front_default;
    m_evo.push({
        id: dados.id,
        nome: dados.name,
        img: img,
        tipos: dados.types.map(t => t.type.name)
    });
    poke.innerHTML = `
    <div class="m_poke_evo_titulo">
        <h1>Evoluções Registradas</h1>
        <br>
        <p>Da sua forma inicial até seu auge, cada evolução conta uma nova história</p>
    </div>
    <div class="m_poke_evo_quadrado">
        ${m_evo.map((evo, index) => `
            <div class="m_poke_evo_card">
                <img src="${evo.img}" alt="${evo.nome}">
                <div class="m_poke_evo_card_nome">
                    <h5>${evo.nome} #${String(evo.id).padStart(3,"0")}</h5>
                    <div class="m_poke_tipo">
                        ${evo.tipos.map(t => `<h4 class="m_${t}">${t}</h4>`).join("")}
                    </div>
                </div>
            </div>
            ${index < m_evo.length - 1 ? `<img src="img/evolu.svg" alt="evolucao">` : ""}
        `).join("")}
    </div>`;
}
async function  m_pesquisa(){
    let m_pesq = document.getElementById("m_pesquisa").value;
    let resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${m_pesq}`);
    let dados = await resposta.json();
    m_busca_pokemon(dados.id);
}
m_index_poke(m_calculo_pag());
m_busca_id();
document.getElementById("m_pesquisa").addEventListener("keydown", function(m_enter) {
    if (m_enter.key === "Enter") {
        m_pesquisa();
    }
});
