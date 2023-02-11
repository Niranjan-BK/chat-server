const $signupForm = document.querySelector('#signup-form')
const $loginForm = document.querySelector('#login-form')
if ($signupForm) {
    $signupForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const body = JSON.stringify({
            name: $signupForm.elements.name.value,
            email: $signupForm.elements.email.value,
            password: $signupForm.elements.password.value
        })
        fetch('/users', {
            method: 'POST',
            headers: {
              Accept: 'application.json',
              'Content-Type': 'application/json'
            },
            body: body,
          }).then((res) => {
            return res.json() 
          }).then((result) => {
            if (result.token) {
                window.location = `/chat?username=${result.user.name}`
            }
          }).catch((e) => {
            console.log(e);
          })
    
    })
}

if ($loginForm) {
    $loginForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const body = JSON.stringify({
            email: $loginForm.elements.email.value,
            password: $loginForm.elements.password.value
        })
        fetch('/users/login', {
            method: 'POST',
            headers: {
              Accept: 'application.json',
              'Content-Type': 'application/json'
            },
            body: body,
          }).then((res) => {
            return res.json() 
          }).then((result) => {
            if (result.token) {
                window.location = `/chat?username=${result.user.name}`
            }
          }).catch((e) => {
            console.log(e);
          })
    
    })
}
