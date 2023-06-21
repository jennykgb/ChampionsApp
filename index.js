import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-bb228-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementsInDB = ref(database, "endorsements" );

const endorsementEl = document.getElementById("endorsement-el");
const publish = document.getElementById("publish")
const endorsementList = document.getElementById("endorsement-list")


publish.addEventListener("click", function(){
    let item = endorsementEl.value;
    push(endorsementsInDB, item);
    clearInput();
})

onValue(endorsementsInDB, function(snapshot){
    let listDB = Object.entries(snapshot.val());
    clearEndorsementList();
    if (snapshot.exists()){
        for(let i=0; i<listDB.length; i++){
            let endorsementItem = listDB[i];
            addToList(endorsementItem);
        }
    } else{
        endorsementList.innerHTML = "No endorsements yet"
    }

    

})

function clearEndorsementList(){
    endorsementList.innerHTML = "";
}

function clearInput(){
    endorsementEl.value = "";
}

function addToList(item){
    let itemID = item[0];
    let itemValue = item[1];
    let newEl = document.createElement("li");
    newEl.textContent = itemValue;
    


    endorsementList.append(newEl);
}