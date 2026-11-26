import { request, ApiError } from './http'

const localDemoUser = {
  id: 'pedro-vinicius-demo',
  username: 'pedro.vinicius',
  firstName: 'Pedro',
  lastName: 'Vinicius',
  email: 'pedro.vinicius@example.com',
  image: ''
}

const localDemoToken = 'barbearia-local-demo-pedro-vinicius'

// Converte o erro técnico em uma mensagem que o usuário entende.
function getLoginErrorMessage(error) {
  if (error.isNetworkError) {
    return error.message
  }

  // O DummyJSON costuma responder 400 para credenciais inválidas.
  if (error.status === 400 || error.status === 401) {
    return 'Usuário ou senha inválidos.'
  }

  if (error.status === 403) {
    return 'Você não tem permissão para acessar.'
  }

  return 'Não foi possível entrar agora. Tente novamente em instantes.'
}

export async function login({ username, password }) {
  if (username === localDemoUser.username && password === 'vinicius123') {
    return {
      accessToken: localDemoToken,
      user: localDemoUser
    }
  }

  try {
    const data = await request('/auth/login', {
      method: 'POST',
      body: { username, password, expiresInMins: 60 }
    })

    // Devolvemos só o que precisamos. A senha nunca sai daqui.
    return {
      accessToken: data.accessToken ?? data.token,
      user: {
        id: data.id,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        image: data.image
      }
    }
  } catch (error) {
    throw new ApiError(getLoginErrorMessage(error), {
      status: error.status,
      isNetworkError: error.isNetworkError
    })
  }
}

 // Consulta a API para verificar se o token é válido.
export async function getCurrentUser(token) {
  if (token === localDemoToken) {
    return localDemoUser
  }

  const data = await request('/auth/me', {
    method: 'GET',
    token
  })

  // Retorna os dados do usuário autenticado.
  return {
    id: data.id,
    username: data.username,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    image: data.image
  }
}
