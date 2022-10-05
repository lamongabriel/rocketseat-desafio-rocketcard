gitButton.addEventListener('click', addInputElement)
backgroundButton.addEventListener('click', generateRandomColor)

// Create input and calls fetch function
function addInputElement() {
  if (!gitButton || !customization) return

  if (typeof inputGit != 'undefined') {
    fetchGitHub()
  } else {
    const input = document.createElement('input')
    input.type = 'text'
    input.id = 'inputGit'
    input.placeholder = 'Digite o seu usuário do Git...'
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') fetchGitHub()
    })
    customization.insertBefore(input, gitButton)
  }
}

// Fetch via GET method the public Github API
async function fetchGitHub() {
  if (!inputGit) return
  try {
    const user = inputGit.value
    const url = `https://api.github.com/users/${user}`

    let rawResponse = await fetch(url)

    if (rawResponse.ok) {
      let response = await rawResponse.json()
      console.log(response)
      addInfoOnCard(response)
    } else {
      alert('Usuário inválido!')
    }

    inputGit.remove()
  } catch (error) {
    console.log(error)
  }
}

// Update card info
function addInfoOnCard(data) {
  avatarLogo.src = data.avatar_url
  username.innerText = data.login

  followers.innerText = data.followers
  following.innerText = data.following
  repository.innerText = data.public_repos
  company.innerText = reduceStringSize(data.company)
  locationElement.innerText = reduceStringSize(data.location)
}

// Utility function, maximizes string length
function reduceStringSize(string) {
  if (string.length > 10) {
    return string.slice(0, 10) + '...'
  }
}

function generateRandomColor() {
  let r = document.querySelector(':root')
  r.style.setProperty(
    '--bg',
    `hsl(${(Math.random() * 360).toFixed(0)}, ${Math.random() * 100}%, ${Math.random() * 100}%)`
  )
}
