import { db } from "../firebase/config.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const input = document.getElementById("linkInput");
const qrDiv = document.getElementById("qrcode");
const list = document.getElementById("list");
const result = document.getElementById("result");

let currentValue = "";

// ==========================
// GERAR QR
// ==========================
window.generateQR = async function () {
  const value = input.value;

  if (!value) {
    alert("Digite algo!");
    return;
  }

  currentValue = value;

  // mostrar link
  result.innerHTML = `
    <a href="${value}" target="_blank">${value}</a>
    <button onclick="copyLink()">📋 Copiar</button>
  `;

  // limpar QR
  qrDiv.innerHTML = "";

  const canvas = document.createElement("canvas");

  await QRCode.toCanvas(canvas, value, { width: 200 });

  qrDiv.appendChild(canvas);

  // salvar no banco
  await addDoc(collection(db, "links"), {
    url: value,
    createdAt: new Date(),
  });

  loadLinks();
};

// ==========================
// COPIAR
// ==========================
window.copyLink = function () {
  navigator.clipboard.writeText(currentValue);
  alert("Copiado!");
};

// ==========================
// DOWNLOAD
// ==========================
window.downloadQR = function () {
  if (!currentValue) return;

  QRCode.toDataURL(currentValue, (err, url) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode.png";
    a.click();
  });
};

// ==========================
// LISTAR
// ==========================
async function loadLinks() {
  list.innerHTML = "";

  const q = query(collection(db, "links"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();

    const li = document.createElement("li");

    li.innerHTML = `
      <span>${data.url}</span>
      <div>
        <button onclick="copyDirect('${data.url}')">📋</button>
        <button onclick="downloadDirect('${data.url}')">⬇️</button>
        <button onclick="deleteItem('${docSnap.id}')">🗑️</button>
      </div>
    `;

    list.appendChild(li);
  });
}

// ==========================
// OUTROS
// ==========================
window.copyDirect = (url) => navigator.clipboard.writeText(url);

window.downloadDirect = (url) => {
  QRCode.toDataURL(url, (err, data) => {
    const a = document.createElement("a");
    a.href = data;
    a.download = "qrcode.png";
    a.click();
  });
};

window.deleteItem = async (id) => {
  await deleteDoc(doc(db, "links", id));
  loadLinks();
};

// iniciar
loadLinks();
