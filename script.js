window.onload = () => {


    const $ = query => document.querySelector(query)
    const $$ = query => document.querySelectorAll(query)
  
  
    // Likes
    const likeDislike = button => button.querySelector('*').innerHTML++
  
    $('#anotherCounter').addEventListener('click', e => likeDislike(e.target))
    //export
    window.likeDislike = likeDislike
  
  
    // Blocked
    $$('.blocked').forEach(elem => elem.addEventListener('contextmenu', e => {
      e.preventDefault()
    }))
  
  
    // TODO list
    $$('.todo-list__add').forEach(btn => btn.addEventListener('click', ({ target }) => {
      const input = target.parentElement.querySelector('.todo-list__new-task')
      const listActive = target.parentElement.querySelector('.todo-list__active-list')
      const listDone = target.parentElement.querySelector('.todo-list__done-list')
  
      if (input.value.length === 0) return alert('Type something!'), -1
      const li = document.createElement('li')
      const check = document.createElement('button')
      const text = document.createElement('input')
      const edit = document.createElement('button')
      const remove = document.createElement('button')
  
      li.appendChild(check)
      li.appendChild(text)
      li.appendChild(edit)
      li.appendChild(remove)
      listActive.appendChild(li)
  
      text.type = 'text'
      text.readOnly = true
      text.value = input.value
      input.value = ''
  
      const SAVE_ICON = '💾'
      const EDIT_ICON = '🔨'
      const REMOVE_ICON = '❌'
     
      const ACTIVE_ICON = '☐'
      const DONE_ICON = '☑'
  
      check.innerHTML = ACTIVE_ICON
      check.onclick = () => {
        if (check.innerHTML == ACTIVE_ICON) {
          check.innerHTML = DONE_ICON
          listDone.appendChild(li)
        } else {
          check.innerHTML = ACTIVE_ICON
          listActive.appendChild(li)
        }
      }
  
      edit.innerHTML = EDIT_ICON
      edit.onclick = () => {
        if (edit.innerHTML == EDIT_ICON) {
          text.readOnly = false
          edit.innerHTML = SAVE_ICON
          text.focus()
        } else {
          text.readOnly = true
          edit.innerHTML = EDIT_ICON
        }
      }
  
      remove.innerHTML = REMOVE_ICON
      remove.onclick = () => confirm('Delete task?') ? li.remove() : 0
  
    }))
  
    // 
  
    document.addEventListener('keydown', e => {
  
      const { code, ctrlKey } = e
      const ctrl_e = code == 'KeyE' && ctrlKey
      const ctrl_s = code == 'KeyS' && ctrlKey
  
      if (ctrl_e || ctrl_s) {
        e.preventDefault()
        const div = $('.text-editor div')
        const txt = $('.text-editor textarea')
        if (ctrl_e) {
          div.classList.add('hidden')
          txt.classList.remove('hidden')
          txt.focus()
        } else if (ctrl_s) {
          div.classList.remove('hidden')
          txt.classList.add('hidden')
          div.innerHTML = txt.value
        }
  
      }
  
    })
  
    $$('.name-table th').forEach(th => th.addEventListener('click', e => {
      const index = th.cellIndex
      const rows = [...$$('.name-table tr')].slice(1)
      const sortedRows = rows.sort((a, b) => a.cells[index].innerHTML > b.cells[index].innerHTML ? 1 : -1)
      $('.name-table').append(...sortedRows)
    }))
  
  
 
  }