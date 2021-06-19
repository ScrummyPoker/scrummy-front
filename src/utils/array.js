export function addOrRemove(list, attr, element) {
  const newList = [...list];
  const actualIndex = newList.findIndex(t => t[attr] === element[attr]);

  return (actualIndex > -1) ? 
    newList.splice(actualIndex, 1) : newList.push({ ...element });
}