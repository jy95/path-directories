const chai = require("chai");
const dirnames = require("./index");
const expect = chai.expect;

const testCases = [
    ["D:\\DDL\\ANIME\\les chevaliers du zodiaques\\whateverFile.avi", [ 'D:', 'DDL', 'ANIME', 'les chevaliers du zodiaques' ] ],
    ["D:/DDL/EBOOK/whatEverFile.pub", [ 'D:', 'DDL', 'EBOOK' ] ],
    ["/foo", ["/"] ],
    ["D:\\test.avi", ["D:"] ],
];

describe('Should provide the requested data', () => {

    testCases.forEach((testCase) => {
        const filePath = testCase[0];
        const expectedResult = testCase[1];

        it(filePath, () => {
            expect(dirnames(filePath)).to.eql(expectedResult);
        });
    })

});