const urlHolder = document.querySelector(".url-holder__form");
const urlList = document.querySelector(".url-holder__list");
const urlInput = document.querySelector(".url-holder__input");

const URL_KEY = "urls";

let urlArray = [];

function handleUrlSummit(event) {
    event.preventDefault();
    const newUrlArray = urlInput.value;
    urlInput.value = "";
    const newUrlObj = {
        text: newUrlArray,
        id: Date.now(),
    };
    urlArray.push(newUrlObj);
    paintUrl(newUrlObj);
    saveUrlArray();
}
function paintUrl(newUrl) {
    const li = document.createElement("li");
    li.id = newUrl.id;
    const anchor = document.createElement("a");
    anchor.innerText = newUrl.text;
    anchor.setAttribute("href",`${newUrl.text}`);
    // setAttribute로 url 링크 생성 가능 !
    const button = document.createElement("button");
    button.innerHTML = `<i class="fas fa-eraser fa-lg"></i>`;
    button.addEventListener("click", deleteUrl);
    const buttonIcon = button.querySelector("i");
    buttonIcon.addEventListener("click",deleteUrlIcon);
    
    li.appendChild(anchor);
    li.appendChild(button);

    urlList.appendChild(li);

}

function deleteUrl(event) {
    const li = event.target.parentElement;
    li.remove();
    urlArray = urlArray.filter(urlArray => urlArray.id !== parseInt(li.id));
    saveUrlArray();        // 원래 있던 UrlArray 전역변수 배열
}
function deleteUrlIcon(event) {
    const icon = event.target.parentElement.parentElement;
    icon.remove();
    urlArray = urlArray.filter(toDo => toDo.id !== parseInt(icon.id));
    saveUrlArray();        // 원래 있던 UrlArray 전역변수 배열
}

function saveUrlArray() {
    localStorage.setItem(URL_KEY, JSON.stringify(urlArray));
}

urlHolder.addEventListener("submit", handleUrlSummit);

const savedUrlArray = localStorage.getItem(URL_KEY);

if (savedUrlArray !== null) {
    const parsedUrlArray = JSON.parse(savedUrlArray);
    urlArray = parsedUrlArray;
    parsedUrlArray.forEach(paintUrl);                                  // 배열의 각 요소에 대해서 해당 함수를 수행                                                                     // 수행되는 함수에 event매개변수를 넣으면 해당 배열의 각 요소가 event매개변수로 들어가서 수행됨
}                                                                    // 자체 함수 작성기능도 있다 arrow function =>