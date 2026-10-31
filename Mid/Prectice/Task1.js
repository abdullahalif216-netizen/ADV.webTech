const sname = "Sifat";
let marks = [40, 50, 60, 80, 90];
marks.push(70);

function Total(marks) {
  let total=0;
  for (let i=0; i<marks.length; i++) {
    total=total+marks[i];
  } console.log("Total Marks: ", total);
}

function Avarage(marks) {
  let total=0;
  for (let i=0; i<marks.length; i++) {
    total=total+marks[i];
  }
  let avarage=total/marks.length;
  console.log("Avarage: ", avarage);
  Grade(avarage);
}

function Grade(avarage) {
  if (avarage>=85) {
    console.log("A");
  } else if (avarage >= 75) {
    console.log("B");
  } else if (avarage >= 65) {
    console.log("C");
  } else if (avarage >= 60) {
    console.log("D");
  } else {
    console.log("F");
  }
}

function Result(marks) {
  for (let i=0; i<marks.length; i++) {
    if (marks[i]<50) {
      console.log("Fail");
    } else {
      console.log("Pass");
    }
  } 
  
}

function findHighestMark(marks) {
  let heightst=marks[0];
  for (let i= 1; i<marks.length; i++) {
    if (marks[i]>heightst) {
      heightst=marks[i];
    }
  } console.log("Highest Marks: ", heightst);
}

function countPassedSubjects(marks) {
  let count=0;
  for (let i=0; i<marks.length; i++) {
    if (marks[i]>=50) {
      count++;
    }
  } console.log("Passed Student: ", count);
}

console.log("Student Name: ", sname);
console.log("Marks: ", marks);

Total(marks);
Avarage(marks);
Result(marks);
findHighestMark(marks);
countPassedSubjects(marks);