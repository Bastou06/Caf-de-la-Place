let tableau1;

// SAUVEGARDE DU TABLEAU DANS LE LOCAL STORAGE

function sauvJson() {
  let sensjson = JSON.stringify(tableau1);
  localStorage.setItem("jsontableau1", sensjson);

  console.log(localStorage);
}

if (!localStorage.getItem("jsontableau1")) {
  //localStorage.getItem("jsontableau1")==0

  tableau1 = [];
} else {
  let localstorgeparse = JSON.parse(localStorage.getItem("jsontableau1"));

  tableau1 = localstorgeparse;
}

// IMPORTATION DES ELEMENTS

let suprButton = document.querySelectorAll(".btnSupr");
let ModiButton = document.querySelectorAll(".btnModi");
let formulaire = document.getElementById("inscriptions");
let formulaire1 = document.querySelector("inscriptions");
let formulaireE = document.getElementById("inscriptionsedit");
let qrcodejason = document.getElementById("qrcodeid");
let typeselect = document.querySelector("#Type");
let degreealdisp = document.querySelector("#degres");
let prixvhtM = document.querySelector("#prixVenteHT");
let prixahtm = document.querySelector("#prixAchatHT");
let tableaujson = [];

// FONCTION BOUTON SUPPRIMER

function suprButton1(ele, index) {
  suprButton = document.querySelectorAll(".btnSupr");

  suprButton.forEach((ele, index) =>
    ele.addEventListener("click", function (ele) {
      tableau1.slice(index);
      populateTableList();
      //  suprButton = document.querySelectorAll(".btnSupr");
      suprButton1(ele, index);
    })
  );
}

function populateTableList() {
  let listOfName = "";

  console.log(tableau1);
  tableau1.map((ele, index) => {
    listOfName += ` 
    <tr class="text-center ">
      <td class="w-8 align-middle" >${ele.Type}</td>      
      <td class="w-8 align-middle">${ele.nom}</td>
      <td class="w-8 align-middle">${ele.quantite}</td>
      <td class="w-8 align-middle">${ele.prixAchatHT}</td>
      <td class="w-8 align-middle">${ele.prixVenteHT}</td>
      <td class="w-4 align-middle">${ele.margeHT}</td>
      <td class="w-4 align-middle">${ele.prixVenteTTC}</td>
      <td class="w-4 align-middle" >${
        ele.Type == "Alcoolisée" ? ele.degres : ""
      }</td>
      
      <td><button id="${tableau1.indexOf(
        ele
      )}" class="btnSupr" onclick='SuprTableList(${index})'>Suprimer</button></td>
    <td><button id="${tableau1.indexOf(
      ele
    )}" class="btnModi" onclick='ModiTableList(${index})'>Modifier</button></td>


    </tr>
      
    `;
  });

  document.getElementById("NameList").innerHTML = listOfName;
  suprButton1();
  ModiButton1();
  sauvJson();
}

function SuprTableList(index) {
  console.log(index);
  tableau1.splice(index, 1);
  window.location.reload();
  populateTableList();
}

// FONCTION BOUTON MODIFIER

function ModiButton1(ele, index) {
  ModiButton = document.querySelectorAll(".btnModi");

  ModiButton.forEach((ele, index) =>
    ele.addEventListener("click", function (ele) {
      $("#modalEdit").modal("show");

      populateTableList();
      //  suprButton = document.querySelectorAll(".btnSupr");
    })
  );
}

// Création du prototype general PRODUIT

function Produit(
  Type,
  nom,
  quantite,
  prixAchatHT,
  prixVenteHT,
  margeHT,
  prixVenteTTC
) {
  this.Type = Type;
  this.nom = nom;
  this.quantite = quantite;
  this.prixAchatHT = prixAchatHT;
  this.prixVenteHT = prixVenteHT;
  this.margeHT = margeHT;
  this.prixVenteTTC = prixVenteTTC;
}

// Création du prototype BOISSON ALCOOLISEE

function BoissonAlcoolisee(
  Type,
  nom,
  quantite,
  prixAchatHT,
  prixVenteHT,
  margeHT,
  prixVenteTTC,
  degres
) {
  Produit.call(
    this,
    Type,
    nom,
    quantite,
    prixAchatHT,
    prixVenteHT,
    margeHT,
    prixVenteTTC
  );
  this.degres = degres;
}

// Création du prototype BOISSON NON ALCOOLISEE

function BoissonNonAlcoolisee(
  Type,
  nom,
  quantite,
  prixAchatHT,
  prixVenteHT,
  margeHT,
  prixVenteTTC
) {
  Produit.call(
    this,
    Type,
    nom,
    quantite,
    prixAchatHT,
    prixVenteHT,
    margeHT,
    prixVenteTTC
  );
}

// CREATION du prototype AUTRES

function AutresChoix(
  Type,
  nom,
  quantite,
  prixAchatHT,
  prixVenteHT,
  margeHT,
  prixVenteTTC
) {
  Produit.call(
    this,
    Type,
    nom,
    quantite,
    prixAchatHT,
    prixVenteHT,
    margeHT,
    prixVenteTTC
  );
}

// FONCTION QR CODE

function valideqr() {
  tableaujson.push(
    formulaire[2].value,
    formulaire[3].value,
    formulaire[4].value,
    formulaire[5].value,
    formulaire[6].value,
    formulaire[7].value,
    formulaire[8].value
  );

  // formulaire.forEach((ele)=>

  //  tableaujson.push(ele.input.value),
  // )

  let jsonqrcode = JSON.stringify(tableaujson);

  qrcodejason.value = jsonqrcode;
  makeCode();

  var divContents = document.getElementById("qrcode").innerHTML;
  var a = window.open("", "", "height=500, width=500");
  a.document.write("<html><body >");
  a.document.write(divContents);
  a.document.write("</body></html>");
  a.document.close();
  a.print();
}

// -------------------------------------------------------------------------------------------
// submission modal

// -------------------------------------------------------------------------------------------
document
  .getElementById("inscriptions")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    let formData = new FormData(formulaire);

    let Type = formData.get("Type");
    let nom = formData.get("nom");
    let quantite = formData.get("quantite");
    let prixAchatHT = formData.get("prixAchatHT");
    let prixVenteHT = formData.get("prixVenteHT");
    let margeHT = prixVenteHT - prixAchatHT;
    let prixVenteTTC = formData.get("PrixVenteTTC");
    let degres = formData.get("degres");

    // Création de l'objet produit
    console.log(Type);
    if (Type == "Alcoolisée") {
      let prixVenteTTC = prixVenteHT * 1.2;

      let produit = new BoissonAlcoolisee(
        Type,
        nom,
        quantite,
        prixAchatHT,
        prixVenteHT,
        margeHT,
        prixVenteTTC,
        degres
      );
      console.log("ligne 145", produit);
      tableau1.push(produit);
    } else if (Type == "Non Alcoolisée") {
      let prixVenteTTC = prixVenteHT * 1.055;

      let produit = new BoissonNonAlcoolisee(
        Type,
        nom,
        quantite,
        prixAchatHT,
        prixVenteHT,
        margeHT,
        prixVenteTTC
      );
      tableau1.push(produit);
    } else if (Type == "autres") {
      let prixVenteTTC = prixVenteHT * 1.2;

      let produit = new AutresChoix(
        Type,
        nom,
        quantite,
        prixAchatHT,
        prixVenteHT,
        margeHT,
        prixVenteTTC
      );
      tableau1.push(produit);
    }

    //  let produit= new PersonneGeneral(prenom,nom,mail,tel)
    else window.location.reload();
    populateTableList();
  });

populateTableList();

function ModiTableList(index) {
  $("#modalEdit").modal("show");
  let nomMod1 = document.querySelectorAll("#nomMod");
  let quantiteMod1 = document.querySelectorAll("#quantiteMod");
  let prixAchatHTMod1 = document.querySelectorAll("#prixAchatHTMod");
  let prixVenteHTMod1 = document.querySelectorAll("#prixVenteHTMod");
  let degresMod1 = document.querySelectorAll("#degresMod");
  (nomMod1[0].value = tableau1[index].nom),
    (quantiteMod1[0].value = tableau1[index].quantite),
    (prixAchatHTMod1[0].value = tableau1[index].prixAchatHT),
    (prixVenteHTMod1[0].value = tableau1[index].prixVenteHT),
    (degresMod1[0].value = tableau1[index].degres),
    console.log("341");
  tableau1.splice(index, 1);

  document
    .querySelector("#inscriptionsedit")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      let formData = new FormData(formulaireE);

      let Type = formData.get("Type");
      let nom = formData.get("nomX");
      let quantite = formData.get("quantiteX");
      let prixAchatHT = formData.get("prixAchatHTX");
      let prixVenteHT = formData.get("prixVenteHTX");
      let margeHT = prixVenteHT - prixAchatHT;
      let prixVenteTTC;
      let degres = formData.get("degresX");

      // Création de l'objet produit
      console.log(Type);
      if (Type == "Alcoolisée") {
        let prixVenteTTC = prixVenteHT * 1.2;

        let produit = new BoissonAlcoolisee(
          Type,
          nom,
          quantite,
          prixAchatHT,
          prixVenteHT,
          margeHT,
          prixVenteTTC,
          degres
        );
        console.log("ligne 145", produit);
        tableau1.splice(index, 0, produit);
      } else if (Type == "Non Alcoolisée") {
        let prixVenteTTC = prixVenteHT * 1.055;

        let produit = new BoissonNonAlcoolisee(
          Type,
          nom,
          quantite,
          prixAchatHT,
          prixVenteHT,
          margeHT,
          prixVenteTTC
        );
        tableau1.splice(index, 0, produit);
      } else if (Type == "autres") {
        let prixVenteTTC = prixVenteHT * 1.2;

        let produit = new AutresChoix(
          Type,
          nom,
          quantite,
          prixAchatHT,
          prixVenteHT,
          margeHT,
          prixVenteTTC
        );
      }
      //  let produit= new PersonneGeneral(prenom,nom,mail,tel)
      $("#modalEdit").modal("hide");
      window.location.reload();
      populateTableList();
    });
}

typeselect.addEventListener("change", function (e) {
  if (e.target.value !== "Alcoolisée") {
    degreealdisp.style.display = "none";
    degreealdisp.value = "none";
  } else if (e.target.value == "Alcoolisée") {
    degreealdisp.style.display = "block";
    degreealdisp.value = "";
  }
});

prixahtm.addEventListener("change", function (e) {
  document.querySelector("#margeHT").value = prixvhtM.value - prixahtm.value;
});
prixvhtM.addEventListener("change", function (e) {
  document.querySelector("#margeHT").value = prixvhtM.value - prixahtm.value;
  if (typeselect.value == "Alcoolisée") {
    document.querySelector("#prixVenteTTC").value = prixvhtM.value * 1.2;
  } else if (typeselect.value == "Non Alcoolisée") {
    document.querySelector("#prixVenteTTC").value = prixvhtM.value * 1.055;
  } else {
    document.querySelector("#prixVenteTTC").value = prixvhtM.value * 1.1;
  }
});

//vente
var sel = document.querySelector("#listeproduitvente");
var opt = null;

for (i = 0; i < tableau1.length; i++) {
  opt = document.createElement("option");
  opt.value = tableau1[i].nom;
  opt.innerHTML = tableau1[i].nom;
  sel.appendChild(opt);
}
var qtes = document.querySelector("#quantites");
var qtev = document.querySelector("#quantitev");
console.table(tableau1);
sel.addEventListener("change", function (e) {
  var quantiteinp = tableau1.filter(function (e) {
    return e.nom == sel.value;
  });
  qtes.value = quantiteinp[0].quantite;

  qtev.addEventListener("change", function (e) {
    quantiteinp[0].quantite = quantiteinp[0].quantite - qtev.value;
    console.table(tableau1);
    populateTableList();
    window.location.reload();
  });
});
