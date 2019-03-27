let testData = {
  totalQuestion: 10,
  Questions: [
    {
      id: 'Q1',
      type: 'easy',
      marks: 1
    },
    {
      id: 'Q2',
      type: 'easy',
      marks: 2
    },
    {
      id: 'Q3',
      type: 'medium',
      marks: 2
    },
    {
      id: 'Q4',
      type: 'hard',
      marks: 9
    },
    {
      id: 'Q5',
      type: 'easy',
      marks: 3
    },
    {
      id: 'Q6',
      type: 'hard',
      marks: 7
    },
    {
      id: 'Q7',
      type: 'medium',
      marks: 3
    },
    {
      id: 'Q8',
      type: 'easy',
      marks: 3
    },
    {
      id: 'Q9',
      type: 'medium',
      marks: 5
    },
    {
      id: 'Q10',
      type: 'hard',
      marks: 5
    }
  ]
};

let totalMarks = 20;
let easyPercentage = 25;
let hardPercentage = 25;
let mediumPercentage = 50;
let easyTypeMarks = (totalMarks * easyPercentage) / 100;
let hardTypeMarks = (totalMarks * hardPercentage) / 100;
let mediumTypesMarks = totalMarks - (easyTypeMarks + hardTypeMarks);
console.log('easy type', easyTypeMarks);
console.log('easy type', hardTypeMarks);
console.log('easy type', mediumTypesMarks);
console.log('easy type', mediumTypesMarks);

console.log('total Questions', testData.totalQuestion);

let easySet = testData.Questions.filter(element => element.type === 'easy');
let hardSet = testData.Questions.filter(element => element.type === 'hard');
let mediumSet = testData.Questions.filter(element => element.type === 'medium');

console.log('easy set', easySet);

let finalResult = [
  ...getCollection(easySet, easyTypeMarks),
  ...getCollection(hardSet, hardTypeMarks),
  ...getCollection(mediumSet, mediumTypesMarks)
];
console.log('final result', finalResult.map(element => element.id));
function getCollection(myArray, totalSum) {
  let test = myArray;
  let sortedTest = test.sort(function(a, b) {
    return a.marks - b.marks;
  });
  console.log('sorted array', sortedTest);
  let total = totalSum;
  let tempArray = [];
  let sum = 0;
  let resultArray = [];
  let remaingArray = JSON.parse(JSON.stringify(sortedTest));
  for (let i = 0; i < sortedTest.length; i++) {
    let remaingNum = total;
    sum = sum + sortedTest[i].marks;
    remaingArray.shift();
    if (sum === total) {
      resultArray.push(sortedTest[i]);
      break;
    }
    if (sum > total) {
      sortedTest.shift();
      remaingArray = JSON.parse(JSON.stringify(sortedTest));
      i = -1;
      resultArray = [];
      sum = 0;
      continue;
    }

    remaingNum = remaingNum - sum;
    resultArray.push(sortedTest[i]);

    let index = remaingArray.findIndex((value, index, array) => {
      return value.marks === remaingNum;
    });
    if (index > -1) {
      resultArray.push(remaingArray[index]);
      break;
    }
    if (!remaingArray.length) {
      sortedTest.shift();
      remaingArray = JSON.parse(JSON.stringify(sortedTest));
      i = -1;
      resultArray = [];
      sum = 0;
    }
  }

  return resultArray;
}

// getCollection([1, 2, 1, 3, 3], 5);
