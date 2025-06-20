
window.addEventListener("load", function() {
  setTimeout(function() {
    const loader = document.getElementById("loader");
    loader.style.opacity = "0";
    setTimeout(function() {
      loader.style.display = "none";
    }, 500);
  }, 1500);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

document.querySelectorAll('.accordion-button').forEach(button => {
  button.addEventListener('click', function() {
    const icon = this.querySelector('span');
    if (icon) {
      icon.classList.toggle('fa-plus');
      icon.classList.toggle('fa-minus');
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const horarios = {
    1: ["09:00", "16:00"],
    2: ["09:00", "16:00"],
    3: ["09:00", "16:00"],
    4: ["09:00", "16:00"],
    5: ["09:00", "16:00"],
    6: ["10:00", "14:00"],
    0: null
  };

  const ahora = new Date();
  const diaSemana = ahora.getDay();
  const horaActual = ahora.getHours();
  const minutoActual = ahora.getMinutes();
  const estadoElemento = document.getElementById("estado-actual");

  const items = document.querySelectorAll(".horario-item");
  items.forEach(item => {
    if (parseInt(item.dataset.dia) === diaSemana) {
      item.classList.add("current-day");
    }
  });

  if (horarios[diaSemana]) {
    const [inicio, fin] = horarios[diaSemana];
    const [inicioH, inicioM] = inicio.split(":").map(Number);
    const [finH, finM] = fin.split(":").map(Number);

    const desde = new Date();
    desde.setHours(inicioH, inicioM, 0);
    const hasta = new Date();
    hasta.setHours(finH, finM, 0);

    const ahoraMs = ahora.getTime();

    if (ahoraMs >= desde.getTime() && ahoraMs <= hasta.getTime()) {
      estadoElemento.textContent = "¡Estamos abiertos ahora!";
      estadoElemento.classList.add("abierto");
    } else {
      estadoElemento.textContent = "Cerrado ahora";
      estadoElemento.classList.add("cerrado");
    }
  } else {
    estadoElemento.textContent = "Cerrado hoy";
    estadoElemento.classList.add("cerrado");
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbotPopup = document.getElementById('chatbot-popup');
  const closeChatbot = document.getElementById('close-chatbot');
  const chatBody = document.getElementById('chat-body');
  
  const initialOptions = [
    "¿Dónde están ubicados?",
    "¿Cuáles son los métodos de pago?",
    "¿Qué productos ofrecen?",
    "No tengo más dudas"
  ];
  
  const respuestas = {
    "¿Dónde están ubicados?": "📍 Estamos en Av. Dulzura 123, Lima - Perú. ¡Visítanos!",
    "¿Cuáles son los métodos de pago?": "💳 Aceptamos: Efectivo, Yape, Plin y transferencias bancarias.",
    "¿Qué productos ofrecen?": "🍫 Tenemos chocolates, caramelos, galletas, chupetines y gomitas. ¡Explora nuestras categorías!",
    "No tengo más dudas": "¡Gracias por contactarnos! Si necesitas algo más, aquí estaré. 😊"
  };

  let availableOptions = [...initialOptions];
  let chatHistory = [];

  chatbotToggle.addEventListener('click', () => {
    chatbotPopup.classList.toggle('hidden');
    if (!chatbotPopup.classList.contains('hidden') && chatBody.children.length <= 1) {
      resetChat();
    }
  });

  closeChatbot.addEventListener('click', () => {
    chatbotPopup.classList.add('hidden');
  });

  function showOptions(options) {
    const existingOptions = document.getElementById('dynamic-options');
    if (existingOptions) existingOptions.remove();

    const optionsContainer = document.createElement('div');
    optionsContainer.id = 'dynamic-options';
    optionsContainer.className = 'chat-options';
    
    options.forEach(option => {
      const button = document.createElement('button');
      button.className = 'chat-option';
      button.textContent = option;
      button.addEventListener('click', function() {
        handleOptionSelection(option);
      });
      optionsContainer.appendChild(button);
    });
    
    chatBody.appendChild(optionsContainer);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function handleOptionSelection(selectedOption) {
    const userMsg = document.createElement('div');
    userMsg.classList.add('chat-message', 'user');
    userMsg.textContent = selectedOption;
    chatBody.appendChild(userMsg);
    
    setTimeout(() => {
      const botMsg = document.createElement('div');
      botMsg.classList.add('chat-message', 'bot');
      botMsg.textContent = respuestas[selectedOption] || "¡Gracias por tu mensaje!";
      chatBody.appendChild(botMsg);
      
      if (selectedOption === "No tengo más dudas") {
        setTimeout(() => {
          resetChat();
          chatbotPopup.classList.add('hidden');
        }, 3000);
      } else {
        availableOptions = availableOptions.filter(opt => opt !== selectedOption);
        setTimeout(() => showOptions(availableOptions), 800);
      }
      
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 500);
  }

  function resetChat() {
    while (chatBody.children.length > 1) {
      chatBody.removeChild(chatBody.lastChild);
    }
    availableOptions = [...initialOptions];
    showOptions(availableOptions);
  }

  resetChat();

  document.addEventListener('click', (e) => {
    if (!chatbotPopup.contains(e.target) && !chatbotToggle.contains(e.target)) {
      chatbotPopup.classList.add('hidden');
    }
  });
});
