// ******************** Background Random ***********************
const video = ["bg1.mp4", "bg2.mp4", "bg3.mp4", "bg4.mp4", "bg5.mp4"];

const chosenVideo = video[Math.floor(Math.random() * video.length)];
const bgVideo = document.querySelector(".bg_video");
const bgVideoSrc = document.querySelector(".bg_video source");

bgVideoSrc.src = `./video/${chosenVideo}`;
bgVideo.appendChild(bgVideoSrc);


// *************************** Date *****************************
const time = document.querySelector(".date_time");
const today = document.querySelector(".date_today");

function getDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const day = now.getDay();

    const weekDay = ['일', '월', '화', '수', '목', '금', '토'];

    today.innerText = `${year}년 ${month}월 ${date}일 (${weekDay[day]})`;

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    time.innerText = `${hours}:${minutes}:${seconds}`;
}

getDate();
setInterval(getDate, 1000);


// **************************** quotes ****************************
const quotes = [{
        quote: "훌륭한 패자가 되는 것은 이기는 방법을 배우는 것이다.",
        author: "칼 샌드버그",
    },
    {
        quote: "영리함이 현명함은 아니다.",
        author: "에우리피데스",
    },
    {
        quote: "면전의 아첨꾼과 배후의 험담꾼은 똑같다.",
        author: "알프레드 테니슨",
    },
    {
        quote: "진실한 말 한미디는 연설만큼 위력이 있다.",
        author: "찰스 디킨스",
    },
    {
        quote: "명성과 성공을 혼돈하지 말라.",
        author: "에르마 봄벡",
    },
    {
        quote: "성공은 동료들에 대한 용서받지 못할 죄이다.",
        author: "앰브로즈 비어스",
    },
    {
        quote: "우정은 두 몸에 사는 하나의 영혼이다.",
        author: "아리스토텔레스",
    },
    {
        quote: "우정과 돈은 물과 기름 같다.",
        author: "마리오 푸조",
    },
    {
        quote: "모든 사람에게 친구인 사람은 누구에게도 친구가 아니다.",
        author: "아리스토텔레스",
    },
    {
        quote: "모든일이 그렇다. 쉽기 전에는 어렵다.",
        author: "토마스 풀러",
    },
];

const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = `${todaysQuote.quote} -${todaysQuote.author}-`;


// ************************* Login/Logout ******************************
const loginForm = document.querySelector("#login_form");
const loginInput = document.querySelector("#login_form input");
const greeting = document.querySelector(".greeting");
const logoutBtn = document.querySelector(".btn_logout");
const toDo = document.querySelector(".todo");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username"


function onLoginSubmit(event) {
    event.preventDefault();
    loginForm.classList.add(HIDDEN_CLASSNAME);
    toDo.classList.remove(HIDDEN_CLASSNAME);
    localStorage.setItem(USERNAME_KEY, loginInput.value);

    paintGreetings();
}

function paintGreetings() {
    const username = localStorage.getItem(USERNAME_KEY);
    greeting.innerText = `Have a good day, ${username}😊`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
    logoutBtn.classList.remove(HIDDEN_CLASSNAME);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    logoutBtn.classList.add(HIDDEN_CLASSNAME);
    toDo.classList.add(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);
} else {
    paintGreetings();
}

function onLogout(event) {
    event.preventDefault();
    localStorage.removeItem(USERNAME_KEY);
    window.location.reload();
}

logoutBtn.addEventListener("click", onLogout);


// ************************* todos ******************************
const toDoForm = document.querySelector("#todo_form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector("#todo_list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
    const listItem = event.target.parentElement;
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(listItem.id));
    listItem.remove();
    saveToDos();
}

function paintToDo(newTodo) {
    const toDoListItem = document.createElement("li");
    toDoListItem.id = newTodo.id;

    const toDoListItemText = document.createElement("span");
    toDoListItemText.innerText = newTodo.text;

    const toDoListDelete = document.createElement("button");
    toDoListDelete.innerText = "✔";
    toDoListDelete.addEventListener("click", deleteToDo);

    toDoListItem.append(toDoListDelete, toDoListItemText);
    toDoList.appendChild(toDoListItem);
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";

    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
    };
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;

    parsedToDos.forEach(paintToDo);
}



// ************************* weather ******************************
const API_KEY = '27006c965f68ff72867cd3d4faad6d1c';

function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const city = document.querySelector('.weather span:first-child');
            const weather = document.querySelector('.weather span:last-child');
            city.innerText = `${data.name}`;
            weather.innerText = `, ${Math.floor(data.main.temp)}℃ ${data.weather[0].main}`;
        });

}

function onGeoError() {
    alert("Please let us know!")
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);