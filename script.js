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
      .style.display='none'

  }catch{

    alert('ログイン失敗')

  }

}

window.login = login

// ページ切替

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

// 顧客保存

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

      user:user,

      name:name,

      media:media,

      memo:memo,

      image:imageUrl,

      created:
      new Date()

    }

  )

}

window.saveClient =
  saveClient

// 顧客表示

const clientList =
  document.getElementById(
    'clientList'
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

          <img
          src="${data.image}"
          class="customer-image">

          <div class="report-text">

            ${data.text}

          </div>

        </div>

        `

      })

    }

  )

}

// 削除

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

// 日報保存

// 日報保存

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

  const image =
    document.getElementById(
      'reportImage'
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
      'reports'
    ),

    {

      user:user,

      date:date,

      text:text,

      image:imageUrl,

      created:new Date()

    }

  )

}

window.saveReport =
  saveReport