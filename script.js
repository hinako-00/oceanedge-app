
import { auth, db } from './firebase.js';

import {
  signInWithEmailAndPassword
} from 'https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js';

import {
  collection,
  addDoc,
  onSnapshot
} from 'https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js';

// ログイン
async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    await signInWithEmailAndPassword(auth, email, password);

    document.getElementById('loginScreen').style.display = 'none';
  } catch (error) {
    console.error(error);
    alert('ログイン失敗');
  }
}

window.login = login;

// サイドバー
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('active');
}

window.toggleSidebar = toggleSidebar;

// ページ切替
function showPage(pageId) {
  const pages = document.querySelectorAll('.page');

  pages.forEach((page) => {
    page.classList.remove('active-page');
  });

  document.getElementById(pageId).classList.add('active-page');

  document.getElementById('sidebar').classList.remove('active');
}

window.showPage = showPage;

// グラフ
const ctx = document.getElementById('salesChart');

if (ctx) {
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['月', '火', '水', '木', '金'],
      datasets: [
        {
          label: '契約数',
          data: [2, 4, 5, 3, 7],
          borderColor: '#2563eb',
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

// 顧客保存
async function saveClient() {
  const user = document.getElementById('customerUser').value;
  const name = document.getElementById('clientName').value;
  const media = document.getElementById('clientMedia').value;
  const memo = document.getElementById('clientMemo').value;

  await addDoc(collection(db, 'clients'), {
    user,
    name,
    media,
    memo,
    createdAt: new Date()
  });
}

window.saveClient = saveClient;

// 顧客一覧
const clientList = document.getElementById('clientList');

if (clientList) {
  onSnapshot(collection(db, 'clients'), (snapshot) => {
    clientList.innerHTML = '';

    snapshot.forEach((item) => {
      const data = item.data();

      clientList.innerHTML += `
        <div class="customer-card">
          <div class="customer-top">
            <strong>${data.user}</strong>
          </div>

          <h3>${data.name}</h3>
          <p>${data.media}</p>
          <p>${data.memo}</p>
        </div>
      `;
    });
  });
}

// 日報保存
async function saveReport() {
  const user = document.getElementById('reportUser').value;
  const date = document.getElementById('reportDate').value;
  const text = document.getElementById('reportInput').value;

  await addDoc(collection(db, 'reports'), {
    user,
    date,
    text,
    createdAt: new Date()
  });
}

window.saveReport = saveReport;

// 日報一覧
const reportList = document.getElementById('reportList');

if (reportList) {
  onSnapshot(collection(db, 'reports'), (snapshot) => {
    reportList.innerHTML = '';

    snapshot.forEach((item) => {
      const data = item.data();

      reportList.innerHTML += `
        <div class="report-item">
          <strong>${data.user}</strong>
          <p>${data.date}</p>
          <p>${data.text}</p>
        </div>
      `;
    });
  });
}

// タスク保存
async function saveTask() {
  const user = document.getElementById('taskUser').value;
  const text = document.getElementById('taskInput').value;

  await addDoc(collection(db, 'tasks'), {
    user,
    text,
    createdAt: new Date()
  });
}

window.saveTask = saveTask;

// タスク一覧
const taskList = document.getElementById('taskList');

if (taskList) {
  onSnapshot(collection(db, 'tasks'), (snapshot) => {
    taskList.innerHTML = '';

    snapshot.forEach((item) => {
      const data = item.data();

      taskList.innerHTML += `
        <div class="task-card">
          <strong>${data.user}</strong>
          <p>${data.text}</p>
        </div>
      `;
    });
  });
}

// 全体共有保存
async function saveShare() {
  const text = document.getElementById('shareInput').value;

  await addDoc(collection(db, 'shares'), {
    text,
    createdAt: new Date()
  });
}

window.saveShare = saveShare;

// 全体共有一覧
const shareList = document.getElementById('shareList');

if (shareList) {
  onSnapshot(collection(db, 'shares'), (snapshot) => {
    shareList.innerHTML = '';

    snapshot.forEach((item) => {
      const data = item.data();

      shareList.innerHTML += `
        <div class="share-card">
          <p>${data.text}</p>
        </div>
      `;
    });
  });
}
