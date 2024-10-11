// import {fetchData} from './util/fetchData'
// fetch data and add button

//  import {name} from './util.js'
//   console.log('name...',name)


const URL = 'http://localhost:3000'

async function fetchData(){
    try{
  let response = await fetch(`${URL}/posts`)
  let data = await response.json()
  let cards = document.querySelector('.cards')
  let container = document.querySelector('.container')
  data?.map((item) => {
      let div = document.createElement('div')
      div.setAttribute('class','card')
      div.setAttribute('id',`${item.id}`)
      let h3 = document.createElement('h3')
      h3.appendChild(document.createTextNode(`${item.title}`))
      let editBtn = document.createElement('button')
      let deleteBtn = document.createElement('button')
      editBtn.setAttribute('class','edit-btn')
      editBtn.setAttribute('id',`${item.id}`)
      editBtn.appendChild(document.createTextNode('Edit'))
      deleteBtn.setAttribute('class','del-btn')
      deleteBtn.setAttribute('id',`${item.id}`)
      deleteBtn.appendChild(document.createTextNode('Delete'))
      div.appendChild(h3)
      div.appendChild(editBtn)
      div.appendChild(deleteBtn)
      cards.appendChild(div) 
  })
  
  let addBtn = document.createElement('button')
  addBtn.appendChild(document.createTextNode('Add More Post'))
  addBtn.setAttribute('class','add-post')
  document.querySelector('.add-post-container').appendChild(addBtn)

  
  // apply event on add-post button 
  let addPostBtn = document.querySelector('.add-post')
  addPostBtn.addEventListener('click',addPost)

  // apply event on card button 
  let cardBtn = document.querySelectorAll('.card button')
  console.log('cardBtn....',cardBtn)
  cardBtn.forEach((btn) =>{
      btn.addEventListener('click',handleButtonClick)
  })
    }catch(err){
      console.log('error',err)
    }
} 

fetchData() 

// send post 
async function submitPost(event,id){
     event.preventDefault()
    try{
     let inputData = document.querySelector('.input-val').value
      let randomId = Math.floor(Math.random()*100)
      if(!inputData.trim().length){
        console.log('inputData.trim().length',inputData.trim().length)
        alert('no data')
        return;
      }
     let data = {id:`${randomId}`,title:inputData}
     if(id == null){
     let response = await fetch(`${URL}/posts`,{
        method:'POST',
        body : JSON.stringify(data)
     }) 
     document.querySelector('.model-outer').classList.remove('open')
    }else{
        let response = await fetch(`${URL}/posts/${id}`,{
            method : 'PUT',
            body: JSON.stringify({id:`${id}`,title:inputData})
        })
        document.querySelector('.model-outer').classList.remove('open')
    }

    // fetchData()
    }catch(err){
      console.log('submit error',err)
    }
}

 function addPost(event){
    event.preventDefault();
    const form = document.querySelector('.form')
    const isInputExist = document.querySelector('.input-val')
   let modelOuter =  document.querySelector('.model-outer')
    modelOuter.classList.add('open')
   

   if(!isInputExist){
     
      let input = document.createElement('input')
      let submit = document.createElement('button')
      input.setAttribute('class','input-val')
      submit.setAttribute('class','submit-btn')
      form.appendChild(input)
      submit.appendChild(document.createTextNode('Add'))
      form.appendChild(submit)
      let submitBtn = document.querySelector('.submit-btn')
      submitBtn.addEventListener('click',function(event){
        submitPost(event,null)
      })
    }
}



 
async function updateData(id){
    let data;
    try{
     let response = await fetch(`${URL}/posts/${id}`)
      data = await response.json()
     console.log('data..',data)
    }catch(err){
        console.log('err',err)
    }
    const form = document.querySelector('.form')
    document.querySelector('.model-outer').classList.add('open')
    let input = document.createElement('input')
    let submit = document.createElement('button')
    input.setAttribute('class','input-val')  
    submit.setAttribute('class','submit-btn')  
    input.value = `${data.title}` 
    form.appendChild(input)
    submit.appendChild(document.createTextNode('Add'))
    form.appendChild(submit)
    let submitBtn = document.querySelector('.submit-btn')
    submitBtn.addEventListener('click',function(event){
        submitPost(event,id)
    })
}

async function  deleteData(id){
    try{
   let response = await fetch(`${URL}/posts/${id}`,{
    method:'DELETE'
   })
    }catch(err){
     console.log('error while delete',err)
    }
} 


function handleButtonClick(event){
  let button = event.currentTarget;
  let btnClass = button.getAttribute('class')
  let btnId = button.getAttribute('id')
   if(btnClass == 'del-btn')
    deleteData(btnId)
   else
    updateData(btnId)
}


let modal =  document.querySelector('.container')
let outerModel = document.querySelector('.model-outer')
window.onclick = function(event){
  console.log('event target',event.target)
   if(event.target == outerModel){
      outerModel.classList.remove('open')
    
   }
}

