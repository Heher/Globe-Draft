export function findByQuery(list, query, property) {
  return list.filter(listProp => {
    return listProp[property] === query
  })[0]
}