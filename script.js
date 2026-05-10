// script.js

// Sidebar

import {
  auth
}
from './firebase.js'

import {
  signInWithEmailAndPassword
}
from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js"

async function login(){

  const email =
    document.getElementById('email').value

  const password =
    document.getElementById('password').value

  try{

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    )

    alert('ログイン成功')

    document
      .getElementById('loginScreen')
      .style.display = 'none'

  }catch(error){

    alert('ログイン失敗')

  }

}

window.login = login

function toggleSidebar(){

  const sidebar =
    document.getElementById('sidebar')

  sidebar.classList.toggle('active')
}

// Chart

const ctx =
  document.getElementById('salesChart')

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
// ページ切り替え

function showPage(pageId){

  const pages =
    document.querySelectorAll('.page')

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