const URL = 'http://localhost:3000'

export async function fetchData(){
    try{
  let response = await fetch(`${URL}/posts`)
  let data = await response.json()
  let cards = document.querySelector('.cards')
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
  addBtn.appendChild(document.createTextNode('Add More Post -->'))
  addBtn.setAttribute('class','add-post')
  cards.appendChild(addBtn)
    }catch(err){
      console.log('error',err)
    }finally{
        loader = false
    }
 
}

// fetchData() ;