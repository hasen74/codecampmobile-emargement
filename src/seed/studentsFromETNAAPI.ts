import axios from 'axios'
//Instance api du site
export const trombi = axios.create({
  baseURL: 'https://intra-api.etna-alternance.net',
  timeout: 100000,
  headers: {
    accept: 'application/json'
  }
})

//Instance api de l'intra
export const intra = axios.create({
  baseURL: 'https://auth.etna-alternance.net',
  timeout: 100000,
  headers: {
    accept: 'application/json',
    origin: 'https://auth.etna-alternance.net'
  }
})

async function loginUserData(): Promise<any> {
  await intra.post('/identity',  { "login" : "solano_b", "password": "Etnaaol5!"}, 
{ withCredentials: true }).then((res) => {
  const setCookieHeader = res.headers['set-cookie'];

  // Extract the cookie string value from the set-cookie header value
  const cookieString = setCookieHeader[0].split(';')[0];
  console.log(cookieString)
  return cookieString
  })
}

export const fetchPromo = async (cookie: any) => {
  let promo: never[] = []
  console.log('Fetching promo...')
  await trombi.get('trombi', { headers: {
    cookie },
  }).then((res: any) => {
    promo = res.data
  })
  return promo
}

//Récupère les étudiants d'une promo
export const fetchSousPromo = async (id: number, cookie: string) => {
  let students: never[] = []
  await trombi.get(`trombi/${id}`, { headers: {
    cookie }},).then((res: any) => {
    students = res.data.students
  })
  return students
}

const cookie = ("authenticator=eyJpZGVudGl0eSI6ImV5SnBaQ0k2TkRBNU1qTXNJbXh2WjJsdUlqb2ljMjlzWVc1dlgySWlMQ0psYldGcGJDSTZJbk52YkdGdWIxOWlRR1YwYm1FdFlXeDBaWEp1WVc1alpTNXVaWFFpTENKc2IyZGhjeUk2Wm1Gc2MyVXNJbWR5YjNWd2N5STZXeUp6ZEhWa1pXNTBJbDBzSW14dloybHVYMlJoZEdVaU9pSXlNREl6TFRBeUxUSTRJREV5T2pVMU9qTXhJbjA9Iiwic2lnbmF0dXJlIjoiY2FWM0lxVWpkcjZicVkrUUVWWFZHbHd3QzByN2x3UmkreWE3R0RraW5RVUhOK2lpN01NYnFxaW1ORk96cHF0bnlORit1S283NFBSK2I4NFRUQ2NrdkNTcitIMFg0eXRZcHZ0WE5lUFwveXBBeWZ4bUlKOEMxVHVIWGhXK0NQXC92QXA2cEZzSFwvYXdSVk9vQmE3Y1ZmTUtEdTBHKzdXR0hpd0U2TEg1QUlsdkZtdm9zdGNDZUYrU3Q3SytWc1p4ZVVjckFCWjhsS1pcL2tZZW5wbG9tcjhtKzhpdnBvSmVCWWorU3J6QVE5d3hFaXNTNDNzMG9YaUJxNXhcLzNrTGRBV2pBQ1ViQ2lvSUlpekZyQzdCT29VMytMdDZHTUtpMDBZRWcrVzRHdUNtNUdcL1c5VnFYbnBURk9NMlZacVk0NGxPWlR6bVQ5aThrd0lSdXZvR0RvcGxUcmVIOUlHK053dnh2RDdcL3ZQS2JcL3VqN1VlcUlLZHdyZFZrRitDUVljYjJUMlhGb1RjeHJqOWN6SkphWlcyYldCZitRbmVMWHVtQUFSME5uMXFydmxWdnhNQUo4N3dpWXB0cnIwbzdBNXZjdW9aVUwyTGRGZEZzVkNTZ0RndGpYNzJBRksyeG11NjJmNHRcL2xGSjhRbGg4M2dJcGVUU1FXUVRmTGlJS1wvZ09CMVRERFduMkM1TkZlcXlNRkVrSGhkWnNrMmxqMHZUSkRwekhMUk55ZDk4eU5OZ0Z0K2xcL1wvMGlLZFBHRFJ1dkVDbzFwMjRBYzc5OGYxTzFFSStJQnN3andmQ094RGREcld1cnVOSERaOVJ5cjBoT01tUG9DOVVmVGNpODNzTFFQK0JxUjduemx4QTJqT1kyZzFNcWI2Q2hkK2VzNTd5bytvQnBzM2dGcUtUaURZcnM9In0%3D")

async function promos(): Promise<any> {
  const promo = await fetchPromo(cookie)
}

export async function promosAPAE(): Promise<any> {
  const APAE = await fetchSousPromo(812, cookie)
  return APAE
}

export async function promosAPE(): Promise<any> {
  const APE = await fetchSousPromo(813, cookie)
  return APE
}