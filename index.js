import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-bb228-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementsInDB = ref(database, "endorsements" );

const endorsementEl = document.getElementById("endorsement-el");
const publish = document.getElementById("publish");
const endorsementList = document.getElementById("endorsement-list");
const fromEl = document.getElementById("from");
const toEl = document.getElementById("to");


publish.addEventListener("click", function(){
    let item = [endorsementEl.value, fromEl.value, toEl.value, 0];
    push(endorsementsInDB, item);
    clearInput();
})

onValue(endorsementsInDB, function(snapshot){
    
    
    if (snapshot.exists()){
        let listDB = Object.entries(snapshot.val());
        clearEndorsementList();

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
    fromEl.value = "";
    toEl.value = "";
}

function addToList(item){
    let itemID = item[0];
    let itemValue = item[1][0];
    let itemTo = item[1][1];
    let itemFrom = item[1][2];
    let hearts = item[1][3]
    let newEl = document.createElement("li");

    newEl.innerHTML = `<span class="bold">To ${itemTo}</span> <br><br> ${itemValue} <br><br> <span class="bold">From ${itemFrom}`;
    


    if(hearts>0){
        newEl.innerHTML += `<br><span class="hearts">❤️ ${hearts}</span>`
    }


    newEl.addEventListener("dblclick", function(){
        let exactLocationOfItemInDB = ref(database, `endorsements/${itemID}`);
        console.log(exactLocationOfItemInDB)
        remove(exactLocationOfItemInDB);
    })

    newEl.addEventListener("click", function(){
        let exactLocationOfHeartsInDB = ref(database, `endorsements/${itemID}`);
        hearts +=1;

        update(exactLocationOfHeartsInDB, {3: hearts})
    })
    

    endorsementList.append(newEl);
}