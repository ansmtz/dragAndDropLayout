const droppable = document.querySelectorAll(".droppable");
const right = document.querySelector(".right"),
  left = document.querySelector(".left"),
  sortBtn = document.getElementById("sort");
let cards = [
  { title: "Amazing card #1", id: 1 },
  { title: "Amazing card #2", id: 2 },
  { title: "Amazing card #3", id: 3 },
  { title: "Amazing card #4", id: 4 },
  { title: "Amazing card #5", id: 5 },
  { title: "Amazing card #6", id: 6 },
  { title: "Amazing card #7", id: 7 },
  { title: "Amazing card #8", id: 8 },
  { title: "Amazing card #9", id: 9 },
];
let rightCards = [];
const createCardsDOMElements = (cards, position) => {
  for (let card of cards) {
    const cardDomElement = document.createElement("div");
    cardDomElement.classList.add("card");
    cardDomElement.setAttribute("draggable", "true");
    cardDomElement.dataset.id = card.id;
    const title = document.createElement("h1");
    title.innerText = card.title;
    cardDomElement.appendChild(title);
    position.appendChild(cardDomElement);
  }
};

const moveCard = (id, direction) => {
  if (direction === "toRight") {
    cardPosition = cards.findIndex((c) => c.id === +id);
    if (cardPosition > -1) {
      rightCards.push(cards[cardPosition]);
      cards = cards.filter((c) => c.id !== +id);
    }
  } else if (direction === "toLeft") {
    cardPosition = rightCards.findIndex((c) => c.id === +id);
    if (cardPosition > -1) {
      cards.push(rightCards[cardPosition]);
      rightCards = rightCards.filter((c) => c.id !== +id);
    }
  }
};

const clearDOM = (container) => {
  container.innerHTML = "";
};

const sortById = (data) => {
  data.sort((a, b) => b.id - a.id);
};

const sortByIdHandler = () => {
  sortById(cards);
  clearDOM(left);
  createCardsDOMElements(cards, left);
};

createCardsDOMElements(cards, left);
sortBtn.addEventListener("click", sortByIdHandler);
droppable.forEach((area) => {
  area.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", e.srcElement.dataset.id);
    e.dataTransfer.effectAllowed = "move";
  });
  area.addEventListener("dragenter", (e) => {
    e.preventDefault();
  });
  area.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  area.addEventListener("drop", (e) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("text/plain");
    if (e.target.closest(".right")) {
      moveCard(cardId, "toRight");
      clearDOM(left);
      createCardsDOMElements(cards, left);
      clearDOM(right);
      createCardsDOMElements(rightCards, right);
    } else if (e.target.closest(".left")) {
      moveCard(cardId, "toLeft");
      clearDOM(right);
      createCardsDOMElements(rightCards, right);

      clearDOM(left);
      createCardsDOMElements(cards, left);
    }
  });
});
