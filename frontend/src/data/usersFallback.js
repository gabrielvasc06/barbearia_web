const users = [
  { id: 1, firstName: 'Vanderson', lastName: 'Gabriel', username: 'vanderson.gabriel', email: 'vanderson@example.com', image: '' },
  { id: 2, firstName: 'Pedro', lastName: 'Vinicius', username: 'pedro.vinicius', email: 'pedro@example.com', image: '' },
  { id: 3, firstName: 'Emanuela', lastName: 'Souza', username: 'emanuela.souza', email: 'emanuela.souza@example.com', image: '' }
]

export const usersFallback = { users, total: users.length, skip: 0, limit: users.length }
