// Selecting DOM elements
const btn = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");
const factsList = document.querySelector(".facts-list");

// Create DOM elements: Render facts in list
factsList.innerHTML = "";

loadFacts();
// Load DATA from DB
async function loadFacts() {
  const res = await fetch("url", {
    headers: {
      apikey: "",
      authorization: "",
    },
  });
  const data = await res.json();
  console.log(data);
  createFactsList(data);
}

// const initialFacts = [
//   {
//     id: 1,
//     text: "React is being developed by Meta (formerly facebook)",
//     source: "https://opensource.fb.com/",
//     category: "technology",
//     votesInteresting: 8,
//     votesMindBlowing: 3,
//     votesFalse: 1,
//     createdIn: 2024,
//   },
// ];
// createFactsList(initialFacts);

function createFactsList(dataArr) {
  const htmlArr = dataArr.map(
    (fact) => `<li class="fact">
              <p>
                ${fact.text}
                <a
                  class="source"
                  href="${fact.source}"
                  target="_blank"
                  >(Source)</a
                >
              </p>
              <span class="tag" style="background-color: #3b82f6"
                >${fact.category}</span
              >`
  );
  const html = htmlArr.join("");
  factsList.insertAdjacentHTML("afterbegin", html);
}

// Toggle form visibility
btn.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
  } else {
    form.classList.add("hidden");
  }
});

const CATEGORIES = [
  { name: "technology", color: "#3b82ff" },
  { name: "science", color: "##16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#197316" },
  { name: "news", color: "#8b5cf6" },
];
