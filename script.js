```javascript id="ak49vm"
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
  onSnapshot,
  deleteDoc,
  doc
}
from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js"

// Login

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
      .style.display='none'

  }catch{

    alert('ログイン失敗')

  }

}

window.login = login

// Sidebar

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

// Page

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

  document
    .getElementById(
      'sidebar'
    )
    .classList.remove(
      'active'
    )

}

window.showPage =
  showPage

// Chart

const ctx =
  document.getElementById(
    'salesChart'
  )

if(ctx){

  new Chart(ctx,{

    type:'line',

    data:{

      labels:[
        '月',
        '火',
        '水',
        '木',
        '金',
        '土',
        '日'
      ],

      datasets:[{

        label:'契約数',

        data:[
          3,
          5,
          4,
          8,
          6,
          9,
          7
        ],

        borderColor:'#2563eb',

        tension:.4

      }]

    },

    options:{

      responsive:true,

      maintainAspectRatio:false

    }

  })

}

// Customer Save

async function saveClient(){

  const user =
    document.getElementById(
      'customerUser'
    ).value

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

  const files =
    document.getElementById(
      'clientImage'
    ).files

  const images=[]

  for(let i=0;i<files.length;i++){

    images.push(
      URL.createObjectURL(
        files[i]
      )
    )

  }

  await addDoc(

    collection(
      db,
      'clients'
    ),

    {

      user,
      name,
      media,
      memo,
      images,

      created:
      new Date()

    }

  )

}

window.saveClient =
  saveClient

// Customer List

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

      snapshot.forEach(item=>{

        const data =
          item.data()

        let imageHtml=''

        if(data.images){

          data.images.forEach(img=>{

            imageHtml += `

            <img
            src="${img}"
            class="customer-image">

            `

          })

        }

        clientList.innerHTML += `

        <div class="customer-card">

          <div class="customer-top">

            <strong>
              ${data.user}
            </strong>

            <button
            onclick="deleteClient('${item.id}')">

              削除

            </button>

          </div>

          ${imageHtml}

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

// Delete Client

async function deleteClient(id){

  await deleteDoc(

    doc(
      db,
      'clients',
      id
    )

  )

}

window.deleteClient =
  deleteClient

// Report Save

async function saveReport(){

  const user =
    document.getElementById(
      'reportUser'
    ).value

  const date =
    document.getElementById(
      'reportDate'
    ).value

  const text =
    document.getElementById(
      'reportInput'
    ).value

  const files =
    document.getElementById(
      'reportImage'
    ).files

  const images=[]

  for(let i=0;i<files.length;i++){

    images.push(
      URL.createObjectURL(
        files[i]
      )
    )

  }

  await addDoc(

    collection(
      db,
      'reports'
    ),

    {

      user,
      date,
      text,
      images,

      created:
      new Date()

    }

  )

}

window.saveReport =
  saveReport

// Report List

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

      snapshot.forEach(item=>{

        const data =
          item.data()

        let imageHtml=''

        if(data.images){

          data.images.forEach(img=>{

            imageHtml += `

            <img
            src="${img}"
            class="customer-image">

            `

          })

        }

        reportList.innerHTML += `

        <div class="report-item">

          <div class="customer-top">

            <strong>
              ${data.user}
            </strong>

            <span>
              ${data.date}
            </span>

          </div>

          ${imageHtml}

          <div class="report-text">

            ${data.text}

          </div>

        </div>

        `

      })

    }

  )

}

// Task Save

async function saveTask(){

  const user =
    document.getElementById(
      'taskUser'
    ).value

  const text =
    document.getElementById(
      'taskInput'
    ).value

  await addDoc(

    collection(
      db,
      'tasks'
    ),

    {

      user,
      text,

      created:
      new Date()

    }

  )

}

window.saveTask =
  saveTask

// Task List

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

      snapshot.forEach(item=>{

        const data =
          item.data()

        taskList.innerHTML += `

        <div class="task-card">

          <strong>
            ${data.user}
          </strong>

          <p>
            ${data.text}
          </p>

        </div>

        `

      })

    }

  )

}

// Share Save

async function saveShare(){

  const text =
    document.getElementById(
      'shareInput'
    ).value

  await addDoc(

    collection(
      db,
      'shares'
    ),

    {

      text,

      created:
      new Date()

    }

  )

}

window.saveShare =
  saveShare

// Share List

const shareList =
  document.getElementById(
    'shareList'
  )

if(shareList){

  onSnapshot(

    collection(
      db,
      'shares'
    ),

    (snapshot)=>{

      shareList.innerHTML=''

      snapshot.forEach(item=>{

        const data =
          item.data()

        shareList.innerHTML += `

        <div class="share-card">

          ${data.text}

        </div>

        `

      })

    }

  )

}
```
