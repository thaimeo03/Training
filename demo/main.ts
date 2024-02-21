class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
      this.val = (val===undefined ? 0 : val)
      this.left = (left===undefined ? null : left)
      this.right = (right===undefined ? null : right)
  }
}

const bfs = (tree: TreeNode | null) => {
  const queue = [tree]
  while(queue.length) {
    const node = queue.shift()
    console.log((!node || node.val === null) ? 'null' : node.val)

    if (node?.left) {
      queue.push(node.left)
    }

    if (node?.right) {
      queue.push(node.right)
    }
  }
}

function minDepth(root: TreeNode | null): number {
  if(!root) return 0
  const queue = [root]
  let minDepth = 0

  while(queue.length) {
    const len = queue.length

    minDepth++

    for(let i = 0; i < len; i++) {
      const node = queue.shift()
      
      if(node) {
        if(!node.left && !node.right) return minDepth
        if(node.left) queue.push(node.left)
        if(node.right) queue.push(node.right)
      }
    }
  }
  
  return minDepth
}


const main = () => {
  // [2,null,3,null,4,null,5,null,6] -> to tree node
  const res = minDepth(new TreeNode(2, new TreeNode(3), new TreeNode(4, new TreeNode(5), new TreeNode(6))))

  console.log(res);
  // bfs(res)
}

main()