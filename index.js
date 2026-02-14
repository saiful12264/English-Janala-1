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
        <button onclick='loadWords(${lesson.level_no})' class='btn btn-outline btn-primary '><i class="fa-solid fa-book-open"></i>Learn -${lesson.level_no}</button>
        `;

    // 4.append the levelDiv

    levelContainer.append(levelDiv);
  });
};

const loadWords = (id) => {
  fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then((res) => res.json())
    .then((data) => displayWords(data.data));
};

const displayWords = (words) => {
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
    return;
  }

  words.forEach((word) => {
    console.log(word);
    const wordDiv = document.createElement("div");

    wordDiv.innerHTML = `
         <div
          class="bg-white rounded-xl px-5 py-10 text-center space-y-10 shadow-sm h-[100%]"
        >
          <h1 class="text-3xl font-bold">${word.word}</h1>
          <p class="font-medium text-lg">Meaning /Pronounciation</p>
          <h1 class="text-3xl font-bold font-bangla">"${word.meaning} / ${word.pronunciation}"</h1>

          <div class="flex justify-between items-center">
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
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
};
loadAllLevel();
