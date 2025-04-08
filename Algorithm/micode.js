const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // Write your code here
    while(line = await readline()){
        let inputArray = line.split(' ');

        let resultLength = 0, resultStr = "";
        
        for (let index = 0; index < inputArray.length; index++) {
            const element = inputArray[index]

            if (isInInputArray(inputArray, element)) {

                if (element.length >= resultLength) {
                    resultLength = element.length
                    resultStr = element
                }
            }
        }

        console.log(resultStr)
        
    }
}()

const isInInputArray = (array, str) => {
    for (let index = str.length - 1; index > 0; index--) {
        const restStr = str.substring(0, index)
        if (array.includes(restStr)) {
            if (index === 1) return true
        } else {
            return false
        }
    }
}
