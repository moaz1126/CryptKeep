const file = document.querySelector("#thePassFile");
const passkeyEl = document.querySelector("#enkey");
const passkeyElVI = document.querySelector("#enkeyIV");
let passkey, passkey2;
let done;

let fileName, extension, FileContent;
file.addEventListener('change', function(event) {
    event.target.files[0];
    const file = event.target.files[0];
    const reader = new FileReader();

    fileName = file.name; 
    extension = fileName.split('.').pop(); 

    if(extension == 'json') {
        
        reader.onload = function(e) {
            let content = e.target.result;
            FileContent = JSON.parse(content);
            if(window.localStorage.getItem('SaveToLocalStorge') == 'true') {
                window.localStorage.setItem('Passwords', JSON.stringify(FileContent))
            }
        };
    
        reader.readAsText(file);

        done = true
    } else {
        alert("Please uplode 'json' file")
    }
});

function ok() {
    if(done == true) {
        if(passkeyEl.value.length != 0 && passkeyElVI.value.length != 0) {
            uplodeSH()
            passkey = passkeyEl.value;
            passkey2 = passkeyElVI.value
            LoadData()
        } else {
            alert("please type your passkey and passkey 2")
        }
    } else {
        if(window.localStorage.getItem('SaveToLocalStorge') == 'true') {
            if(passkeyEl.value.length != 0 && passkeyElVI.value.length != 0) {
                uplodeSH()
                passkey = passkeyEl.value;
                passkey2 = passkeyElVI.value
                LoadData()
            } else {
                alert("please type your passkey and passkey 2")
            }
        } else {
            alert("please uplode 'json' file first")
        }
    }
}

async function LoadData() {
    // for (const [appName, details, index] of Object.entries(FileContent)) {
    //     let icon = await searchAppIconSystem(appName)
    //     console.log(index)
    // }  

    // Object.keys(FileContent).forEach((appName, index) => {
    //     const details = FileContent[appName];
    //     console.log(`App Number: ${index + 1}`);
    //     console.log(`App Name: ${appName}`);
    //     console.log(`Password: ${details.password}`);
    //     let icon = searchAppIconSystem(appName)
    //     console.log(icon)
    // });

    createMenu.style.display = 'none'
    let appsDiv = document.querySelector('#apps')
    appsDiv.innerHTML = ''
    const keys = Object.keys(FileContent)
    for (let i = 0; i < keys.length; i++) {
        const appName = keys[i];
        const details = FileContent[appName].password;
        let icon = await searchAppIconSystem(appName)
        let decryptPass = await decrypt(details, passkey, passkey2)
        if(FileContent[appName].backup) {
            let encriptBack = await decrypt(FileContent[appName].backup, passkey, passkey2)
            await addAPP(appName, decryptPass, i, icon, encriptBack);
        } else {
            await addAPP(appName, decryptPass, i, icon, '');
        }
    }
}

async function AddAPP() {
    
    if(passkey && passkey2) {
        if(searchInput.value.length > 0 && PasswordInput.value.length > 7) {
            if(!FileContent[searchInput.value]) {
                let encryptPassword = await encrypt(PasswordInput.value, passkey, passkey2);
                FileContent[searchInput.value] = { password: `${encryptPassword}` };
                
                let icon = await searchAppIconSystem(searchInput.value)
                // console.log(searchValue.value, PasswordInput.value, appsDiv.children.length, icon)
                addAPP(searchInput.value, PasswordInput.value, appsDiv.children.length, icon, '')
                if(window.localStorage.getItem('SaveToLocalStorge') == 'true') {
                    window.localStorage.setItem('Passwords', JSON.stringify(FileContent))
                }
                searchInput.value = "";
                PasswordInput.value = "";
            } else {
                alert('Please enter a valid name')
            }
        } else {
            alert('Please enter app name and password');
        }
    } else {
        alert('Please uplode a file first')
    }
}

async function Editpassword(e) {
    let h3 = document.querySelectorAll('.appName')[e];
    let EdotedPassword = document.querySelectorAll('.EdotedPassword')[e];
    let PasswordCon = document.querySelectorAll('.PassContent')[e]
    PasswordCon.value = EdotedPassword.value;
    let encryptedPass = await encrypt(EdotedPassword.value, passkey, passkey2)
    // console.log(h3, EdotedPassword, )
    FileContent[h3.textContent].password = encryptedPass;
    if(window.localStorage.getItem('SaveToLocalStorge') == 'true') {
        window.localStorage.setItem('Passwords', JSON.stringify(FileContent))
    }
    xmarkspanFun(e)
}

function RemoveApp(e) {
    let h3 = document.querySelectorAll('.appName')[e];
    delete FileContent[h3.textContent]
    LoadData();
    if(window.localStorage.getItem('SaveToLocalStorge') == 'true') {
        window.localStorage.setItem('Passwords', JSON.stringify(FileContent))
    }
}

