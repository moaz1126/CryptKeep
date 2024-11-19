const searchInput = document.querySelector('#searchInput');
let appName = document.querySelectorAll('.appName')
let apps = document.querySelectorAll('.app')


function search() {
    apps = document.querySelectorAll('.app')
    let searchValue = searchInput.value.toLowerCase();

    apps.forEach(app => {
        const h3 = app.querySelector('.appName');
        if (h3 && h3.textContent.toLowerCase().includes(searchValue)) {
            app.style.display = 'flex'
        } else {
            app.style.display = 'none'
        }
    });
};


searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        search()
    }
});

searchInput.addEventListener('input', function() {
    if(searchInput.value.length == 0) {
        apps.forEach(app => {
            app.style.display = 'flex'
        });
    }
})

let url;
async function searchAppIconSystem(appName) {

    appName = appName.replace(/[^a-zA-Z@.\s]/g, '');
    
    // If appName contains "@", handle it as an email
    if (appName.includes('@')) {
        const emailParts = appName.split('@');
        // Extract the domain name before the first dot
        appName = emailParts[1].split('.')[0]; 
    } else {
        appName = appName.replace(/[.@]/g, '');
    }
    
    const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(appName)}&entity=software`);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
        url = data.results[0].artworkUrl100
        return url // This returns the URL for the app icon

    } else {
        url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSKOIRNwD0mR-2Kud7sg3GEiom5Y1idhcYqw&s'
        console.error('App not found');
        return url
    }
}


function generateRandomPassword(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    let password2 = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password2 += characters[randomIndex];
    }
    return password2
}
 
function RandomPassword() {
    let lengthValue = +lengthInput.value;
    PasswordInput.value = generateRandomPassword(lengthValue)
}

const appsDiv = document.querySelector('#apps')
function addAPP(appName, password, i, imgURL, Value, username) {
    appsDiv.innerHTML = appsDiv.innerHTML + `
        <div class="app">
            <img src="${imgURL}">
            <div class="content">
                <h4 class="appName">${appName}</h4>
                <span onclick="menu2(${i})" class="editDots"><i class="fa-solid fa-ellipsis"></i></span>
                <div class="usernamediv">
                    <input type="text" class="usernameinput" value="${username}" readonly>
                </div>
                <div class="password">
                    <input type="password" class="password2 PassContent" value="${password}" readonly>
                    <button onclick="PassCopy(${i})">Copy</button>
                    <span onclick="eyeFun(${i})"><i class="fa-regular fa-eye"></i></span>
                    <span onclick="eyeFun(${i})"><i class="fa-regular fa-eye-slash"></i></span>
                </div>
                <div class="editMenu">
                    <span onclick="xmarkspanFun(${i})"><i class="fa-solid fa-pen-to-square"></i> Edit</span>
                    <span onclick="xmarkBackupFun(${i})"><i class="fa-solid fa-floppy-disk"></i> Backups</span>
                    <span onclick="RemoveApp(${i})"><i class="fa-solid fa-trash"></i> Remove</span>
                </div>
                <div class="editpassword">
                    <span onclick="xmarkspanFun(${i})"><i class="fa-solid fa-xmark"></i></span>
                    <input type="text" class="EdotedUsername" value="${username}">
                    <input type="password" class="EdotedPassword">
                    <button onclick="Editpassword(${i})">Enter</button>
                </div>
                <div class="backupcodes">
                    <span onclick="xmarkBackupFun(${i})"><i class="fa-solid fa-xmark"></i></span>
                    <textarea class="backcodes">${Value}</textarea>
                    <span onclick="textareaUpdate(${i})"><i class="fa-solid fa-check"></i></span>
                </div>
            </div>
        </div>
    `
}

function DawnJson() {
    if(FileContent) {
        var jsonStr = JSON.stringify(FileContent);
        var blob = new Blob([jsonStr], { type: "application/json" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "passwords.json";
        document.body.appendChild(a);
        a.setAttribute("target", "_blank");
        a.click();
        document.body.removeChild(a);    
    } else {
        alert('You didnt uplode a file or save a data')
    }
}

function localstorge() {
    let checkbox = document.querySelector('#passwordlocalstorge');
    if (checkbox.checked) {
        window.localStorage.setItem('SaveToLocalStorge', true)
        window.localStorage.setItem('Passwords', JSON.stringify(FileContent))
        alert('Now you dont need to upload the file, Just enter your passkey and second passkey')
    } else {
        window.localStorage.setItem('SaveToLocalStorge', false)
        window.localStorage.removeItem('Passwords')
    }
}
window.addEventListener('load', function() {
    createSH();
    let checkbox = document.querySelector('#passwordlocalstorge');
    if(window.localStorage.getItem('SaveToLocalStorge') == 'true') {
        checkbox.checked = true;
        FileContent = JSON.parse(window.localStorage.getItem('Passwords'));
    } else {
        checkbox.checked = false
    }

    if(window.localStorage.getItem('FristTime')) {

    } else {
        window.location.href = 'Other/introduction.html'
    }
});


let newpasskey = document.querySelector('#newpasskey');
function createiv() {
    if(newpasskey.value.length > 4) {
        passkey = newpasskey.value;
        let cryptoiven =  crypto.getRandomValues(new Uint8Array(12));
        let criptoiv = base64Encode(String.fromCharCode(...cryptoiven));
        // console.log(criptoiv, cryptoiven)
        FileContent = {}
        passkey2 = criptoiv;
    
        createMenu.style.display = 'none'
        ivSH(criptoiv);
    } else {
        alert('Enter passkey')
    }
}


let textareaa = document.querySelectorAll('.backcodes');
async function textareaUpdate(e) {
    textareaa = document.querySelectorAll('.backcodes');
    let h3 = document.querySelectorAll('.appName')[e];
    if(textareaa[e].value.length != 0) {
        let encriptedtextarea = await encrypt(textareaa[e].value, passkey, passkey2);
        FileContent[h3.textContent].backup = encriptedtextarea;
        if(window.localStorage.getItem('SaveToLocalStorge') == 'true') {
            window.localStorage.setItem('Passwords', JSON.stringify(FileContent))
        } 
    } else {
        delete FileContent[h3.textContent].backup;
        if(window.localStorage.getItem('SaveToLocalStorge') == 'true') {
            window.localStorage.setItem('Passwords', JSON.stringify(FileContent))
        } 
    }
    xmarkBackupFun(e)
}

