let m_poke_id = 0;
let m_pagina = 1;
let m_evo = [];
let m_aux_evo = 0;
let m_dica_aux = 0;
let m_jogo_id = 0;
let m_cont_menu = 0;
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
    let fraquezas = [];
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
    switch(tipos[0]) {
        case "normal": fraquezas.push("fighting"); break;
        case "fire": fraquezas.push("water", "ground", "rock"); break;
        case "water": fraquezas.push("electric", "grass"); break;
        case "electric": fraquezas.push("ground"); break;
        case "grass": fraquezas.push("fire", "ice", "poison", "flying", "bug"); break;
        case "ice": fraquezas.push("fire", "fighting", "rock", "steel"); break;
        case "fighting": fraquezas.push("flying", "psychic", "fairy"); break;
        case "poison": fraquezas.push("ground", "psychic"); break;
        case "ground": fraquezas.push("water", "ice", "grass"); break;
        case "flying": fraquezas.push("electric", "ice", "rock"); break;
        case "psychic": fraquezas.push("bug", "ghost", "dark"); break;
        case "bug": fraquezas.push("fire", "flying", "rock"); break;
        case "rock": fraquezas.push("water", "grass", "fighting", "ground", "steel"); break;
        case "ghost": fraquezas.push("ghost", "dark"); break;
        case "dragon": fraquezas.push("ice", "dragon", "fairy"); break;
        case "dark": fraquezas.push("fighting", "bug", "fairy"); break;
        case "steel": fraquezas.push("fire", "fighting", "ground"); break;
        case "fairy": fraquezas.push("poison", "steel"); break;
        default: break;
    }
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
                            ${fraquezas.map(t => `<h4 class="m_${t}">${t}</h4>`).join('')}
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
                        <img src="img/caret-left.svg" alt="esquerda" onclick="m_poke_antes()">
                        <img src="img/caret-right.svg" alt="direita" onclick="m_poke_prox()">
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
    document.getElementById("m_pesquisa_poke").addEventListener("keydown", function(m_enter2) {
    if (m_enter2.key === "Enter") {
        m_pesquisa_poke();
    }
    });
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
function m_up_pag_filtros(n){
    let pokemon = document.querySelector(".m_cards");
    pokemon.innerHTML = " ";
    if(n == 0){
        if(m_pagina <= 1){
            m_pagina = 41;
            m_filtrar(m_calculo_pag());
        }
        else{
            m_pagina--;
            m_filtrar(m_calculo_pag());
        }
    }
    else if(n == 1){
        if(m_pagina >= 41){
            m_pagina = 1;
            m_filtrar(m_calculo_pag());
        }
        else{
            m_pagina++;
            m_filtrar(m_calculo_pag());
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
            <div class="m_poke_evo_card" onclick="m_busca_pokemon(${evo.id})">
                <img src="${evo.img}" alt="${evo.nome}">
                <div class="m_poke_evo_card_nome">
                    <h5>${evo.nome}</h5>
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
function m_gerador(n, q){
    let numero;
    do {
        numero = Math.floor(Math.random() * q) + 1;
    } while (numero === n);
    return numero;
}
async function m_jogo_poke(){
    let pokemon = document.querySelector(".m_jogo_principal");
    let dica_tipo = document.querySelector(".m_dica_tipo");
    let busca_1 = m_gerador(0, 999);
    let resposta_1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${busca_1}`);
    let dados_1 = await resposta_1.json();
    let img = dados_1.sprites.other['official-artwork'].front_default;
    let tipos = dados_1.types.map(t => t.type.name);
    m_jogo_id = dados_1.id;
    pokemon.innerHTML = `
        <div class="m_jogo_poke">
            <img src="${img}" alt="${dados_1.name}">
        </div>
        <div class="m_jogo_op">                 
        </div>
        `;
    dica_tipo.innerHTML = `
        <div class="m_poke_tipo">
            ${tipos.map(t => `<h4 class="m_${t}">${t}</h4>`).join('')}
        </div>
        `;
    let op = document.querySelector(".m_jogo_op");
    let aux_certo = 0;
    let certo = Math.floor(Math.random() * 4);;
    for(let i = 0; i < 4; i++){
        let busca_2 = m_gerador(busca_1, 1025 );
        let resposta_2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${busca_2}`);
        let dados_2 = await resposta_2.json();
        let nome = null;
        if(certo == i){
            nome = dados_1.name;
            aux_certo = 1;
        }
        else{
            nome = dados_2.name;
            aux_certo = 0;
        }
        switch(i){
            case 0:
                op.innerHTML += `
                    <div class="m_op" onclick="m_opcao(${aux_certo})">
                        <h2>A</h2>
                        <h3>${nome}</h3>
                    </div>
                `;
                break;
            case 1:
                op.innerHTML += `
                    <div class="m_op" onclick="m_opcao(${aux_certo})">
                        <h2>B</h2>
                        <h3>${nome}</h3>
                    </div>
                `;
                break;
            case 2:
                op.innerHTML += `
                    <div class="m_op" onclick="m_opcao(${aux_certo})">
                        <h2>C</h2>
                        <h3>${nome}</h3>
                    </div>
                `;
                break;
            case 3:
                op.innerHTML += `
                    <div class="m_op" onclick="m_opcao(${aux_certo})">
                        <h2>D</h2>
                        <h3>${nome}</h3>
                    </div>
                `;
                break;
        };    
    }
}
function m_opcao(resp){
    if(resp == 1){
        alert("acertou");
        document.getElementById("m_trofeu").innerHTML++;
        m_dica_aux = 0;
        document.getElementById("m_dica").innerHTML = 0; 
        m_jogo_poke();
    }
    else{
        alert("Errou");
        document.getElementById("m_erros").innerHTML++;
    }
}
function m_dica(){
    let pokemon = document.querySelector(".m_jogo_poke img");
    let tipo = document.querySelectorAll(".m_dica_tipo .m_poke_tipo h4");
    if(m_dica_aux == 0){
        pokemon.style.filter = "brightness(1)";
        document.getElementById("m_dica").innerHTML = 1; 
        m_dica_aux = 1;
        return;
    }
    if(m_dica_aux == 1){
        m_dica_aux = 2; 
        document.getElementById("m_dica").innerHTML = 2;
        tipo[0].style.filter = "brightness(1)";
        if(tipo.length > 0){
            tipo[1].style.filter = "brightness(1)";
        }
        return;
    }
    if(m_dica_aux == 2){
        window.scrollTo({ top: 0, behavior: 'smooth' });
        m_alert_dica();
        return;
    }
}
function m_alert_dica(){
    let alerta = document.querySelector(".m_jogo_alert");
    alerta.style.display = "flex";
    let jogo = document.querySelector(".m_jogo");
    jogo.style.transition = "filter 0.5s";
    jogo.style.filter = "blur(10px)";
    jogo.style.pointerEvents = "none";
}
function m_dica_op(n){
    if(n == 0){
        let alerta = document.querySelector(".m_jogo_alert");
        alerta.style.display = "none";
        let jogo = document.querySelector(".m_jogo");
        jogo.style.transition = "none";
        jogo.style.filter = "blur(0)";
        jogo.style.pointerEvents = "auto";
    }
    else if(n == 1){
        m_dica_aux = 0;
        m_enviar_dados(m_jogo_id);
        window.location.href = "pokemon.html";
    }
}
function m_aplicar_filtrar(){
    m_pagina = 1;
    m_filtrar(m_calculo_pag());
}
async function m_filtrar(n){
    let pokemon = document.querySelector(".m_cards");
    let aux_pag = 0;
    pokemon.innerHTML = " ";
    let tipo = document.getElementById("tipos").value;
    if(tipo == "nada"){
        window.location.reload();
    }
    let resposta = await fetch(`https://pokeapi.co/api/v2/type/${tipo}`);
    let dados1 = await resposta.json();
    if((n - 25) <= 0){
        incial = 0;
        aux_pag = 1;
    }
    else{
        incial = n - 24;
        aux_pag = 0;
    }
    
    for(let i = incial; i <= n - aux_pag; i++){
        let poke_tipo = dados1.pokemon[i].pokemon.name;
        let resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke_tipo}`);
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
    let pag = document.querySelector(".m_num_pag");
    pag.innerHTML = `
        <img src="img/caret-left.svg" alt="seta esquerda" onclick="m_up_pag_filtros(0)">
        <h3><span id="m_pag_num">${m_pagina}</span> de 41</h3>
        <img src="img/caret-right.svg" alt="seta direita" onclick="m_up_pag_filtros(1)">
    `;

}
function m_tocar_quem(){
    let musica = new Audio('audio/quem_poke.mp3');
    musica.play();
}
async function m_pesquisa_poke(){
    let m_pesq = document.getElementById("m_pesquisa_poke").value;
    if(m_pesq == ""){
        m_index_poke(m_calculo_pag());
    }
    let pokemon = document.querySelector(".m_cards");
    pokemon.innerHTML = "";
    let resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${m_pesq}`);
    if(!resposta.ok){
        pokemon.innerHTML = "Nenhum Pokemon encontrado tente novamente!!";
        return;
    }
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
function m_menu_lateral(){
    let menu = document.querySelector(".m_menu_lateral");
    if(m_cont_menu == 0){
        menu.style.right = "0";
        m_cont_menu = 1;
    }
    else{
        menu.style.right = "-100%";
        m_cont_menu = 0;
    }
}
m_jogo_poke();  
m_index_poke(m_calculo_pag());
m_busca_id();
