const tablero = document.getElementById("tablero");
const turnoTexto = document.getElementById("turno");
const marcador = document.getElementById("marcador");
const mensaje = document.getElementById("mensaje");
const rachaTexto = document.getElementById("racha");

const selectorJugadores = document.getElementById("cantidadJugadores");
const selectorDificultad = document.getElementById("dificultad");
const botonComenzar = document.getElementById("comenzar");
const botonReiniciar = document.getElementById("reiniciar");

// Paletas de cartas. Los colores básicos vienen desbloqueados.
const coloresCartas = {
    reverso: {
        morado: { nombre: "Morado", fondo: "#7136a8", sombra: "#3e1d5d", texto: "#ffffff", precio: 0 },
        rojo: { nombre: "Rojo", fondo: "#c92d39", sombra: "#741923", texto: "#ffffff", precio: 0 },
        naranjo: { nombre: "Naranjo", fondo: "#f07822", sombra: "#91400e", texto: "#21130a", precio: 0 },
        azul: { nombre: "Azul", fondo: "#2364aa", sombra: "#12345c", texto: "#ffffff", precio: 0 },
        verde: { nombre: "Verde", fondo: "#23865a", sombra: "#125035", texto: "#ffffff", precio: 0 },
        rosa: { nombre: "Rosa", fondo: "#c04482", sombra: "#70234a", texto: "#ffffff", precio: 0 },
        negro: { nombre: "Negro", fondo: "#29252f", sombra: "#100e13", texto: "#ffffff", precio: 0 },
        aurora: { nombre: "Aurora", fondo: "linear-gradient(135deg,#00e5ff,#6a00f4,#ff3cac)", sombra: "#35105d", texto: "#ffffff", precio: 120 },
        lava: { nombre: "Lava", fondo: "linear-gradient(135deg,#ff8a00,#e52d27,#3b0808)", sombra: "#3b0808", texto: "#ffffff", precio: 180 },
        neon: { nombre: "Neón", fondo: "linear-gradient(135deg,#39ff14,#00bcd4,#7b1fa2)", sombra: "#164d36", texto: "#101018", precio: 240 },
        oro: { nombre: "Oro líquido", fondo: "linear-gradient(135deg,#fff176,#ffb300,#8d4b00)", sombra: "#6b3c00", texto: "#291600", precio: 320 },
        galaxia: { nombre: "Galaxia", fondo: "radial-gradient(circle at 22% 20%,#ff6ad5 0 7%,transparent 28%),radial-gradient(circle at 78% 75%,#00d5ff 0 5%,transparent 27%),linear-gradient(135deg,#080020,#32106b,#061b45)", sombra: "#080020", texto: "#ffffff", precio: null, especial: true }
    },
    frente: {
        marfil: { nombre: "Marfil", fondo: "#fff4df", borde: "#e7cfa8", texto: "#28202a", precio: 0 },
        negro: { nombre: "Negro", fondo: "#27232d", borde: "#7136a8", texto: "#ffffff", precio: 0 },
        lavanda: { nombre: "Lavanda", fondo: "#e5d8ff", borde: "#a98bd8", texto: "#302044", precio: 0 },
        celeste: { nombre: "Celeste", fondo: "#d7efff", borde: "#8bbbd8", texto: "#173047", precio: 0 },
        menta: { nombre: "Menta", fondo: "#d9f7e8", borde: "#8bc9a8", texto: "#17452f", precio: 0 },
        rosaClaro: { nombre: "Rosa claro", fondo: "#ffe0eb", borde: "#e6a2bd", texto: "#54283b", precio: 0 },
        cristal: { nombre: "Cristal", fondo: "linear-gradient(135deg,#ffffff,#b2ebf2,#b39ddb)", borde: "#80deea", texto: "#203044", precio: 140 },
        fuego: { nombre: "Fuego", fondo: "linear-gradient(135deg,#fff176,#ff7043,#b71c1c)", borde: "#e64a19", texto: "#32100b", precio: 190 },
        oceano: { nombre: "Océano", fondo: "linear-gradient(135deg,#80deea,#1565c0,#081b4b)", borde: "#42a5f5", texto: "#ffffff", precio: 250 },
        obsidiana: { nombre: "Obsidiana", fondo: "linear-gradient(135deg,#55505f,#17131f,#6b3fa0)", borde: "#8e65bd", texto: "#ffffff", precio: 330 },
        galaxia: { nombre: "Galaxia", fondo: "radial-gradient(circle at 22% 20%,#ff6ad5 0 7%,transparent 28%),radial-gradient(circle at 78% 75%,#00d5ff 0 5%,transparent 27%),linear-gradient(135deg,#080020,#32106b,#061b45)", borde: "#b56cff", texto: "#ffffff", precio: null, especial: true }
    }
};

const COLORES_REVERSO_INICIALES = ["morado", "rojo", "naranjo", "azul", "verde", "rosa", "negro"];
const COLORES_FRENTE_INICIALES = ["marfil", "negro", "lavanda", "celeste", "menta", "rosaClaro"];
const RECOMPENSA_VICTORIA = 25;

let coloresPropios = {
    reverso: [...COLORES_REVERSO_INICIALES],
    frente: [...COLORES_FRENTE_INICIALES]
};
let colorReversoActivo = "morado";
let colorFrenteActivo = "marfil";
let creditos = 0;
let fechaUltimaRuleta = null;

const botonAbrirTienda = document.getElementById("abrirTienda");
const botonAbrirRuleta = document.getElementById("abrirRuleta");
const panelTienda = document.getElementById("tienda");
const panelRuleta = document.getElementById("ruleta");
const saldoCreditos = document.getElementById("saldoCreditos");
const estadoTienda = document.getElementById("estadoTienda");
const resultadoRuleta = document.getElementById("resultadoRuleta");
const botonGirarRuleta = document.getElementById("girarRuleta");
const ruletaVisual = document.getElementById("ruletaVisual");

function aplicarColoresCartas() {
    const reverso = coloresCartas.reverso[colorReversoActivo] || coloresCartas.reverso.morado;
    const frente = coloresCartas.frente[colorFrenteActivo] || coloresCartas.frente.marfil;
    const raiz = document.documentElement;

    raiz.style.setProperty("--color-reverso", reverso.fondo);
    raiz.style.setProperty("--sombra-reverso", reverso.sombra || "#24102f");
    raiz.style.setProperty("--texto-reverso", reverso.texto);
    raiz.style.setProperty("--color-frente", frente.fondo);
    raiz.style.setProperty("--borde-frente", frente.borde || "#b56cff");
    raiz.style.setProperty("--texto-frente", frente.texto);
}

function guardarEconomia() {
    try {
        localStorage.setItem("memoriceCreditos", String(creditos));
        localStorage.setItem("memoriceColoresPropios", JSON.stringify(coloresPropios));
        localStorage.setItem("colorReverso", colorReversoActivo);
        localStorage.setItem("colorFrente", colorFrenteActivo);
        if (fechaUltimaRuleta) localStorage.setItem("memoriceFechaRuleta", fechaUltimaRuleta);
    } catch (error) {
        console.log("No se pudo guardar la tienda en este dispositivo.");
    }
}

function actualizarSaldo() {
    saldoCreditos.textContent = `💎 Créditos: ${creditos}`;
}

function cargarEconomia() {
    try {
        creditos = Math.max(0, Number(localStorage.getItem("memoriceCreditos")) || 0);
        const guardados = JSON.parse(localStorage.getItem("memoriceColoresPropios") || "null");
        if (guardados && Array.isArray(guardados.reverso) && Array.isArray(guardados.frente)) {
            coloresPropios.reverso = [...new Set([...COLORES_REVERSO_INICIALES, ...guardados.reverso.filter(id => coloresCartas.reverso[id])])];
            coloresPropios.frente = [...new Set([...COLORES_FRENTE_INICIALES, ...guardados.frente.filter(id => coloresCartas.frente[id])])];
        }
        fechaUltimaRuleta = localStorage.getItem("memoriceFechaRuleta");
        const reversoGuardado = localStorage.getItem("colorReverso");
        const frenteGuardado = localStorage.getItem("colorFrente");
        if (reversoGuardado && coloresPropios.reverso.includes(reversoGuardado)) colorReversoActivo = reversoGuardado;
        if (frenteGuardado && coloresPropios.frente.includes(frenteGuardado)) colorFrenteActivo = frenteGuardado;
    } catch (error) {
        console.log("No se pudo cargar la tienda; se usarán los valores iniciales.");
    }
    aplicarColoresCartas();
    actualizarSaldo();
    actualizarEstadoRuleta();
}

function crearTarjetaColor(tipo, id, color) {
    const tarjeta = document.createElement("article");
    tarjeta.className = "producto-color";
    const muestra = document.createElement("div");
    muestra.className = "muestra-color";
    muestra.style.background = color.fondo;
    muestra.textContent = tipo === "reverso" ? "?" : "√25 = 5";
    muestra.style.color = color.texto;
    const nombre = document.createElement("strong");
    nombre.textContent = color.nombre;
    const precio = document.createElement("small");
    precio.textContent = color.especial ? "Premio especial de la ruleta" : (color.precio === 0 ? "Gratis" : `${color.precio} créditos`);
    const boton = document.createElement("button");
    const propio = coloresPropios[tipo].includes(id);
    const equipado = (tipo === "reverso" ? colorReversoActivo : colorFrenteActivo) === id;
    boton.type = "button";
    boton.textContent = equipado ? "Equipado ✓" : (propio ? "Usar" : (color.especial ? "Solo ruleta" : "Comprar"));
    boton.disabled = equipado || (!propio && (color.especial || creditos < color.precio));
    boton.addEventListener("click", () => gestionarColor(tipo, id));
    tarjeta.append(muestra, nombre, precio, boton);
    return tarjeta;
}

function renderizarTienda() {
    const catalogoReverso = document.getElementById("catalogoReverso");
    const catalogoFrente = document.getElementById("catalogoFrente");
    catalogoReverso.innerHTML = "";
    catalogoFrente.innerHTML = "";
    Object.entries(coloresCartas.reverso).forEach(([id, color]) => catalogoReverso.appendChild(crearTarjetaColor("reverso", id, color)));
    Object.entries(coloresCartas.frente).forEach(([id, color]) => catalogoFrente.appendChild(crearTarjetaColor("frente", id, color)));
    actualizarSaldo();
}

function gestionarColor(tipo, id) {
    const color = coloresCartas[tipo][id];
    if (!color) return;
    if (!coloresPropios[tipo].includes(id)) {
        if (color.especial) {
            estadoTienda.textContent = "¡Galaxia se consigue como premio principal de la ruleta diaria!";
            return;
        }
        if (creditos < color.precio) {
            estadoTienda.textContent = "No tienes créditos suficientes. ¡Gana partidas o prueba la ruleta diaria!";
            return;
        }
        creditos -= color.precio;
        coloresPropios[tipo].push(id);
        estadoTienda.textContent = `¡Compraste ${color.nombre}! Ya puedes equiparlo.`;
    } else {
        estadoTienda.textContent = `Color ${color.nombre} equipado.`;
    }
    if (tipo === "reverso") colorReversoActivo = id;
    else colorFrenteActivo = id;
    guardarEconomia();
    aplicarColoresCartas();
    renderizarTienda();
}

function abrirPanel(panel) {
    panelTienda.hidden = panel !== "tienda";
    panelRuleta.hidden = panel !== "ruleta";
    if (panel === "tienda") renderizarTienda();
    if (panel === "ruleta") actualizarEstadoRuleta();
    (panel === "tienda" ? panelTienda : panelRuleta).scrollIntoView({ behavior: "smooth", block: "start" });
}

function cerrarPanel(panel) {
    (panel === "tienda" ? panelTienda : panelRuleta).hidden = true;
}

function fechaLocalHoy() {
    const ahora = new Date();
    const mes = String(ahora.getMonth() + 1).padStart(2, "0");
    const dia = String(ahora.getDate()).padStart(2, "0");
    return `${ahora.getFullYear()}-${mes}-${dia}`;
}

const premiosRuleta = [
    { tipo: "creditos", cantidad: 10, peso: 35, texto: "10 créditos" },
    { tipo: "creditos", cantidad: 20, peso: 25, texto: "20 créditos" },
    { tipo: "creditos", cantidad: 30, peso: 20, texto: "30 créditos" },
    { tipo: "creditos", cantidad: 50, peso: 12, texto: "50 créditos" },
    { tipo: "creditos", cantidad: 100, peso: 7, texto: "100 créditos" },
    { tipo: "galaxia", peso: 1, texto: "¡Color GALAXIA!" }
];

let rotacionRuleta = 0;

function puntoRuleta(cx, cy, radio, grados) {
    const radianes = grados * Math.PI / 180;
    return {
        x: cx + radio * Math.cos(radianes),
        y: cy + radio * Math.sin(radianes)
    };
}

function dibujarRuleta() {
    const colores = ["#c92d39", "#7136a8", "#f07822", "#2364aa", "#23865a", "#542b83"];
    const cx = 300;
    const cy = 300;
    const radio = 292;
    const partes = [];

    premiosRuleta.forEach((premio, indice) => {
        const inicio = -90 + indice * 60;
        const fin = inicio + 60;
        const medio = inicio + 30;
        const p1 = puntoRuleta(cx, cy, radio, inicio);
        const p2 = puntoRuleta(cx, cy, radio, fin);
        const xTexto = cx + 158 * Math.cos(medio * Math.PI / 180);
        const yTexto = cy + 158 * Math.sin(medio * Math.PI / 180);
        const porcentaje = `${premio.peso}%`;

        partes.push(`<path d="M ${cx} ${cy} L ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${radio} ${radio} 0 0 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} Z" fill="${colores[indice]}" stroke="#ffe7a0" stroke-width="3"/>`);

        if (premio.tipo === "galaxia") {
            partes.push(`
                <g transform="translate(${xTexto.toFixed(2)} ${yTexto.toFixed(2)})" text-anchor="middle" font-family="Arial, sans-serif">
                    <circle cx="0" cy="-19" r="30" fill="#211044" stroke="#e8c4ff" stroke-width="3"/>
                    <path d="M0 -47 L7 -27 L28 -19 L7 -11 L0 9 L-7 -11 L-28 -19 L-7 -27 Z" fill="#fff4ff"/>
                    <circle cx="-16" cy="-34" r="3" fill="#55eaff"/><circle cx="17" cy="-5" r="3" fill="#ff75d7"/>
                    <text x="0" y="25" fill="#ffffff" font-size="20" font-weight="bold">GALAXIA</text>
                    <text x="0" y="48" fill="#ffe082" font-size="23" font-weight="bold">${porcentaje}</text>
                </g>`);
        } else {
            partes.push(`
                <g transform="translate(${xTexto.toFixed(2)} ${yTexto.toFixed(2)})" text-anchor="middle" font-family="Arial, sans-serif">
                    <circle cx="0" cy="-19" r="29" fill="#ffe082" stroke="#fff5c2" stroke-width="4"/>
                    <circle cx="0" cy="-19" r="22" fill="none" stroke="#b77916" stroke-width="3"/>
                    <text x="0" y="-12" fill="#54320a" font-size="${premio.cantidad === 100 ? 17 : 21}" font-weight="bold">${premio.cantidad}</text>
                    <text x="0" y="25" fill="#ffffff" font-size="23" font-weight="bold">${porcentaje}</text>
                    <text x="0" y="45" fill="#fff2d0" font-size="13">CRÉDITOS</text>
                </g>`);
        }
    });

    ruletaVisual.innerHTML = `
        <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Premios: 10 créditos 35 por ciento, 20 créditos 25 por ciento, 30 créditos 20 por ciento, 50 créditos 12 por ciento, 100 créditos 7 por ciento y Galaxia 1 por ciento">
            <defs>
                <radialGradient id="centroRuleta"><stop offset="0%" stop-color="#49305f"/><stop offset="100%" stop-color="#17131d"/></radialGradient>
            </defs>
            ${partes.join("")}
            <circle cx="300" cy="300" r="52" fill="url(#centroRuleta)" stroke="#ffe082" stroke-width="7"/>
            <text x="300" y="294" text-anchor="middle" fill="#ffffff" font-size="19" font-weight="bold">GIRO</text>
            <text x="300" y="320" text-anchor="middle" fill="#ffe082" font-size="20">✦</text>
        </svg>`;
}

dibujarRuleta();

function actualizarEstadoRuleta() {
    const yaGiro = fechaUltimaRuleta === fechaLocalHoy();
    botonGirarRuleta.disabled = yaGiro;
    botonGirarRuleta.textContent = yaGiro ? "Ya giraste hoy" : "Girar gratis";
    if (yaGiro && !ruletaVisual.classList.contains("girando")) {
        resultadoRuleta.textContent = "Tu tirada diaria ya fue utilizada. ¡Vuelve mañana!";
    }
}

function elegirPremioRuleta() {
    const total = premiosRuleta.reduce((suma, premio) => suma + premio.peso, 0);
    let numero = Math.random() * total;
    for (const premio of premiosRuleta) {
        numero -= premio.peso;
        if (numero < 0) return premio;
    }
    return premiosRuleta[0];
}

function girarRuletaDiaria() {
    if (fechaUltimaRuleta === fechaLocalHoy()) {
        actualizarEstadoRuleta();
        return;
    }
    botonGirarRuleta.disabled = true;
    const premio = elegirPremioRuleta();
    const indicePremio = premiosRuleta.indexOf(premio);
    const centroSector = -90 + indicePremio * 60 + 30;
    const alineacion = (270 - centroSector + 360) % 360;

    // Reinicia la transición desde la posición actual y termina apuntando al premio sorteado.
    ruletaVisual.style.transition = "none";
    ruletaVisual.style.transform = `rotate(${rotacionRuleta}deg)`;
    void ruletaVisual.offsetWidth;
    ruletaVisual.style.transition = "transform 2.9s cubic-bezier(.12,.75,.16,1)";
    rotacionRuleta += 360 * 5 + alineacion;
    ruletaVisual.classList.add("girando");
    ruletaVisual.style.transform = `rotate(${rotacionRuleta}deg)`;

    resultadoRuleta.textContent = "La ruleta está girando...";
    fechaUltimaRuleta = fechaLocalHoy();
    guardarEconomia();

    window.setTimeout(() => {
        ruletaVisual.classList.remove("girando");
        if (premio.tipo === "creditos") {
            creditos += premio.cantidad;
            resultadoRuleta.textContent = `¡Ganaste ${premio.cantidad} créditos! 💎`;
        } else {
            coloresPropios.reverso = [...new Set([...coloresPropios.reverso, "galaxia"])];
            coloresPropios.frente = [...new Set([...coloresPropios.frente, "galaxia"])];
            resultadoRuleta.textContent = "¡¡PREMIO PRINCIPAL!! Desbloqueaste GALAXIA para el reverso y el frente. 🌌";
        }
        guardarEconomia();
        actualizarSaldo();
        renderizarTienda();
        actualizarEstadoRuleta();
        // Mostrar el premio recién obtenido aunque la tirada ya esté marcada como usada.
        resultadoRuleta.textContent = premio.tipo === "creditos"
            ? `¡Ganaste ${premio.cantidad} créditos! 💎 Vuelve mañana para otra tirada.`
            : "¡¡PREMIO PRINCIPAL!! Desbloqueaste GALAXIA para ambas caras. 🌌 ¡Vuelve mañana!";
    }, 2900);
}

botonAbrirTienda.addEventListener("click", () => abrirPanel("tienda"));
botonAbrirRuleta.addEventListener("click", () => abrirPanel("ruleta"));
document.getElementById("cerrarTienda").addEventListener("click", () => cerrarPanel("tienda"));
document.getElementById("cerrarRuleta").addEventListener("click", () => cerrarPanel("ruleta"));
botonGirarRuleta.addEventListener("click", girarRuletaDiaria);

// Cada resultado aparece una sola vez en todo el banco.
const bancoParejas = [
    // RAÍCES
    { id: 1, operacion: "√4", resultado: "2" },
    { id: 8, operacion: "√9", resultado: "3" },
    { id: 15, operacion: "√16", resultado: "4" },
    { id: 22, operacion: "√25", resultado: "5" },
    { id: 29, operacion: "√36", resultado: "6" },
    { id: 30, operacion: "√49", resultado: "7" },

    // SUMAS
    { id: 2, operacion: "8 + 5", resultado: "13" },
    { id: 9, operacion: "9 + 6", resultado: "15" },
    { id: 16, operacion: "10 + 7", resultado: "17" },
    { id: 23, operacion: "12 + 7", resultado: "19" },

    // RESTAS
    { id: 3, operacion: "30 - 9", resultado: "21" },
    { id: 10, operacion: "35 - 12", resultado: "23" },
    { id: 17, operacion: "40 - 14", resultado: "26" },
    { id: 24, operacion: "50 - 23", resultado: "27" },

    // MULTIPLICACIONES
    { id: 4, operacion: "4 × 7", resultado: "28" },
    { id: 11, operacion: "5 × 6", resultado: "30" },
    { id: 18, operacion: "8 × 4", resultado: "32" },
    { id: 25, operacion: "7 × 5", resultado: "35" },

    // DIVISIONES
    { id: 5, operacion: "81 ÷ 9", resultado: "9" },
    { id: 12, operacion: "88 ÷ 8", resultado: "11" },
    { id: 19, operacion: "96 ÷ 8", resultado: "12" },
    { id: 26, operacion: "98 ÷ 7", resultado: "14" },

    // POTENCIAS
    { id: 6, operacion: "2⁴", resultado: "16" },
    { id: 13, operacion: "5²", resultado: "25" },
    { id: 20, operacion: "6²", resultado: "36" },
    { id: 27, operacion: "7²", resultado: "49" },

    // LOGARITMOS
    { id: 7, operacion: "log₂(256)", resultado: "8" },
    { id: 14, operacion: "log₂(1024)", resultado: "10" },
    { id: 21, operacion: "log₂(262144)", resultado: "18" },
    { id: 28, operacion: "log₂(1048576)", resultado: "20" }
];
// Cantidad de parejas por dificultad.
const dificultades = {
    facil: 8,
    medio: 12,
    dificil: 20,
    secreta: 30
};

// Estado del juego.
let cantidadJugadores = 2;
let puntajes = [];
let jugadorActual = 0;
let cartasElegidas = [];
let parejasEncontradas = 0;
let totalParejas = 0;
let bloqueado = false;
let partidaActiva = false;

// Progreso guardado en el navegador.
let racha = 0;
let ultimoGanador = null;
let secretaDesbloqueada = false;

// Cargar progreso anterior.
function cargarProgreso() {
    try {
        racha = Number(localStorage.getItem("racha")) || 0;

        ultimoGanador = localStorage.getItem("ultimoGanador");
        ultimoGanador = ultimoGanador === null
            ? null
            : Number(ultimoGanador);

        secretaDesbloqueada =
            localStorage.getItem("secretaDesbloqueada") === "true";
    } catch (error) {
        console.log("No se pudo cargar el progreso guardado.");
    }

    actualizarDesbloqueo();
    actualizarRacha();
}

// Guardar progreso.
function guardarProgreso() {
    try {
        localStorage.setItem("racha", racha);

        if (ultimoGanador === null) {
            localStorage.removeItem("ultimoGanador");
        } else {
            localStorage.setItem("ultimoGanador", ultimoGanador);
        }

        localStorage.setItem(
            "secretaDesbloqueada",
            secretaDesbloqueada
        );
    } catch (error) {
        console.log("No se pudo guardar el progreso.");
    }
}

// Actualizar la dificultad secreta.
function actualizarDesbloqueo() {
    const opcionSecreta = selectorDificultad.querySelector(
        'option[value="secreta"]'
    );

    opcionSecreta.disabled = !secretaDesbloqueada;

    if (secretaDesbloqueada) {
        opcionSecreta.textContent = "Secreta — 60 cartas 🔓";
    } else {
        opcionSecreta.textContent = "Secreta — 60 cartas 🔒";
    }
}

// Mostrar la racha.
function actualizarRacha() {
    if (racha === 0 || ultimoGanador === null) {
        rachaTexto.textContent =
            "Racha: ningún ganador consecutivo todavía";
    } else {
        rachaTexto.textContent =
            `Racha de Jugador ${ultimoGanador}: ${racha}/10 victorias`;
    }
}

// Mezclar las cartas.
function mezclarCartas(lista) {
    const mezcla = [...lista];

    for (let i = mezcla.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [mezcla[i], mezcla[j]] = [mezcla[j], mezcla[i]];
    }

    return mezcla;
}

// Crear el marcador.
function crearMarcador() {
    marcador.innerHTML = "";

    for (let i = 0; i < cantidadJugadores; i++) {
        const caja = document.createElement("div");
        caja.className = "jugador";
        caja.id = `jugador${i}`;

        caja.innerHTML = `
            <h2>Jugador ${i + 1}</h2>
            <p id="puntos${i}">Puntos: 0</p>
        `;

        marcador.appendChild(caja);
    }

    actualizarMarcador();
}

// Actualizar puntajes y turno.
function actualizarMarcador() {
    for (let i = 0; i < cantidadJugadores; i++) {
        const puntos = document.getElementById(`puntos${i}`);

        if (puntos) {
            puntos.textContent = `Puntos: ${puntajes[i]}`;
        }

        const caja = document.getElementById(`jugador${i}`);

        if (caja) {
            caja.classList.toggle("activo", i === jugadorActual);
        }
    }

    if (partidaActiva) {
        turnoTexto.textContent =
            `Turno del Jugador ${jugadorActual + 1}`;
    }
}

// Pasar al siguiente jugador.
function cambiarTurno() {
    jugadorActual = (jugadorActual + 1) % cantidadJugadores;
    actualizarMarcador();
}

// Crear una carta.
function crearCarta(carta) {
    const boton = document.createElement("button");

    boton.className = "carta";
    boton.textContent = "?";
    boton.setAttribute("aria-label", "Carta oculta");

    boton.addEventListener("click", () => {
        seleccionarCarta(carta, boton);
    });

    tablero.appendChild(boton);
}

// Seleccionar una carta.
function seleccionarCarta(carta, boton) {
    if (
        !partidaActiva ||
        bloqueado ||
        boton.disabled ||
        boton.classList.contains("descubierta") ||
        cartasElegidas.length >= 2
    ) {
        return;
    }

    boton.textContent = carta.texto;
    boton.classList.add("descubierta");
    boton.setAttribute("aria-label", carta.texto);

    cartasElegidas.push({
        parejaId: carta.parejaId,
        boton: boton
    });

    if (cartasElegidas.length === 2) {
        revisarPareja();
    }
}

// Comprobar si las cartas forman una pareja.
function revisarPareja() {
    const primera = cartasElegidas[0];
    const segunda = cartasElegidas[1];

    if (primera.parejaId === segunda.parejaId) {
        primera.boton.classList.add("encontrada");
        segunda.boton.classList.add("encontrada");

        primera.boton.disabled = true;
        segunda.boton.disabled = true;

        puntajes[jugadorActual]++;
        parejasEncontradas++;

        cartasElegidas = [];
        actualizarMarcador();

        if (parejasEncontradas === totalParejas) {
            finalizarPartida();
        }

        // Si acierta, el jugador conserva su turno.
    } else {
        bloqueado = true;

        setTimeout(() => {
            primera.boton.textContent = "?";
            segunda.boton.textContent = "?";

            primera.boton.classList.remove("descubierta");
            segunda.boton.classList.remove("descubierta");

            primera.boton.setAttribute("aria-label", "Carta oculta");
            segunda.boton.setAttribute("aria-label", "Carta oculta");

            cartasElegidas = [];
            bloqueado = false;

            cambiarTurno();
        }, 1000);
    }
}

// Registrar la victoria y la racha.
function registrarGanador(ganador) {
    if (ultimoGanador === ganador) {
        racha++;
    } else {
        ultimoGanador = ganador;
        racha = 1;
    }

    if (racha >= 10 && !secretaDesbloqueada) {
        secretaDesbloqueada = true;
        actualizarDesbloqueo();

        mensaje.textContent =
            "¡INCREÍBLE! 🔓 ¡Desbloqueaste la dificultad secreta!";
    }

    guardarProgreso();
    actualizarRacha();
}

// Finalizar la partida.
function finalizarPartida() {
    partidaActiva = false;

    const puntajeMayor = Math.max(...puntajes);
    const ganadores = [];

    puntajes.forEach((puntos, indice) => {
        if (puntos === puntajeMayor) {
            ganadores.push(indice);
        }
    });

    if (ganadores.length === 1) {
        const ganador = ganadores[0] + 1;

        turnoTexto.textContent =
            `¡Gana el Jugador ${ganador}! 🏆`;

        registrarGanador(ganador);
        creditos += RECOMPENSA_VICTORIA;
        guardarEconomia();
        actualizarSaldo();

        const avisoSecreta = racha === 10 && secretaDesbloqueada
            ? " ¡Además desbloqueaste la dificultad secreta!"
            : "";
        mensaje.textContent =
            `¡Jugador ${ganador} ganó y recibió ${RECOMPENSA_VICTORIA} créditos! Racha: ${racha}/10.${avisoSecreta}`;
    } else {
        turnoTexto.textContent = "¡Tenemos un empate! 🤝";

        racha = 0;
        ultimoGanador = null;

        guardarProgreso();
        actualizarRacha();

        mensaje.textContent =
            "El empate interrumpe la racha de victorias.";
    }
}

// Iniciar una partida nueva.
function iniciarJuego() {
    cantidadJugadores = Number(selectorJugadores.value);

    const dificultad = selectorDificultad.value;

    if (dificultad === "secreta" && !secretaDesbloqueada) {
        mensaje.textContent =
            "Primero debes desbloquear la dificultad secreta.";

        selectorDificultad.value = "dificil";
        return;
    }

    totalParejas = dificultades[dificultad];

    puntajes = Array(cantidadJugadores).fill(0);
    jugadorActual = 0;
    cartasElegidas = [];
    parejasEncontradas = 0;
    bloqueado = false;
    partidaActiva = true;

    mensaje.textContent = "";
    tablero.innerHTML = "";

    crearMarcador();

    // Elegir las parejas según la dificultad.
    const parejasDeLaPartida =
        bancoParejas.slice(0, totalParejas);

    // Cada pareja genera una carta de operación y otra de resultado.
    const cartas = [];

    parejasDeLaPartida.forEach((pareja) => {
        cartas.push({
            parejaId: pareja.id,
            texto: pareja.operacion
        });

        cartas.push({
            parejaId: pareja.id,
            texto: pareja.resultado
        });
    });

    const cartasMezcladas = mezclarCartas(cartas);

    cartasMezcladas.forEach(crearCarta);

    actualizarMarcador();

    turnoTexto.textContent = "Turno del Jugador 1";
}

// Botones.
botonComenzar.addEventListener("click", iniciarJuego);
botonReiniciar.addEventListener("click", iniciarJuego);

// Preparar el juego.
cargarEconomia();
cargarProgreso();