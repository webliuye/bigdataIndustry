import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'
const adapter = new LocalStorage('aval')
const db = low(adapter)
export default db
