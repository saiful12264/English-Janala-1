const createElement = (arr) => {
  const synoEle = arr.map((el) => {
    return `<span>${el}</span>`;
  });

  console.log(synoEle.join(' '));
};

const arr = ["hi", "hello", "chonichoya"];
createElement(arr);
