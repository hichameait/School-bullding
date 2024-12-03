let duration = 600;

// Select container elements
let Blockes_Container_left = document.querySelector(".windows-left");
let Blockes_Container_top = document.querySelector(".windows-top");
let Blockes_Container_right = document.querySelector(".windows-right");

// Gather all child divs from the three containers
let allBlocks = [
  ...Array.from(Blockes_Container_left.children),
  ...Array.from(Blockes_Container_top.children),
  ...Array.from(Blockes_Container_right.children)
];

// Array of images
let images_range = [
  "/img/angular.svg",
  "/img/css3.svg",
  "/img/git.svg",
  "/img/html5.svg",
  "/img/javascript.svg",
  "/img/laravel.svg",
  "/img/react.svg",
  "/img/vuejsl.svg"
];

// Duplicate and shuffle the images array
let imagesDoubled = [...images_range, ...images_range];
imagesDoubled.sort(() => Math.random() - 0.5); // Shuffle images randomly

// Assign images to divs
allBlocks.forEach((block, index) => {
  let imgTag = document.createElement("img");
  imgTag.src = imagesDoubled[index]; // Assign the shuffled image
  imgTag.classList.add("hidden"); // Hide image initially
  block.appendChild(imgTag);

  // Add click event for flipping
  block.addEventListener("click", function () {
    flipBlock(block);
  });
});

// Flip block function
function flipBlock(selectedBlock) {
  // Prevent flipping an already flipped or matched block
  if (selectedBlock.classList.contains("is-flipped") || selectedBlock.classList.contains("matched")) return;

  // Flip the card
  selectedBlock.classList.add("is-flipped");

  // Show the image
  selectedBlock.querySelector("img").classList.remove("hidden");

  let full_screen = document.querySelector(".fullscreen");
  full_screen.style.backgroundColor = "#000000";
  let imagess = selectedBlock.querySelector("img").src
  full_screen.style.backgroundImage = `url('${imagess.replace("svg", "png")}')`; 
  full_screen.style.display = "block"

  let container = document.querySelector(".container");
  container.style.display = "none"

  full_screen.style.backgroundPosition = "center"
  full_screen.style.backgroundRepeat = "no-repeat"


  // Add click event for flipping
  full_screen.addEventListener("click", function () {
    full_screen.style.display = "none"
    container.style.display = "block"

  });



  // Collect all flipped blocks
  let allFlippedBlocks = allBlocks.filter(block =>
    block.classList.contains("is-flipped") && !block.classList.contains("matched")
  );

  // If two blocks are flipped, check for a match
  if (allFlippedBlocks.length === 2) {
    stopClicking();
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    
  }
}

// Stop clicking function
function stopClicking() {
  // Disable clicking
  document.body.classList.add("no-clicking");

  // Re-enable clicking after the duration
  setTimeout(() => {
    document.body.classList.remove("no-clicking");
  }, duration);
}

// Check matched blocks function
function checkMatchedBlocks(block1, block2) {
  let img1 = block1.querySelector("img").src;
  let img2 = block2.querySelector("img").src;

  if (img1 === img2) {
    // Match: Keep them flipped and mark as matched
    block1.classList.add("matched");
    block2.classList.add("matched");

    block1.removeEventListener("click", flipBlock);
    block2.removeEventListener("click", flipBlock);
  } else {
    // No match: Flip back after the duration
    setTimeout(() => {
      block1.classList.remove("is-flipped");

      block1.querySelector("img").classList.add("hidden");
      block2.classList.remove("is-flipped");
      block2.querySelector("img").classList.add("hidden");
      
      // setTimeout(() => {
      //   block2.classList.remove("is-flipped");
      //   block2.querySelector("img").classList.add("hidden");
      // }, 2000);
      
    }, duration);
  }
}
