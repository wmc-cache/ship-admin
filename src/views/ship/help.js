//深度优先遍历
let arr = []

export function dfs(json) {
  if (!json) return arr
  if (json.id && json.select == true) {
    arr.push(json.id)
  }

  if (typeof json === "string") return arr
  Object.keys(json).forEach((k) => {
    dfs(json[k]);
  });
  localStorage.setItem("dfs", arr)

}




