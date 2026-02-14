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

  words.forEach((word) => {
    const wordDiv = document.createElement("div");
    wordDiv.innerHTML = `
         <div class="bg-white rounded-xl px-5 py-10 text-center space-y-3">
          <h1 class="text-3xl font-bold">Eager</h1>
          <p class="font-medium text-lg">Meaning /Pronounciation</p>
          <h1 class="text-3xl font-bold font-bangla">"আগ্রহী / ইগার"</h1>
        </div>
        `;

        wordsContainer.append(wordDiv);
  });
};
loadAllLevel();
