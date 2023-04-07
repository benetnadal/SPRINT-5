const jokes = []; //  emmagatzemem Provisionalment els acudits
const punts = []; //  guardem Provisionalment la puntuació seleccionada (1,2 o 3)
const reportAcudits = []; // Matriu encarregada d´emmagatzemar els acudits 


let recipientAcudits = document.querySelector(".acudits");
let botoAcudit = document.querySelector(".botoAcudit");


//----------------------------------------------- CLASSE ACUDIT -------------------------

class Acudit {
  constructor(joke, score, date) {
    this.joke = joke;
    this.score = score;
    this.date = date;
  }
}

//----------------------------- TEMPS ---------------------------------------------------

let recipientTemps = document.querySelector(".temps");
const API_URL = "https://api.openweathermap.org/data/2.5/weather?lat=41.38&lon=2.17&appid=7adc2d1b61823da097af5a12dee90148&units=metric"

fetch(`${API_URL}`)
.then((response) => response.json())
//.then((data) => console.log(data))
.then((data) =>{
  let tempValue = data["main"]["temp"];
  let descValue = data["weather"][0]["description"];
  let name = data["name"]
  recipientTemps.innerHTML = name + " - " + tempValue + " degrees " + " - " + descValue 
})


//-------------------------------------------------- API1 ACUDITS -----------------------

const cridaAcudit = async () => {   
  const resposta = await fetch("http://icanhazdadjoke.com", {
    headers: {
      Accept: "application/json",
    },
  });
  return resposta.json(); 
}


const seguentAcudit = async() => {   
  const {
    joke
  } = await cridaAcudit();
  //console.log(joke);
  recipientAcudits.innerHTML = joke; // Posa l´acudit a la class .acudits
  
  funcioMostrar(); // Posa els botons de la puntuació visibles ---> de display none a display block

  (jokes.length == 0)? jokes.push(joke):jokes.shift() && jokes.push(joke);  
  //console.log(jokes)
  (punts.length > 0)?punts.shift():void(0);// en cas de que l´usuari no seleccioni puntuació buidem l´array punts
      } 

//----------------------------------------- API 2 ACUDITS CHUCK NORRIS ------------------
let recipientNorris = document.querySelector(".norris");

const seguentAcuditNorris = async () =>
 { 
  const results = await fetch(`https://api.chucknorris.io/jokes/random`);
  const data = await results.json();

  let acuditNorris = data.value;
      //recipientNorris.innerHTML = data.value
      recipientAcudits.innerHTML = acuditNorris;

      funcioMostrar(); 

  (jokes.length == 0)? jokes.push(acuditNorris):jokes.shift() && jokes.push(acuditNorris);  

  (punts.length > 0)?punts.shift():void(0);
} 


//-----------------  SELECCIONAR ACUDITS ALEATORIAMENT DE LES API 1 I 2 -----------------

const numAleatori = () => {  
  let aleatori = Math.random()*2;
  aleatori = Math.floor(aleatori); //Redondeig a la baixa per obtenir 0 o 1
  (aleatori == 0)? seguentAcudit(): seguentAcuditNorris(); //Segons si aleatori és 0 o 1 carregarà API1 o API2
}

botoAcudit.addEventListener("click", numAleatori);  // Ens mostra un nou acudit derivant cap a API1 o API2

// ----Posa els botons de la puntuació visibles ---> de display none a display block

let funcioMostrar = () => document.getElementById("botonsPuntuacio").style.display = "block"


//------------------------------- PUNTUACIÓ USUARIS -------------------------------------

let puntuacio = x => (punts.length == 0)? punts.push(x):punts.shift() && punts.push(x);
//La matriu punts només disposarà un valor independentment de si l´usuari canvia d´opinió. 
//Si l´usuari no vota apareixerà "No puntuat" a la matriu [reportAcudits]

//----------------------------------- GENEREM LA MATRIU AMB ELS ACUDITS -----------------


let nouObjecte = () => {

  
  let data = new Date().toISOString(); //passem la data a string(-2hores) -->The timezone is always zero UTC offset, as denoted by the suffix Z.

  (punts.length == 0) ? punts.push("No puntuat") : void (0);

  let nouAcudit = new Acudit(jokes[0], punts[0], data); // Generem objectes dins la matriu 

  (jokes[0] != undefined)?reportAcudits.push(nouAcudit): void(0);// evitem la posició buida de l´inici
  
  console.log(reportAcudits); // Mostrem per consola els acudits 
}

botoAcudit.addEventListener("click", nouObjecte); // Generem l´array d´objectes reportAcudits



//------------------------------------------------ FI CODI ------------------------------



















  //----------------------------------------- acudits de Chuck Norris amb fetch
/* const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		'X-RapidAPI-Key': '3148b0e153mshc53c8eec71f8204p16805ajsn4328378fe333',
		'X-RapidAPI-Host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com'
	}
};

fetch('https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random', options)
	.then(response => response.json())
	//.then((jokes) => console.log(jokes.value))
	.then((jokes) => {
   // const comedy = jokes.map((jokeline) => jokeline.value);
    const comedy1 = jokes.value;         
    recipientNorris.innerHTML = comedy1
  })
 */