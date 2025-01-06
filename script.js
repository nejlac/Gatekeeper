

const button = document.getElementById('toggle-button');
const status = document.getElementById('status');
const distance = document.getElementById('distance');
const firebaseConfig = {
    apiKey: "AIzaSyBR7XXPDIctCmuCuwanzvd3dGxTSGVEuYs",
    authDomain: "gatekeeper-cb923.firebaseapp.com",
    databaseURL: "https://gatekeeper-cb923-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "gatekeeper-cb923",
    storageBucket: "gatekeeper-cb923.appspot.com",
    messagingSenderId: "353062678298",
  };

  firebase.initializeApp(firebaseConfig);
  
  // Primjer pisanja podataka u bazu
  const database = firebase.database();
// Početne vrijednosti
let isOpen = false;
let vehicleDistance = 100;

function loadGateData() {
    const gateRef = database.ref('sensor');
    gateRef.on('value', (snapshot) => {
      const data = snapshot.val();
      document.getElementById('status').innerText = `Status: ${data.servoStatus}`;
      document.getElementById('parkingMjesta').innerText = `Slobodna parking mjesta: ${data.parkingMjesta}`;
      document.getElementById('distance').innerText = `Udaljenost: ${data.distance} cm`;
      if (data.servoStatus === 'podignuta') {
        button.disabled = true;
        button.innerText = "Rampa je već podignuta";
      } else {
        button.disabled = false;
        button.innerText = "Pokreni rampu";
      }
    });
  }
  function toggleGate() {
    const gateRef = database.ref('sensor');
    gateRef.once('value').then((snapshot) => {
      const currentStatus = snapshot.val().servoStatus;
      const newStatus = currentStatus === 'podignuta' ? 'spuštena' : 'podignuta';
      gateRef.update({ servoStatus: newStatus });

    });
  }
button.addEventListener('click', () => {
  
  
  // Promijeni status rampe
 // status.textContent = isOpen ? 'Otvorena' : 'Zatvorena';
  

  // Animacija dugmeta
  button.style.transform = isOpen ? 'scale(1.1)' : 'scale(1)';
  setTimeout(() => button.style.transform = 'scale(1)', 200);
});
window.onload = loadGateData;


  
  // Inicijalizacija Firebase-a
 
  
  
  