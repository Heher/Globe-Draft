export function findByQuery(list, query, property) {
  return list.find(listProp => {
    return listProp[property] === query
  })
}