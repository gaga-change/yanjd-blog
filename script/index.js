const axios = require('axios')
const baseUrl = 'http://www.yanjd.top'
const strapiUrl = 'http://localhost:8710'

async function removeOld(name) {
  if (!name) return 
  const res = await axios.get(`${strapiUrl}/${name}?_limit=999`)
  const temps = res.data
  for(let i = 0; i < temps.length; i ++ ) {
    console.log(`delete ${name} `, temps[i].id)
    await axios.delete(`${strapiUrl}/${name}/${temps[i].id}`)
  }
}

async function copyTag(name) {
  if (!name) return 
  const res = await axios.get(`${baseUrl}/api/${name}?pageSize=999`)
  const temps = res.data.list
  for(let i = 0; i < temps.length; i ++ ) {
    console.log(`add ${name} `, temps[i]._id)
    const r = await axios.get(`${baseUrl}/api/${name}/${temps[i]._id}`)
    console.log(r.data.tags, r.data.tag)
    await axios.post(`${strapiUrl}/${name}`, r.data)
  }
}

async function copyDb(name) {
  await removeOld(name)
  await copyTag(name)
}

async function main() {
  // copyDb('tags')
  // copyDb('categories')
  // copyDb('posts')
}

main()