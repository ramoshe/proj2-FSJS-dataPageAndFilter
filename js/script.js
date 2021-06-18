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
   
   //create pagination buttons
   for (let i=1; i<=numberOfButtons; i++) {
      const li = document.createElement('li');
      linkList.appendChild(li);
         const button = addElement('button', 'type', 'button', 'textContent', i);
         li.appendChild(button);
   }
   linkList.firstElementChild.firstElementChild.className = 'active';

   //handler for button clicks
   linkList.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
         for (let i=0; i<=numberOfButtons-1; i++) {
            linkList.children[i].firstElementChild.className = '';
         }
         e.target.className = 'active';
         const page = parseInt(e.target.textContent);
         showPage(list, page)
      }
   });
}

showPage(data, 1);
addPagination(data);