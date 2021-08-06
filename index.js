
let nums = [], topRowNums = [], prohibitedNums = [];

$(document).ready(function(){
  console.log("hello");
  document.getElementById("startVal").value = 1;
  document.getElementById("endVal").value = 100;
  initializeNums(4, 52);
  document.getElementById("generated-number").style.display = 'none';
});

function initializeNums(start, end) {
  nums = [];
  topRowNums = [];
  prohibitedNums = [];
  for(let i=start; i<end; i++) {
    nums.push(i);  
  }
  createAvailableNums();
  createTopRowNums();
  createProhibitedNums();
}

function reset() {
  // alert();
  const start = Number(document.getElementById("startVal").value);
  const end = Number(document.getElementById("endVal").value);
  debugger
  initializeNums(start, end);
}

function rollIt() {

  const generatedNumberIndex = Math.floor(Math.random() * (nums.length));
  const generatedNumber = nums[generatedNumberIndex];
  document.getElementById("generated-number").innerHTML = generatedNumber;
  document.getElementById("generated-number").style.display = 'block';

  nums.splice(generatedNumberIndex, 1);
  topRowNums.push(generatedNumber);

  if(topRowNums.length > 6) {
    for(let i=0; i<3; i++) {
      const firstElement = topRowNums.shift();
      nums.push(firstElement);
    }
  }
  nums = nums.sort((a,b) => a-b)
  createAvailableNums();
  createTopRowNums();
  createProhibitedNums();
}

function createAvailableNums() {
  let parent = document.getElementById("available-tiles");
  parent.innerHTML = '';

  nums.forEach(num => {
    let tile = document.createElement('div');
    tile.classList = 'tile';
    tile.innerHTML = num;
    tile.setAttribute('onclick', `addProhibited(${num})`)
    parent.appendChild(tile);
  })
}

function createTopRowNums() {
  let parent = document.getElementById("top-row-tiles");
  parent.innerHTML = '';

  topRowNums.forEach(num => {
    let tileContainer = document.createElement('div');
    tileContainer.classList = 'tile-container';
    let tile = document.createElement('div');
    tile.classList = 'tile';

    tile.innerHTML = num;
    tileContainer.appendChild(tile)
    parent.appendChild(tileContainer);
  })
}


function createProhibitedNums() {
  let parent = document.getElementById("prohibited-tiles");
  parent.innerHTML = '';

  prohibitedNums.forEach(num => {
    let tileContainer = document.createElement('div');
    tileContainer.classList = 'prohibited-container';
    let tile = document.createElement('div');
    tile.classList = 'tile';

    tile.innerHTML = num;
    tileContainer.appendChild(tile)
    parent.appendChild(tileContainer);
  })
}

function addProhibited(num) {
  const index = nums.indexOf(num);
  nums.splice(index, 1);
  prohibitedNums.push(num);
  createAvailableNums();
  createTopRowNums();
  createProhibitedNums();
}