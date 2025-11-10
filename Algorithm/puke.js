/**
 * 扑克牌排序
 * 1.炸弹
 * 2.三带而
 * 3.连对
 * 5.对子
 * 6.零散牌
 */

/**
 * 做法思路
 * 1. 把炸弹放到一个数组
 * 2. 把三个放到一个数组
 * 3. 把连对放到一个数组
 * 4. 把对子放到一个数组
 * 5. 把剩下的放到一个数组
 * 最后拼在一起
 */

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // Write your code here
    while(line = await readline()){
        let inputArray = line.split(' ').map(Number);
        inputArray.sort((a, b) => b - a)
        let startIndex = 0

        const fourResult = findFour(inputArray, startIndex)
        inputArray = fourResult.array
        startIndex = fourResult.startIndex

        const fullResult = findFullHouse(inputArray, startIndex)
        inputArray = fullResult.array
        startIndex = fullResult.startIndex

        const threeResult = findThree(inputArray, startIndex)
        inputArray = threeResult.array
        startIndex = threeResult.startIndex

        const twoResult = findTwo(inputArray, startIndex)
        inputArray = twoResult.array
        startIndex = twoResult.startIndex

        console.log(inputArray.join(' '));
    }
}()

// 找四张
const findFour = (arr, startIndex) => {
    for (let i = 1; i < 14; i++) {
        const index = arr.indexOf(i)
        if (index !== -1) {
            const fourSum = arr[index] + arr[index + 1] + arr[index + 2] + arr[index + 3]
            const fourFlag = fourSum === 4 * i
            if (fourFlag) {
                arr = [i, i, i, i, ...arr.slice(0, index), ...arr.slice(index + 4)]
                startIndex += 4
            }
        }
    }
    return {
        array: arr,
        startIndex
    }
}


// 找葫芦
const findFullHouse = (arr, startIndex) => {
    const targetArray = arr.slice(0, startIndex)
    let restArray = arr.slice(startIndex)

    for (let i = 1; i < 14; i++) {
        const index = restArray.indexOf(i)
        if (index !== -1) {
            const threeSum = restArray[index] + restArray[index + 1] + restArray[index + 2]
            const threeFlag = threeSum === 3 * i
            if (threeFlag) {
                restArray = [i, i, i, ...restArray.slice(0, index), ...restArray.slice(index + 3)]
                startIndex += 3
            }
        }
    }

    arr = [...targetArray, ...restArray]

    return {
        array: arr,
        startIndex
    }
}

// 找三张
const findThree = (arr, startIndex) => {
    const targetArray = arr.slice(0, startIndex)
    let restArray = arr.slice(startIndex)

    for (let i = 1; i < 14; i++) {
        const index = restArray.indexOf(i)
        if (index !== -1) {
            const threeSum = restArray[index] + restArray[index + 2] + restArray[index + 5]
            const threeFlag = threeSum === 3 * (i-1)
            if (threeFlag) {
                restArray = [i, i, i-1, i-1, i-2, i-2, ...restArray.slice(0, index), ...restArray.slice(index + 6)]
                startIndex += 6
            }
        }
    }

    arr = [...targetArray, ...restArray]

    return {
        array: arr,
        startIndex
    }
}

// 找对子
const findTwo = (arr, startIndex) => {

    const targetArray = arr.slice(0, startIndex)
    let restArray = arr.slice(startIndex)

    for (let i = 1; i < 14; i++) {
        const index = restArray.indexOf(i)
        if (index !== -1) {
            const threeSum = restArray[index] + restArray[index + 1]
            const threeFlag = threeSum === 2 * i
            if (threeFlag) {
                restArray = [i, i, ...restArray.slice(0, index), ...restArray.slice(index + 2)]
                startIndex += 2
            }
        }
    }

    arr = [...targetArray, ...restArray]

    return {
        array: arr,
        startIndex
    }

}