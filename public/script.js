let change=document.getElementById("Mode")
let sidebar=document.querySelector(".sidebar")
let main=document.querySelector(".main")
let line= document.querySelector("hr")
let newButt=document.getElementById("NewNote")
let textbox = document.getElementById("text")
newArray=[]
newArr=[]


sidebar.addEventListener('click',function(e){
    getOneNote(e.target.innerText)
})

document.addEventListener('click',function(e){
    if(e.target.id=='save')
    {
        console.log(document.getElementById("text").value)
        newArray.push(document.getElementById("text").value)
        let myNote = ''
        for(x of newArray)
        {
            if(x[x.indexOf("\n\n")])
            {
                newArr.push(x.slice(0,x.indexOf("\n")))
                myNote=x.slice(x.indexOf('\n')+2,x.length)
                
            }
        }
        for(i of newArr)
        {
        if(sidebar.innerHTML.includes(i)==false)
        {
            sidebar.innerHTML += `<p>${i}</p>`

        }
        addANote(newArr, myNote) 
     }
    }
    else if(e.target.id == 'cancel')
    {
        if(main.contains(change))
        {
        document.getElementById("Mode").classList.remove('hide')
        }
        document.getElementById("text").value="";
        text.parentNode.removeChild(text)
        save.parentNode.removeChild(save)
        cancel.parentNode.removeChild(cancel)

    }
    else if(e.target.innerHTML  == "Dark")
    {
        line.style.borderColor="white"
        e.target.innerHTML = "Light";
        document.body.style.backgroundColor = "#656565";
        sidebar.style.backgroundColor = "#3A3A3A";
        document.getElementById("Mode").style.backgroundColor = "#ECE8E8"
        document.getElementById("Mode").style.color = "black";
        sidebar.classList.add("darkColor");
        
    }
    else if(e.target.innerHTML == 'Light')
    {
        line.style.borderColor = "black"
        e.target.innerHTML = "Dark";
        document.body.style.backgroundColor = "#ECE8E8";
        sidebar.style.backgroundColor = "#C4C4C4";
        document.getElementById("Mode").style.backgroundColor = "#3A3A3A";
        document.getElementById("Mode").style.color = "white";
        sidebar.classList.remove("darkColor");

    }
    else if(e.target.id=='NewNote')
    {
        document.getElementById("Mode").classList.add('hide')
        let check = document.querySelector('textarea')
        if(main.contains(check) == false)
        {
            let text = document.createElement("textarea");
            text.id = 'text'
            let save = document.createElement("button")
            save.id = 'save'
            save.innerText = 'Save'
            let cancel = document.createElement('button')
            cancel.id = 'cancel'
            cancel.innerText = 'Cancel'
            main.appendChild(text)
            main.appendChild(save)
            main.appendChild(cancel)
        }
        
        // "<textarea id = text></textarea><button id=save>Save</button><button id=cancel>Cancel</button>";
        
    }
 });




//addANote must be called after save button is clicked
//uncomment to test addANote function
// const title = "note2"
// const note = "this is a sample note"
// addANote(title, note) 

//function to add a note with fetch
async function addANote(noteTitle, noteBody) {
  const data = { title: noteTitle, note: noteBody };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  const response = await fetch('/newNote', options);
  // making sure the json data was transferred
  const json = await response.json();
  console.log(json);
}

//getOneNote must be called after any of the item's on the sidebar is clicked
//uncomment to test get a note (AddANote should be called first)
// let data = getOneNote(title);


// function to get one note using a query string
async function getOneNote(noteTitle) {
  const response = await fetch(`/oneNote/?note=${noteTitle}`)
  const json = await response.json()
  const data = JSON.parse(json)
//call the  function to display the retrieved note
displayNote(data.note);
}

//write a function to display the retrieved note
function displayNote(note) {
    if (main.contains(textbox)){
      textbox.value = note
    }
    else {
    document.getElementById("Mode").classList.add('hide')
      let texter = document.createElement("textarea");
      texter.id = 'text'
      texter.innerText = note
      let saver = document.createElement("button")
      saver.id = 'save'
      saver.innerText = 'Save'
      let canceler = document.createElement('button')
      canceler.id = 'cancel'
      canceler.innerText = 'Cancel'
      main.appendChild(texter)
      main.appendChild(saver)
      main.appendChild(canceler)
    }
}
