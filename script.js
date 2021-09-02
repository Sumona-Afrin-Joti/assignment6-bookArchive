const container = document.getElementById('book-container');
const input = document.getElementById('input');
const error = document.getElementById('error');
const spinner = document.getElementById('spinner');
const searchResult = document.getElementById('search-result');


const loadSearchedData = async () => {
    const searchText = input.value;

    // clearance
    input.value = "";
    error.innerText = "";
    searchResult.innerText = "";
    container.textContent = "";

    // loading data
    const url = `https://openlibrary.org/search.json?q= ${searchText}`;

    // showing spinner while loading
    spinner.classList.remove('d-none');

    const res = await fetch(url);
    const data = await res.json();

    // handling error 

    if (data.numFound === 0) {
        error.innerText = `Your search - ${searchText} - did not match any documents.`;
        searchResult.innerText = "";
    }
    else {
        searchResult.innerText = ` About ${data.numFound} results`;
    }
    //calling display function
    displaySearchItem(data.docs);
}

const displaySearchItem = (data) => {
    // removing spinner after loading data;
    spinner.classList.add('d-none');

    // displaying data
    data.forEach(n => {
        
            const div = document.createElement('div');
            div.classList.add("col")
             div.innerHTML = `<div class="card border-0" style="width: 18rem;">
                <img src="https://covers.openlibrary.org/b/id/${n.cover_i}-M.jpg" class="card-img-top img-fluid" alt="...">
                <div class="card-body bg-light ">
                  <p class="card-title"> Title: ${n.title}</p>
                  <p class="card-text"> Author: ${n.author_name?.[0] ? n.author_name[0] : "Not found"}</p>
                  <p class="card-text"> Publisher: ${n.publisher?.[0] ? n.publisher[0] : "Not found" }</p>
                  <p class="card-text">First Published Year: ${n.first_publish_year ?n.first_publish_year:"Not found"}</p>
                  <p class="card-text">Edition: ${n.edition_count}</p>
                </div>
              </div>`
            container.appendChild(div);
    })
}