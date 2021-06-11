//深度优先遍历

window.dfsArr = []
export function dfs(json) {

  if (!json) {
    return
  }

  if (json.name && json.select == true) {
    window.dfsArr.push(json.name)
  }

  if (typeof json === "string") {
    return
  }

  Object.keys(json).forEach((k) => {
    dfs(json[k]);
  });

  return window.dfsArr
}





