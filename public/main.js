// alert("I am Here")

let todoItems = document.getElementsByClassName("todos")
var trash = document.getElementsByClassName("throwAway");
console.log("hello")

Array.from(todoItems).forEach(function(element) {
      element.addEventListener('click', function () {
        const name = this.parentNode.childNodes[1].innerText
      this.className = "crossOut"
      fetch('todos', {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                  'name': name,
                })
              })
              .then(response => {
                if (response.ok) return response.json()
              })
              .then(data => {
                console.log(data)
                // window.location.reload(true)
              })

      });
});


Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        console.log("Hello")
        const name = this.parentNode.childNodes[1].innerText
        const todoName= this.parentNode.childNodes[1].getAttribute('data-name')
        console.log(todoName)
        fetch('todos', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': todoName
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
