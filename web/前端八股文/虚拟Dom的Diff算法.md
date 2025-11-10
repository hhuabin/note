# Diff算法

1. **分层比较**
   - **同级比较**：React假设不同层级的组件是不同的，并且在同一层级上，Diff算法只比较同级的节点，忽略不同层级的节点。这种假设可以减少比较的复杂度
   - key属性是diff算法中重要的属性。key是节点的唯一辨识，告诉diff算法，更改前后他们是同一个DOM节点

2. **相同类型节点的比较**

   - **节点类型检查**：如果两个节点的类型相同（如都是`<div>`或`<span>`），Diff算法会递归比较它们的子节点。如果节点类型不同，React会直接用新节点替换旧节点
   - 如果节点相同会先看看是否有text，没有text再比对Children

   - **更新策略**：对于相同类型的节点，Diff算法会进行深度比较和更新，比如比较属性、子节点等，以最小化DOM操作
   - Children比对
     1. 新前与旧前
     2. 新后与旧后
     3. 新后与旧前
     4. 新前与旧后

3. **子节点的比较**
   - **按键（Key）优化**：React建议为子节点提供唯一的`key`属性，以便更高效地识别节点。当子节点有`key`时，React可以更精确地匹配节点的位置，否则可能会进行更复杂的比较
   
   - **列表更新**：在处理列表（如`<ul>`中的`<li>`）时，如果子节点有`key`，React可以使用类似“最小化修改”的策略，通过`key`进行高效的元素重新排序或更新
   
4. **分块比较**
   - **局部更新**：React通过将虚拟DOM树划分为若干块，分别比较这些块，从而实现局部更新。这样可以避免不必要的全面比较，提升性能

5. **批量更新**
   - **异步更新**：React会将多次状态更新合并到一个批次中，这样可以减少不必要的渲染操作。通过这种方式，Diff算法能够在一次批量更新中高效地处理多个变化



```flow
patch=>start: patch函数被调用
old=>condition: oldVnode是不是虚拟节点
transformVnode=>operation: 将oldVnode(DOM节点)
包装为虚拟节点
vnode=>condition: oldVnode和newVnode
是不是sel和key都相同?
delete1=>operation: 暴力删除旧节点插入新节点
compare=>condition: oldVnode和newVnode
就是内存中的同一个对象?
undo=>operation: 什么都不用做

ishavetext=>condition: newVnode有没有text属性?
havetext=>condition: newVnode的text
和oldVnode是否相同?
sametext=>operation: 什么都不做
differenttext=>operation: 把ele中的innerText
改变为newVnode的text

oldVnodeHaveChildren=>condition: 此时newVnode中有Children
判断oldVnode有没有Children?
oldNoChildren=>operation: 1.清空oldVnode中的text
2.把newVnode中的Children添加到DOM中
oldHaveChildren=>operation: 最复杂的情况
1. 新前与旧前
2. 新后与旧后
3. 新后与旧前
4. 新前与旧后

patch->old
old(no,right)->transformVnode
old(yes)->vnode
transformVnode->vnode
vnode(no,right)->delete1
vnode(yes)->compare
compare(yes,right)->undo
compare(no,bottom)->ishavetext

ishavetext(yes,right)->havetext
havetext(yes,bottom)->sametext
havetext(no,right)->differenttext
ishavetext(no,bottom)->oldVnodeHaveChildren

oldVnodeHaveChildren(no,right)->oldNoChildren
oldVnodeHaveChildren(yes,bottom)->oldHaveChildren
```

