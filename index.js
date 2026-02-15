const loadAllLevel = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayAllLevel(data.data));
};

const displayAllLevel = (lessons) => {
  // 1.get the container and make it empty
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  // 2.go every lesson
  lessons.forEach((lesson) => {
    // 3.create a container
    const levelDiv = document.createElement("div");
    levelDiv.innerHTML = `
        <button id='level-btn-${lesson.level_no}' onclick='loadWords(${lesson.level_no})' class='btn btn-outline btn-primary lesson-btn'><i class="fa-solid fa-book-open"></i>Learn -${lesson.level_no}</button>
        `;

    // 4.append the levelDiv

    levelContainer.append(levelDiv);
  });
};

const loadWords = (id) => {
  manageSpinner(true);
  fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const levelBtn = document.getElementById(`level-btn-${id}`);
      levelBtn.classList.add("active");

      displayWords(data.data);
    });
};

const displayWords = (words) => {
  // manageSpinner(true);
  const wordsContainer = document.getElementById("word-container");

  wordsContainer.innerHTML = "";

  if (words.length === 0) {
    wordsContainer.innerHTML = `
     <div class="text-center font-bangla space-y-5 py-12 col-span-3">
          <img class="mx-auto" src="./assets/alert-error.png" alt="">

          <p class="text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
          <h1 class="text-3xl font-semibold">নেক্সট Lesson এ যান</h1>
        </div>
    `;
    manageSpinner(false);
    return;
  }

  words.forEach((word) => {
    const wordDiv = document.createElement("div");

    wordDiv.innerHTML = `
         <div
          class="bg-white rounded-xl px-5 py-10 text-center space-y-10 shadow-sm h-[100%]"
        >
          <h1 class="text-3xl font-bold">${word.word}</h1>
          <p class="font-medium text-lg">Meaning /Pronounciation</p>
          <h1 class="text-3xl font-bold font-bangla">"${word.meaning} / ${word.pronunciation}"</h1>

          <div class="flex justify-between items-center">
            <button onclick = 'loadWordDetails(${word.id})' class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
              <i class="fa-solid fa-circle-info"></i>
            </button>

            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
              <i class="fa-solid fa-arrow-down"></i>
            </button>
          </div>
        </div>
        `;

    wordsContainer.append(wordDiv);
  });
  manageSpinner(false);
};

const removeActive = () => {
  const lessonBtn = document.querySelectorAll(".lesson-btn");
  lessonBtn.forEach((btn) => btn.classList.remove("active"));
};

const loadWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;

  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};
const displayWordDetails = (word) => {
  console.log(word);
  const modalDiv = document.getElementById("my_modal_5");
  modalDiv.innerHTML = `
  <div class="modal-box p-8">
        <section class=" space-y-7 border-[#EDF7FF] shadow-sm p-5 rounded-xl">
          <div>
            <h1 class="font-semibold text-3xl">
              ${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})
            </h1>
          </div>

          <div>
            <p class="font-semibold text-lg">Meaning</p>
            <p class="font-medium">${word.meaning}</p>
          </div>
          <div>
            <p class="font-semibold text-lg">Example</p>
            <p class="font-medium">${word.sentence}</p>
          </div>
          <div>
            <p class="font-semibold text-lg">সমার্থক শব্দ গুলো</p>
            ${createElement(word.synonyms)}
          </div>
        </section>

        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">Close</button>
          </form>
        </div>
      </div>
  `;

  document.getElementById("my_modal_5").showModal();
};

const createElement = (arr) => {
  const synoEle = arr.map((el) => {
    return `<span class='btn'>${el}</span>`;
  });

  return synoEle.join(" ");
};

const manageSpinner = (status) => {
  if (status) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

loadAllLevel();

//search functionality adding

document.getElementById('btn-search')
.addEventListener('click',()=>{
  removeActive();
  const inputValue = document.getElementById('input-search').value.trim().toLowerCase() ;
  
  fetch('https://openapi.programming-hero.com/api/words/all')
  .then(res => res.json())
  .then(data => {
    const allWords = data.data;
     const filterWords = allWords.filter(word => word.word.toLowerCase().includes(inputValue));
     console.log(filterWords,inputValue);
    displayWords(filterWords);
    // document.getElementById('input-search').value=null;
  })

})
