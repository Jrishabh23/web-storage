var storage = "local-storage";
const storageType = {
    "local-storage": localStorage,
    "session-storage": sessionStorage,
};
const buttonContainer = document.querySelector(".button-container");
const btn = document.querySelectorAll(".btn");
//TODO: It show active button
buttonContainer.addEventListener("click", (e) => {
    storage = e.target.dataset.tab;
    if (!storage) return;
    btn.forEach((button) => {
        button.classList.remove("active");
        document
            .querySelector(`.${button.dataset.tab}-list`)
            .classList.add("display-none");
        document
            .querySelector(".local-storage-details")
            .classList.remove("display-none");
    });

    e.target.classList.add("active");
    if (storage == "cookies-storage") {
        document
            .querySelector(".local-storage-details")
            .classList.add("display-none");
        document
            .querySelector(".cookies-storage-details")
            .classList.remove("display-none");
        document
            .querySelector(`.cookies-storage-list`)
            .classList.remove("display-none");
        listCookies();
    } else {
        document
            .querySelector(".cookies-storage-details")
            .classList.add("display-none");
        document
            .querySelector(`.${storage}-list`)
            .classList.remove("display-none");
        ShowList();
    }
});
//TODO: It submit the value
document.querySelector(".search-button").addEventListener("click", (e) => {
    let inputValue = document.querySelector(".storage-value").value.trim();
    if (!inputValue) return;
    if (storage == "cookies-storage") {
        setCookies(inputValue);
        return;
    }
    let searchItem = storageType[storage].getItem("search");
    if (!searchItem) {
        storageType[storage].setItem("search", inputValue);
        ShowList();
        return;
    }
    const searchValue = searchItem.split(",");
    if (searchValue.indexOf(inputValue) < 0) {
        searchItem = `${searchItem},${inputValue}`;
        storageType[storage].setItem("search", searchItem);
    }
    ShowList();
});
//TODO: It show list of storage
function ShowList() {
    let list = document.querySelector(`.${storage}-list`);
    document.getElementById(`${storage}-list`).innerHTML = "";
    const searchItem = storageType[storage].getItem("search");
    if (!searchItem) return;
    const searchValue = searchItem.split(",");
    searchValue.forEach((s) => {
        let div = document.createElement("div");
        div.classList.add("search-list");
        div.innerHTML = `${s} <small class="pull-right remove" onclick="removeItem('${s}')">Remove</small>`;
        list.append(div);
    });
}
ShowList();

//TODO: Remove the search box
function removeItem(item) {
    const searchItem = storageType[storage].getItem("search");
    const searchValue = searchItem.split(",");
    searchValue.splice(searchValue.indexOf(item), 1);
    storageType[storage].setItem("search", searchValue);
    ShowList();
}
//TODO: Clear storage
document.querySelector(".clear-search").addEventListener("click", (e) => {
    storageType[storage].clear();
    ShowList();
});

//TODO: Set cookies value
function setCookies(inputName) {
    listCookies();
}

//TODO: Add data in cookies storage
document
    .querySelector(".cookie-search-button")
    .addEventListener("click", (e) => {
        console.log(document.querySelector("input[name=key]").value);
        let key = document.querySelector("input[name=key]").value;
        let value = document.querySelector("input[name=value]").value;
        if (key != "" && value != "") {
            if (!document.cookie) {
                document.cookie = `${key}:${value}`;
            } else {
                let list = document.cookie;
                let cookieData = list.split("&&");
                let item = `${key}:${value}`;
                if (cookieData.indexOf(item) == -1) {
                    document.cookie = `${document.cookie}&&${item}`;
                }
            }
        }
        listCookies();
    });

//TODO: List of Cookies
function listCookies() {
    let cookieList = document.querySelector(".cookies-storage-list");
    document.getElementById("cookies-storage-list").innerHTML = "";
    let list = document.cookie;
    if (!list) return;
    let cookieData = list.split("&&");
    cookieData.forEach((s) => {
        let div = document.createElement("div");
        div.classList.add("search-list");
        div.innerHTML = `${s} <small class="pull-right remove" onclick="removeCookieItem('${s}')">Remove</small>`;
        cookieList.append(div);
    });
}

//TODO: Remove cookie item
function removeCookieItem(item) {
    let list = document.cookie;
    if (!list) return;
    let cookieData = list.split("&&");
    cookieData.splice(cookieData.indexOf(item), 1);
    document.cookie = cookieData.join("&&");
    listCookies();
}
