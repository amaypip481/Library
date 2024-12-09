const myLibrary = [];

// Book Object 

function Book(title, author, genre, rating, description, id) {
    return {
        Title: title,
        Author: author,
        Genre: genre,
        Rating: rating,
        Description: description,
        id: id,
        isAddedToDom: false
    };
}

// Create HTML DOM with details from the form inputs by the user


function createBookCard(htmlDom) {
    myLibrary.forEach((cardDetail) => {
        if (!cardDetail.isAddedToDom) {
            let cardItems = document.createElement("Div");
            cardItems.className = "cardItems";
            cardItems.id = cardDetail.id;
            cardItems.innerHTML = `
   <img src="./Assets/logo.jpg" alt="Book">
                    <div class="cardItemDetails">
                        <div class="Title imgSideContent">
                            <header>Title: </header>
                            <p></p>
                        </div>
                        <div class="Author imgSideContent">
                            <header>Author: </header>
                            <p></p>
                        </div>
                        <div class="Genre imgSideContent">
                            <header>Genre: </header>
                            <p></p>
                        </div>
                        <div class="Rating imgSideContent" >
                            <header>Rating: </header>
                             <select name="rating" class="ratingselector">
                            <option value="">--Please Choose--</option>
                            <option value="one">1</option>
                            <option value="Two">2</option>
                            <option value="Three">3</option>
                            <option value="Four">4</option>
                            <option value="Five">5</option>
                        </select>
                        </div>
                    </div>
                    <div class="cardItemDescription">
                        <header>Description</header>
                        <p></p>
                    </div>
                    <div class="cardItemButtons">
                        <button class="read">&#10004; Read</button>
                        <button class="readLater" >&#9825; Save</button>
                        <button class="delete" >&#10005; Delete</button>
                    </div>`;
            cardItems.querySelector(".Title").querySelector("p").textContent += cardDetail.Title;
            cardItems.querySelector(".Author").querySelector("p").textContent += cardDetail.Author;
            cardItems.querySelector(".Genre").querySelector("p").textContent += cardDetail.Genre;
            cardItems.querySelector(".cardItemDescription").querySelector("p").textContent += cardDetail.Description;
            cardItems.querySelector(".cardItemButtons").querySelector(".read").addEventListener("click", isread);
            cardItems.querySelector(".cardItemButtons").querySelector(".readLater").addEventListener("click", readForLater);
            cardItems.querySelector(".cardItemButtons").querySelector(".delete").addEventListener("click", deleteButton);
            htmlDom.appendChild(cardItems);
            cardDetail.isAddedToDom = true;
        }
    }
    );

}


// Seems unecessary - let's keep it for now

function displayBookToLibrary() {
    errorMessageReset();
    let cardItemsParent = document.querySelector("#content");
    let cardItems = createBookCard(cardItemsParent);
    document.querySelector("#addBookDialog").close();

}


//  call back for submit click event on the form 

function addBookToLibrary(e) {
    e.preventDefault();
    let addBookForm = document.querySelector("#addBooksForm");
    let Title = addBookForm.querySelector("#formTitle");
    if(Title.value === "") {
        Title.style.border = "0.1rem solid red";
        Title.nextElementSibling.style.display = "block";
        return;
    }
    let Author = addBookForm.querySelector("#formAuthor");
    if(Author.value === "") {
        Author.style.border = "0.1rem solid red";
        Author.nextElementSibling.style.display = "block";
        return;
    }
    let Genre = addBookForm.querySelector("#formGenre");
    if(Genre.value === "") {
        Genre.style.border = "0.1rem solid red";
        Genre.nextElementSibling.style.display = "block";
        return;
    }
      
    let Description = addBookForm.querySelector("#formDescription");
    let id = "cardItem" + myLibrary.length + 1;
    let newBook = Book(Title.value, Author.value, Genre.value, "", Description.value, id);
    myLibrary.push(newBook);
    document.querySelector("#addBooksForm").reset();
    displayBookToLibrary();
}

// Add eventListeners

document.getElementById("addBooks").addEventListener("click", () => {
    document.querySelector("#addBookDialog").showModal();
});
let formDetails = document.querySelector("#addBooksForm");
let submitButton = formDetails.querySelector(".formButtonDiv").querySelector("button");

submitButton.addEventListener("click", addBookToLibrary);
document.querySelector("#formClose").addEventListener("click",closeForm);

function selectorChangeEvent(e){
    let parent = e.target.parentElement.parentElement.parentElement;
    myLibrary.forEach((book)=>{
        if(book.id === parent.id){
            book.Rating = e.target.value;
        }
    });

}

function isread(e) {
    let ratingSelectorValue = document.querySelector(".ratingselector");
    ratingSelectorValue.addEventListener("change", selectorChangeEvent);
    let parent = e.target.parentElement.parentElement;
    if (e.target.style.backgroundColor === "rgb(4, 139, 42)")
    {
        e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
        parent.querySelector(".Rating").style.display = "none";
    }
    else
    {
        e.target.style.backgroundColor = "rgb(4, 139, 42)";
        parent.querySelector(".Rating").style.display = "flex";
    }

}

// Read button click eventListener

function readForLater(e) {
    if (e.target.style.backgroundColor === "rgb(194, 35, 91)")
        e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
    else
        e.target.style.backgroundColor = "rgb(194, 35, 91)";
}

// Delete button click eventListener

function deleteButton(e) {
    let parent = e.target.parentElement.parentElement;
    let container = parent.parentElement;
    container.removeChild(parent);
    myLibrary.forEach((cardDetail)=>{
        if(cardDetail.id === parent.id)
            myLibrary.removeChild(cardDetail);
    });
}

// Close button click eventListener

function closeForm(e) {
    e.preventDefault();
    errorMessageReset();
    document.querySelector("#addBooksForm").reset();
    document.querySelector("#addBookDialog").close();
}


//  Reset the error message in the form

function errorMessageReset(){
    let addBookForm = document.querySelector("#addBooksForm");
    let Title = addBookForm.querySelector("#formTitle");
    let Author = addBookForm.querySelector("#formAuthor");
    let Genre = addBookForm.querySelector("#formGenre");
   
    Title.style.border = "";
    Title.nextElementSibling.style.display = "none";
    Author.style.border = "";
    Author.nextElementSibling.style.display = "none";
    Genre.style.border = "";
    Genre.nextElementSibling.style.display = "none";

}
