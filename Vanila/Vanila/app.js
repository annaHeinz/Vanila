
window.onload = ()=> showElement();

function setValue()
{
    let newTask=(document.getElementById("task").value).toString();
    

}
function changeOption(){
 const select=document.getElementById('task-select')
  const selectedOption=select.options[select.selectedIndex]
  
  let nonruns=document.getElementsByClassName('newtask')
  let runs=document.getElementsByClassName("run")
  switch(selectedOption.text)
  {
    case 'Все':
      {
        let allTasks=document.querySelectorAll('#allTask > div')
     
        for(var a=0;a<allTasks.length;a++)
        {
          allTasks[a].style.display='flex'
        }
        break;
      }
    case 'Выполненные':
      {
       
        
        for(var a=0;a<nonruns.length;a++)
        {
      nonruns[a].style.display='none'

        }
        for(var a=0;a<runs.length;a++)
{
runs[a].style.display='flex'
}
      
      
      
      
break;
      }
      case 'Не выполненные':
        {
          
          
      for(var a=0;a<runs.length;a++)
      {
    runs[a].style.display='none'
      }
      for(var a=0;a<nonruns.length;a++)
        {
      nonruns[a].style.display='flex'

        }
break;
        }
  }

 

}
function showElement()
{
 
   const form = document.getElementById('input-form')
   const select=document.getElementById('task-select')
      const mainelement = document.getElementById('allTask')
      const input = document.getElementById('taskinput')

  select.addEventListener("change",changeOption);
    let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []
    localStorage.setItem('items', JSON.stringify(itemsArray))
    const data = JSON.parse(localStorage.getItem('items'))
    const jobMaker = text => {
      const div=document.createElement('div')
      div.classList.add('newtask')
      const newJob = document.createElement('input')
     newJob.type='text'
      const buttonDo=document.createElement('button')
      buttonDo.type='submit'
      buttonDo.innerHTML='Выполнить'
      const buttonDelete=document.createElement('button')
      buttonDelete.type='submit'
      buttonDelete.innerHTML='Удалить'
      newJob.value= text
      div.appendChild(newJob)
      div.appendChild(buttonDo)
      buttonDo.addEventListener('click',function(e){
                   e.preventDefault()
                   let element=((e.target).parentElement)
                   element.classList.add('run')
                   element.classList.remove('newtask')

      })

           buttonDelete.addEventListener('click',function(e){
              e.preventDefault()
             
             })
      div.appendChild(buttonDelete)
   
     mainelement.appendChild(div)
    }
    form.addEventListener('submit', function(e) {
      e.preventDefault()
    itemsArray.push(input.value.toString())
      localStorage.setItem('items', JSON.stringify(itemsArray))
      jobMaker(input.value.toString())
      input.value = ''
    })
    data.forEach(item => {
      jobMaker(item)
    })
   
    let buttonFetch=document.getElementById('fetchUser')
    buttonFetch.addEventListener("click",async function(e){
      e.preventDefault()
      let response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=5 ')
      if (response.ok) { 
        let json = await response.json();
    
const divUser=document.getElementById('randomUser')
json.forEach(recieveUser=>{
  const userContent = document.createElement('input')
  userContent.type='text'
  userContent.value=recieveUser.name
  divUser.appendChild(userContent)
})

      } else {
        alert("Ошибка HTTP: " + response.status);
      }
    })

}
