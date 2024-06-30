let theInput = document.querySelector('.input'),
    addRepo = document.querySelector('.add'),
    containerRepos = document.querySelector('.repos');

//-------------------------------- on click button add repos -------------------------------------
addRepo.onclick = function () {
    // check if input empty
    if (theInput.value == "") {
        containerRepos.innerHTML ="<span>please enter value</span>";
    }
    else {
        fetch(`https://api.github.com/users/${theInput.value}/repos`)
            .then(response => response.json())
            // .then(json => console.log(json));
            .then(json => {
                addRepoPage(json);
                addRepoLocalStorage(json);
            });
    }
}
//--------------------------------  function add repo to page ------------------------------------
function addRepoPage(json) {
    theInput.value = '';
    containerRepos.innerHTML = "";
    json.forEach(repo => {
        // console.log(repo.title);
        // create box repo
        let boxRepo = document.createElement('div');
        boxRepo.className = "repos";
        let boxRepoText = document.createTextNode(repo.name);
        boxRepo.appendChild(boxRepoText);
        // create span visit
        let visitRepo = document.createElement('a');
        let textVisit = document.createTextNode("Visit");
        visitRepo.href = `https://github.com/${theInput.value}/${repo.name}`;
        visitRepo.setAttribute('target', '_blank');
        visitRepo.appendChild(textVisit);
        // append child
        boxRepo.appendChild(visitRepo);
        containerRepos.appendChild(boxRepo);
    })
}
//----------------------------  function add repo to local storage ---------------------------------

function addRepoLocalStorage(json) {
    let data = JSON.stringify(json);
    window.localStorage.setItem('Repos', data);
}
getRepoLocalStorage();
//----------------------------  function get repo from local storage ---------------------------------
function getRepoLocalStorage() {
    let data = localStorage.getItem('Repos');
    if (data) {
        let Repos = JSON.parse(data); 
        // console.log(Repos);
        addRepoPage(Repos);
    }
}



fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(json => console.log(json));