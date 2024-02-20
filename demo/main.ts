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

function isBalanced(root: TreeNode | null): boolean {
  let count = 0
  let min = 0
  const queue = [root] 
  
  
  while(queue.length) {
    const len = queue.length
    count++
    
    for(let i = 0; i < len; i++) {
      const node = queue.shift()
      
      if(!node?.left && !node?.right) {
        min = count
      }
      
      if(node?.left) {
        queue.push(node.left)
      }
      
      if(node?.right) {
        queue.push(node.right)
      }
    }
    
    if(count - min > 1) {
      return false
    }
  }

  return true
}


const main = () => {
  // [1,2,3,4,5,6,null,8] -> to tree node
  const res = isBalanced(new TreeNode(1, new TreeNode(2, new TreeNode(3), new TreeNode(4)), new TreeNode(5, new TreeNode(6), new TreeNode(8))))

  console.log(res);
  // bfs(res)
}

main()