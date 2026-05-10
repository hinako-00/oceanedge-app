import { auth, db } from './firebase.js';

import {
  signInWithEmailAndPassword
} from 'https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js';

import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc
} from 'https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js';

// ログイン

async function login(){

  const email = document.getElementById('email').value;

  const password = document.getElementById('password').value;

  try{

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    localStorage.setItem(
      'oceanedgeLogin',
      'true'
    );

    document.getElementById(
      'loginScreen'
    ).style.display = 'none';

  }catch(error){

    console.log(error);

    alert('ログイン失敗');

  }

}

window.login = login;

if(localStorage.getItem('oceanedgeLogin') === 'true'){

  document.getElementById('loginScreen').style.display = 'none';

}
// ページ切替

function showPage(pageId){

  const pages = document.querySelectorAll('.page');

  pages.forEach((page)=>{
    page.classList.remove('active-page');
  });

  document.getElementById(pageId).classList.add('active-page');

}

window.showPage = showPage;

// TimeTree

function openTimeTree(){

  window.location.href = 'https://timetreeapp.com/';

}

window.openTimeTree = openTimeTree;

// グラフ

const ctx = document.getElementById('salesChart');

if(ctx){
 new Chart(ctx,{

    type:'line',

    data:{

      labels:['月','火','水','木','金'],

      datasets:[{

        label:'契約数',

        data:[2,4,6,5,8],

        borderColor:'#2563eb',

        tension:0.4

      }]

    }

  });

}

// TODO
async function saveTodo(){

  const user = document.getElementById('todoUser').value;

  const text = document.getElementById('todoInput').value;

  await addDoc(collection(db,'todos'),{

    user,
    text,
    checked:false

  });

}

window.saveTodo = saveTodo;

const todoList = document.getElementById('todoList');

if(todoList){

  onSnapshot(collection(db,'todos'),(snapshot)=>{

    todoList.innerHTML = '';

    snapshot.forEach((item)=>{

      const data = item.data();

      todoList.innerHTML += `

      <div class="todo-item">
     <div class="todo-row">

          <input type="checkbox" class="todo-check">

          <div>
            <strong>${data.user}</strong>
            <p>${data.text}</p>
          </div>

        </div>

      </div>

      `;

    });

  });

}

// 顧客

async function saveClient(){
  const user = document.getElementById('customerUser').value;

  const name = document.getElementById('clientName').value;

  const media = document.getElementById('clientMedia').value;

  const status = document.getElementById('clientStatus').value;

  const memo = document.getElementById('clientMemo').value;

  await addDoc(collection(db,'clients'),{

    user,
    name,
    media,
    status,
    memo

  });

}

window.saveClient = saveClient;

const clientList = document.getElementById('clientList');

if(clientList){

  onSnapshot(collection(db,'clients'),(snapshot)=>{

    clientList.innerHTML = '';

    snapshot.forEach((item)=>{
      const data = item.data();

      clientList.innerHTML += `

      <div class="customer-card">

        <strong>${data.user}</strong>

        <h3>${data.name}</h3>

        <p>${data.media}</p>

        <p>${data.status}</p>

        <p>${data.memo}</p>

      </div>

      `;

    });

  });

}