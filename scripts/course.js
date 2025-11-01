const courses = [
  {
    subject: 'CSE',
    number: 110,
    title: 'Introduction to Programming',
    credits: 2,
    completed: true
  },
  {
    subject: 'WDD',
    number: 130,
    title: 'Web Fundamentals',
    credits: 2,
    completed: true
  },
  {
    subject: 'CSE',
    number: 111,
    title: 'Programming with Functions',
    credits: 2,
    completed: true
  },
  {
    subject: 'CSE',
    number: 210,
    title: 'Programming with Classes',
    credits: 2,
    completed: false
  },
  {
    subject: 'WDD',
    number: 131,
    title: 'Dynamic Web Fundamentals',
    credits: 2,
    completed: true
  },
  {
    subject: 'WDD',
    number: 231,
    title: 'Frontend Web Development I',
    credits: 2,
    completed: false
  }
];

const all_btn = document.querySelector("#all-courses");
const cse_btn = document.querySelector("#cse");
const wdd_btn = document.querySelector("#wdd");
const coursesList = document.querySelector(".courses-list");
const total = document.querySelector(".total");

function displayCourses(list) {
  coursesList.innerHTML = "";

  list.forEach(course => {
    const div = document.createElement("div");
    div.classList.add("course-div");

   
    if (course.completed) div.classList.add("completed");

    
    const tick = course.completed ? "✔" : "";
    div.innerHTML = `<span class="tick">${tick}</span>${course.subject} ${course.number} `;

    coursesList.appendChild(div);
  });


  const totalCredits = list.reduce((sum, course) => sum + course.credits, 0);
  total.innerHTML = `The total credits for courses listed above is ${totalCredits}`;
}


all_btn.addEventListener("click", () => displayCourses(courses));
cse_btn.addEventListener("click", () => displayCourses(courses.filter(c => c.subject === "CSE")));
wdd_btn.addEventListener("click", () => displayCourses(courses.filter(c => c.subject === "WDD")));


displayCourses(courses);
