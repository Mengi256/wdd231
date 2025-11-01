const courses = [
  { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, certificate: 'Web and Computer Programming', description: 'This course will introduce students to programming...', technology: ['Python'], completed: true },
  { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, certificate: 'Web and Computer Programming', description: 'This course introduces students to the World Wide Web...', technology: ['HTML', 'CSS'], completed: true },
  { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, certificate: 'Web and Computer Programming', description: 'CSE 111 students become more organized...', technology: ['Python'], completed: true },
  { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, certificate: 'Web and Computer Programming', description: 'This course will introduce the notion of classes...', technology: ['C#'], completed: false },
  { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, certificate: 'Web and Computer Programming', description: 'This course builds on prior experience in Web Fundamentals...', technology: ['HTML', 'CSS', 'JavaScript'], completed: true },
  { subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 2, certificate: 'Web and Computer Programming', description: 'This course builds on prior experience with Dynamic Web Fundamentals...', technology: ['HTML', 'CSS', 'JavaScript'], completed: false }
];

// Select elements
const all_btn = document.querySelector("#all-courses");
const cse_btn = document.querySelector("#cse");
const wdd_btn = document.querySelector("#wdd");
const coursesList = document.querySelector(".courses-list");
const total = document.querySelector(".total");

// Display function
function displayCourses(list) {
  coursesList.innerHTML = "";

  // Display each course
  list.forEach(course => {
    const div = document.createElement("div");
    div.classList.add("course-div");
    const tick = course.completed ? "✔" : "";
    div.innerHTML = `<div> ${tick} ${course.subject} ${course.number}</div>`;
    coursesList.appendChild(div);
  });

  // Calculate total credits
  const totalCredits = list.reduce((sum, course) => sum + course.credits, 0);

  // Display total credits in the <p class="total">
  total.innerHTML = `<strong>The total credits for courses listed above is ${totalCredits}</strong>`;
}

// Event listeners
all_btn.addEventListener("click", () => displayCourses(courses));
cse_btn.addEventListener("click", () => displayCourses(courses.filter(c => c.subject === "CSE")));
wdd_btn.addEventListener("click", () => displayCourses(courses.filter(c => c.subject === "WDD")));

// Show all courses by default
displayCourses(courses);
