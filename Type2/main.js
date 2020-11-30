const postsList = document.querySelector('.posts-list');
const addPostForm = document.querySelector('.add-post-form');
const titleValue = document.getElementById('title-value');
const bodyValue = document.getElementById('body-value');
const btnsubmit = document.querySelector('.btn');
let output = '';

const renderPosts = (posts)=>{
	posts.forEach(post => {
		output += `
			<div class="card mt-4 col-md-6 bg-ligt">
			  <div class="card-body" data-id=${post.id}>
				<h5 class="card-title">${post.title}</h5>
				<p class="card-text">${post.body}</p>
				<a href="#" class="card-link" id="edit-post">Edit</a>
				<a href="#" class="card-link" id="delete-post">Delete</a>
			 </div>			 
			</div>
		`;
	  });
	  postsList.innerHTML = output;
}
const url = 'https://jsonplaceholder.typicode.com/posts';

//Get Read Post
//Method GET
fetch(url)
  .then((response) => response.json())
  .then(data => renderPosts(data))


postsList.addEventListener('click', (e) =>{
	e.preventDefault();
	let delButtonIsPressed = e.target.id == 'delete-post';
	let editButtonIsPressed = e.target.id == 'edit-post';
	let id  = e.target.parentElement.dataset.id;

	//console.log(e.target.parentElement.dataset.id);
//Get Read Post
//Method Delete
if(delButtonIsPressed){
	//console.log('remove post');
fetch(`${url}/${id}`, {
		method: 'DELETE',
	})
	.then((response) => response.json())
	  .then(() => location.reload())
}
//Get Read Post
//Method Edit

if(editButtonIsPressed){
	const parent = e.target.parentElement;
	let titleContent = parent.querySelector('.card-title').textContent;
	let bodyContent = parent.querySelector('.card-text').textContent;

	titleValue.value = titleContent;
	bodyValue.value = bodyContent;
}

//Get Read Post
//Method Update
btnsubmit.addEventListener('click',(e) => {
	//console.log(e.target.id);
	e.preventDefault();
	fetch(`${url}/${id}`,{
		method: 'PATCH',
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		  },
		  body: JSON.stringify({
			title: titleValue.value,
			body: bodyValue.value,
		  })
	})
	.then((response) => response.json())
  	.then(() => location.reload())
})


})  ;


//Get Read Post
//Method POST
addPostForm.addEventListener('submit', (e) => {
	e.preventDefault();
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