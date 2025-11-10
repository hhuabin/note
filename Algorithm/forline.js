/**
 * 后序遍历：CBEFDA
 * 中序遍历：CBAEDF
 * 输入 CBEFDA CBAEDF
 * 输出结果：ABDCEF
 */
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // Write your code here
    while(line = await readline()){
        let [postorder, inorder] = line.split(' ');
        postorder = postorder.split('')
        inorder = inorder.split('')

        const root = buildTree(inorder, postorder)
        
        console.log(root);
        
        const resultOrder = printTree(root)

        console.log(resultOrder);
        
    }
}()

const TreeNode = (val) => ({
    val,
    left: null,
    right: null
})

// 根据中序遍历和后续遍历创建原来的二叉树
const buildTree = (inorder, postorder) => {
    if (!postorder.length || !inorder.length) return null;

    const rootVal = postorder.pop()
    const root = TreeNode(rootVal)

    const rootIndex = inorder.indexOf(rootVal)

    root.right =  buildTree(inorder.slice(rootIndex + 1), postorder)
    console.log("postorder", postorder);
    
    root.left = buildTree(inorder.slice(0, rootIndex), postorder)
    return root
}

// 层层打印
const printTree = (root) => {

    if (!root) return [];
    const result = []
    const queue = [root]

    while (queue.length) {
        const levelSize = queue.length
        const currentLevel = []
        
        for (let index = 0; index < levelSize; index++) {
            const node = queue.shift()
            currentLevel.push(node.val)

            if (node.left) {
                queue.push(node.left)
            }
    
            if (node.right) {
                queue.push(node.right)
            }
        }
        result.push(currentLevel.join(''))
    }
    return result.join('')
}
