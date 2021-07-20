/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/**
 * This function will create a new elements with the supplied properties and values set
 * 
 * @param {string} type - the type of element (li, span, div, etc.)
 * @param {string} prop1 - the first property tobe set
 * @param {string} val1 - the desired value for the first property
 * @param {string} prop2 - the second property to be set
 * @param {string} val2 - the desired value for the second property
 */
function addElement(type, prop1, val1, prop2, val2) {
   const element = document.createElement(type);
   element[prop1] = val1;
   if (prop2) {
      element[prop2] = val2;
   }
   return element;
}

/**
 * This function will create and insert/append the elements needed to display a "page" of nine students
 * 
 * @param {array} list - the student data
 * @param {number} page - the desired page of data to show
 */
function showPage(list, page) {
   const start = (page * 9) - 9;
   const end = page * 9;
   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';
   
   for (let i=0; i<list.length; i++) {
      if (i >= start && i < end) {
         const li = addElement('li', 'className', 'student-item cf');
         studentList.appendChild(li);
            const details = addElement('div', 'className', 'student-details');
            li.appendChild(details);
               const img = addElement('img', 'className', 'avatar', 'src', list[i]["picture"]["large"]);
               details.appendChild(img);
               const name = addElement('h3', 'textContent', list[i]["name"]["first"] +' '+ list[i]["name"]["last"]);
               details.appendChild(name);
               const email = addElement('span', 'className', 'email', 'textContent', list[i]['email']);
               details.appendChild(email);
            const joined = addElement('div', 'className', 'joined-details');
            li.appendChild(joined);
               const date = addElement('span', 'className', 'date', 'textContent', list[i]["registered"]["date"]);
               joined.appendChild(date);
      }
   }
}

/**
 * This function will create and insert/append the elements needed for the pagination buttons
 * it also adds an event handler for button clicks to change the currently showing page
 * 
 * @param {array} list - the student data
*/
function addPagination(list) {
   const numberOfButtons = (list.length / 9) + 1;
   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';
   
   if (numberOfButtons >= 2) {
      //create pagination buttons
      for (let i=1; i<=numberOfButtons; i++) {
         const li = document.createElement('li');
         linkList.appendChild(li);
            const button = addElement('button', 'type', 'button', 'textContent', i);
            li.appendChild(button);
      }
      linkList.firstElementChild.firstElementChild.className = 'active';

      //handler for pagination button clicks
      linkList.addEventListener('click', (e) => {
         if (e.target.tagName === 'BUTTON') {
            let buttons = linkList.querySelectorAll('button');
            for (let i=0; i<buttons.length; i++) {
               buttons[i].className = '';
            }
            e.target.className = 'active';
            const page = parseInt(e.target.textContent);
            showPage(list, page)
         }
      });
   }
}

showPage(data, 1);
addPagination(data);


// * * * * * * * * * * * * * * EXTRA CREDIT CODE * * * * * * * * * * * * * *

// Create and add a search bar
const header = document.querySelector('.header')
const searchBar = addElement('label', 'for', 'search', 'className', 'student-search')
header.appendChild(searchBar);
   const span = addElement('span', 'textContent', 'Search by name');
   searchBar.appendChild(span);
   const input = addElement('input', 'id', 'search', 'placeholder', 'Search by name...')
   searchBar.appendChild(input);
   const button = addElement('button', 'type', 'button');
   searchBar.appendChild(button);
      const img = addElement('img', 'src', 'img/icn-search.svg', 'alt', 'Search icon')
      button.appendChild(img);

/**
 * This function performs the search but comparing input to data name items
 * 
 * @param {string} input - the input in the search bar
 * @param {array} info - the array of student data
 */
function search(input, info) {
   let matches = [];
   for (let i=0; i<info.length; i++) {
      let name = info[i]['name']['first'] + info[i]['name']['last'];
      name = name.toLowerCase();
      if (name.includes(input)) {
         matches.push(info[i]);
      }
   }
   return matches;
}

/**
 * This function handles the search events. It does not have any parameters.
 */
function searchEventHandler() {
   let input = searchInput.value.toLowerCase();
   let matched = search(input, data);
   let noResults = document.querySelector('.no-results');
   
   showPage(matched, 1);
   addPagination(matched);

   if (matched.length == 0) {
      if (!noResults) {
         noResults = addElement('h2', 'textContent', 'No results found', 'className', 'no-results');
         searchBar.parentNode.insertAdjacentElement('afterend', noResults);
      }
   } else {
      if (noResults) {
         noResults.parentNode.removeChild(noResults);
      }
   }
}

const searchButton = searchBar.querySelector('button');
searchButton.addEventListener('click', searchEventHandler);

const searchInput = searchBar.querySelector('#search');
searchInput.addEventListener('input', searchEventHandler);