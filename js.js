import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc,onSnapshot, query, where, orderBy, serverTimestamp,updateDoc} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
const firebaseConfig = {
apiKey: "AIzaSyADM37s2G43ebYuFgVU0bOW3rex8xylc14",
authDomain: "saveit-daa40.firebaseapp.com",
projectId: "saveit-daa40",
storageBucket: "saveit-daa40.appspot.com",
messagingSenderId: "720935262954",
appId: "1:720935262954:web:3e2a8957284b6c10b9d593",
measurementId: "G-ZRPFWKHC0E"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore()
const collect =  collection(db, 'Subjects')
const add = document.querySelector('.edit-bar');

add.addEventListener('submit',(e) => {
// e.preventDefault()
if (add.id.value == ""){
    addDoc(collect, {
        dateTime: add.dateTime.value,
        title: add.title.value,
        note: add.note.value,
    }).then(() => {
        add.reset()
        location.reload(1000)
    })
}
})
function reloadPage(time){
    setTimeout(() => {
        location.reload()},time
    );
}
const noteBar = document.querySelector(".note-bar");
onSnapshot(collect,(snapshot) => {
    snapshot.docs.forEach((doc) => {
        let arg = { ...doc.data(), id:doc.id };
        let note = `
            <div class="example-note">
                <div class="wrap-title-delete">
                    <h3 class="title">${arg.title}</h3>
                    <div class="wrap-delete-edit">
                        <button class="del-edit delete" onclick="window.delete_note('${arg.id}')">Delete</button>
                        <button class="del-edit edit-note" onclick="window.fill_info('${arg.note}', '${arg.title}', '${arg.dateTime}', '${arg.id}')">Edit</button>
                    </div>
                </div>
                    <div class="info">${arg.note}</div>
                    <div class="wrap-info">
                    <p><strong>Deadline: </strong>${arg.dateTime}</p>
                </div>
            </div>`
                noteBar.insertAdjacentHTML("beforeend",note);
            })
        })       

window.delete_note = function note(id){
    const check = confirm(`Xác nhận xóa [ ${id} ]`);
    if (check == true){
        const mainId = doc(db, 'Subjects', id);
        console.log(id)
        deleteDoc(mainId)
        reloadPage(1000);
    }
}
var bina = 0;
window.open_close_edit = function touch(){
    const swtch = document.querySelector(".switch");
    const allEdit = document.querySelector(".wrap-edit-bar");
    const wrapNote = document.querySelector(".wrap-notes");
    if (bina == 0){
        allEdit.style.transform = "translateX(-200%)";
        allEdit.style.width = 0;
        wrapNote.style.width = "99%";
        swtch.innerHTML = "&#62;&#62;&#62;";
        swtch.style.marginLeft = "-40px";
        bina = 1;
    }
    else{
        allEdit.style.transform = "translateX(0)";
        allEdit.style.width = "30%";
        wrapNote.style.width = "70%";
        swtch.innerHTML = "&#60;&#60&#60;";
        swtch.style.marginLeft = "0";
        bina = 0;
    }
}
    add.addEventListener('submit', (e) => {
        e.preventDefault()
        const idNote = document.querySelector('.id');
        const id = doc(db, 'Subjects', idNote.value)
        updateDoc(id, {
            dateTime: add.dateTime.value,
            title: add.title.value,
            note: add.note.value,
        }).then(() => {
        add.reset();
        reloadPage(1000);
    })
})
window.fill_info = function fill(note , title, dateTime, id){
    document.querySelector(".area-edit").value = note;
    document.querySelector(".inp-title").value = title;
    document.querySelector(".date-time").value = dateTime;
    document.querySelector('.id').value = id;
}