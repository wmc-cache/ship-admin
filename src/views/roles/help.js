//深度优先遍历

window.dfsArr = []

export function dfs(json) {

  if (!json) {
    return
  }

  if (json.name && json.select == true && json.children.length === 0) {
    window.dfsArr.push(json.id)
  }

  if (typeof json === "string") {
    return
  }

  Object.keys(json).forEach((k) => {
    dfs(json[k]);
  });

  return window.dfsArr
}


export function addTip(json) {
  //console.log(json)
  if (!json) {
    return
  }

  if (json.select == true) {
    json.select = "已拥有";
  } else {
    json.select = "未拥有";
  }

  if (json.children.length === 0) {
    return
  }

  Object.keys(json.children).forEach((k) => {
    addTip(json.children[k]);
  });


}
