// Firebase

import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js"

import {
  getAuth
}
from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js"

import {
  getFirestore
}
from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js"

// Firebase設定

const firebaseConfig = {

  apiKey: "AIzaSyBzCp4KztmJG-HKjNUTO4UBXl-hE-cD5zo",

  authDomain:
  "oceanedge-7db40.firebaseapp.com",

  projectId:
  "oceanedge-7db40",

  storageBucket:
  "oceanedge-7db40.firebasestorage.app",

  messagingSenderId:
  "856104543448",

  appId:
  "1:856104543448:web:804c068426baa6bc17a3ad"

}

// 初期化

const app =
  initializeApp(firebaseConfig)

export const auth =
  getAuth(app)

export const db =
  getFirestore(app)