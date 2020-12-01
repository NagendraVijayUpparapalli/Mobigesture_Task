const postsList = document.querySelector('.posts-list');
const addPostForm = document.getElementById('addEmployeeModal');
const titleValue = document.getElementById('title-value');
const bodyValue = document.getElementById('body-value');
const btnsubmit = document.querySelector('.btn');
const btnadd = document.getElementById('editEmployeeModal');

let output = '';

const renderPosts = (posts)=>{
	posts.forEach(post => {
		output += `

		<tr>
		<td>
		 <span class="custom-checkbox">
		  <input type="checkbox" id="checkbox3"  class="case"  value="1">
		  <label for="checkbox3"></label>
		 </span>
		</td>
						<td>${post.id}</td>
						  <td class="card-title">${post.title}</td>						 
							<td class="card-text">${post.body}</td>
						  <td>
							  <a href="#editEmployeeModal" class="edit" data-toggle="modal"><i  id="edit-post"  class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
							  <a href="#deleteEmployeeModal"  class="delete" data-toggle="modal"><i id="delete-post" class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
	  </td>
  </tr>
		`;
	  });
	  postsList.innerHTML = output;
	  $('#dtBasicExample').DataTable();
  $('.dataTables_length').addClass('bs-select');
}
const url = 'https://jsonplaceholder.typicode.com/posts';

//Get Read Post
//Method GET
fetch(url)
  .then((response) => response.json())
  .then(data => renderPosts(data))


postsList.addEventListener('click', (e) =>{
	//console.log(e.target.id);
	e.preventDefault();
	let delButtonIsPressed = e.target.id == 'delete-post';
	let editButtonIsPressed = e.target.id == 'edit-post';
	let id  = e.target.parentElement.dataset.id;

	
//Get Read Post
//Method Delete
if(delButtonIsPressed){
	fetch(`${url}/${id}`, {
		method: 'DELETE',
	})
	//.then((response) => response.json())
	//.then(() => location.reload())
}
//Get Read Post
//Method Edit

if(editButtonIsPressed){
	const parent = e.target.parentElement;
	let titleContent = parent.querySelector('.card-title').textContent;
	let bodyContent = parent.querySelector('.card-text').textContent;
	console.log(titleContent);

	titleValue.value = titleContent;
	bodyValue.value = bodyContent;
}

//Get Read Post
//Method Update
btnadd.addEventListener('click',(e) => {
	e.preventDefault();
	fetch(`${url}/${id}`,{
		method: 'PATCH',
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		  },
		  body: JSON.stringify({
			title: titleValue.value,
			body: bodyValue.value,
		  }),
	})
	//.then((response) => response.json())
  	//.then(() => location.reload())
})


})  ;


//Get Read Post
//Method POST
addPostForm.addEventListener('submit', (e) => {
	e.preventDefault();
	//console.log('Submitted');
	//console.log(titleValue.value);
	fetch(url,{
		method: 'POST',
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		  },
		  body: JSON.stringify({
			title: titleValue.value,
			body: bodyValue.value,
			userId: 1,
		  })
	})
	.then((response) => response.json())
	.then(data => {
		const dataArr = [];
		dataArr.push(data);
		renderPosts(dataArr);
	})

	//Reset input fields
	titleValue.value = '';
	bodyValue.value = '';
})