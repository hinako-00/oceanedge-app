// script.js

import {
  auth,
  db
}
from './firebase.js'

import {
  signInWithEmailAndPassword
}
from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js"

import {
  collection,
  addDoc,
  onSnapshot
}
from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js"

// ログイン

async function login(){

  const email =
    document.getElementById(
      'email'
    ).value

  const password =
    document.getElementById(
      'password'
    ).value

  try{

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    )

    document
      .getElementById(
        'loginScreen'
      )
      .style.display = 'none'

  }catch(error){

    alert('ログイン失敗')

  }

}

window.login = login

// サイドバー

function toggleSidebar(){

  const sidebar =
    document.getElementById(
      'sidebar'
    )

  sidebar.classList.toggle(
    'active'
  )

}

window.toggleSidebar =
  toggleSidebar

// ページ切り替え

function showPage(pageId){

  const pages =
    document.querySelectorAll(
      '.page'
    )

  pages.forEach(page=>{

    page.classList.remove(
      'active-page'
    )

  })

  document
    .getElementById(pageId)
    .classList.add(
      'active-page'
    )

}

window.showPage =
  showPage

// TimeTree

function openTimeTree(){

  window.location.href =
    'timetree://'

  setTimeout(()=>{

    window.open(
      'https://timetreeapp.com/',
      '_blank'
    )

  },1000)

}

window.openTimeTree =
  openTimeTree

// グラフ

const ctx =
  document.getElementById(
    'salesChart'
  )

if(ctx){

  new Chart(ctx,{

    type:'bar',

    data:{

      labels:[
        '月',
        '火',
        '水',
        '木',
        '金'
      ],

      datasets:[{

        label:'契約数',

        data:[
          3,
          5,
          8,
          4,
          7
        ],

        backgroundColor:[
          '#2563eb',
          '#3b82f6',
          '#60a5fa',
          '#93c5fd',
          '#bfdbfe'
        ]

      }]

    },

    options:{

      responsive:true,

      maintainAspectRatio:false

    }

  })

}

// 日報保存

async function saveReport(){

  const text =
    document.getElementById(
      'reportInput'
    ).value

  if(!text) return

  await addDoc(

    collection(
      db,
      'reports'
    ),

    {

      text:text,

      created:new Date()

    }

  )

  document.getElementById(
    'reportInput'
  ).value=''

}

window.saveReport =
  saveReport

// 日報取得

const reportList =
  document.getElementById(
    'reportList'
  )

if(reportList){

  onSnapshot(

    collection(
      db,
      'reports'
    ),

    (snapshot)=>{

      reportList.innerHTML=''

      snapshot.forEach(doc=>{

        const data =
          doc.data()

        reportList.innerHTML += `

        <div class="report-item">

          <div class="report-text">

            ${data.text}

          </div>

        </div>

        `

      })

    }

  )

}

// タスク保存

async function saveTask(){

  const text =
    document.getElementById(
      'taskInput'
    ).value

  if(!text) return

  await addDoc(

    collection(
      db,
      'tasks'
    ),

    {

      text:text

    }

  )

  document.getElementById(
    'taskInput'
  ).value=''

}

window.saveTask =
  saveTask

// タスク取得

const taskList =
  document.getElementById(
    'taskList'
  )

if(taskList){

  onSnapshot(

    collection(
      db,
      'tasks'
    ),

    (snapshot)=>{

      taskList.innerHTML=''

      snapshot.forEach(doc=>{

        const data =
          doc.data()

        taskList.innerHTML += `

        <div class="customer-card">

          ${data.text}

        </div>

        `

      })

    }

  )

}

// 顧客保存

async function saveClient(){

  const name =
    document.getElementById(
      'clientName'
    ).value

  const media =
    document.getElementById(
      'clientMedia'
    ).value

  const memo =
    document.getElementById(
      'clientMemo'
    ).value

  const image =
    document.getElementById(
      'clientImage'
    ).files[0]

  let imageUrl=''

  if(image){

    imageUrl =
      URL.createObjectURL(
        image
      )

  }

  await addDoc(

    collection(
      db,
      'clients'
    ),

    {

      name:name,

      media:media,

      memo:memo,

      image:imageUrl,

      created:new Date()

    }

  )

}

window.saveClient =
  saveClient

// 顧客一覧

const clientList =
  document.getElementById(
    'clientList'
  )

if(clientList){

  onSnapshot(

    collection(
      db,
      'clients'
    ),

    (snapshot)=>{

      clientList.innerHTML=''

      snapshot.forEach(doc=>{

        const data =
          doc.data()

        clientList.innerHTML += `

        <div class="customer-card">

          <img
          src="${data.image}"
          class="customer-image">

          <h3>
            ${data.name}
          </h3>

          <p>
            ${data.media}
          </p>

          <p>
            ${data.memo}
          </p>

        </div>

        `

      })

    }

  )

}