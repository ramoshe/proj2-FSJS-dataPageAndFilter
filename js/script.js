/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage(list, page) {
   const start = (page * 9) - 9;
   const end = page * 9;
   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';
   for (let i=0; i<list.length; i++) {
      if (i >= start && i < end) {
         const li = document.createElement('li');
         li.className = 'student-item cf';
         studentList.appendChild(li);
            const details = document.createElement('div');
            details.className = 'student-details';
            li.appendChild(details);
               const img = document.createElement('img');
               img.className = 'avatar';
               img.src = list[i]["picture"]["large"];
               details.appendChild(img);
               const name = document.createElement('h3');
               name.textContent = list[i]["name"]["first"] +' '+ list[i]["name"]["last"];
               details.appendChild(name);
               const email = document.createElement('span');
               email.className = 'email';
               email.textContent = list[i]["email"];
               details.appendChild(email);
            const joined = document.createElement('div');
            joined.className = 'joined-details';
            li.appendChild(joined);
               const date = document.createElement('span');
               date.className = 'date';
               date.textContent = list[i]["registered"]["date"];
               joined.appendChild(date);
      }
   }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {
   const numberOfButtons = (list.length / 9) + 1;
   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';
   for (let i=1; i<=numberOfButtons; i++) {
      const li = document.createElement('li');
      linkList.appendChild(li);
         const button = document.createElement('button');
         button.type = 'button';
         button.textContent = i;
         li.appendChild(button);
   }

   linkList.firstElementChild.firstElementChild.className = 'active';

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

// Call functions
showPage(data, 1);
addPagination(data);