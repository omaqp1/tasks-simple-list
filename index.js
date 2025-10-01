// استدعاء العناصر
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("search");

// استرجاع المهام من localStorage أو إنشاء مصفوفة جديدة
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// حفظ المهام في localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// إنشاء عنصر الاختبار في DOM
function createTaskElement(task, index) {
  const li = document.createElement("li");
  li.className = "task-item";

  // تشيك بوكس واحد لكل مهمة
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "select-checkbox";
  checkbox.checked = task.completed;

  // عنوان الاختبار
  const title = document.createElement("span");
  title.className = "task-Title";
  title.textContent = `عنوان الاختبار: ${task.title}`;
  title.style.color = task.completed ? "green" : "red";
  title.style.textDecoration = task.completed ? "line-through" : "none";

  // عند تغيير حالة التشيك بوكس
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    title.style.textDecoration = checkbox.checked ? "line-through" : "none";
    title.style.color = checkbox.checked ? "green" : "red";
    saveTasks();
  });

  // رابط الاختبار
  const link = document.createElement("a");
  link.href = task.link;
  link.target = "_blank";
  link.className = "task-Link";
  link.textContent = "🔗 رابط الاختبار";

  // التفاصيل الأخرى
  const number = document.createElement("span");
  number.className = "task-Number";
  number.textContent = `رقم النموذج: ${task.number}`;

  const time = document.createElement("span");
  time.className = "task-Time";
  time.textContent = `الموعد: ${task.time}`;

  const season = document.createElement("span");
  season.className = "task-Season";
  season.textContent = `نوع الاختبار: ${task.season}`;

  // زر حذف الاختبار
  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "حذف";
  deleteBtn.addEventListener("click", () => {
    tasks.splice(index, 1);
    renderTasks();
    saveTasks();
  });

  // تجميع كل العناصر داخل الـ li
  li.appendChild(checkbox);
  li.appendChild(title);
  li.appendChild(document.createElement("br"));
  li.appendChild(number);
  li.appendChild(document.createElement("br"));
  li.appendChild(time);
  li.appendChild(document.createElement("br"));
  li.appendChild(season);
  li.appendChild(document.createElement("br"));
  li.appendChild(link);
  li.appendChild(deleteBtn);

  return li;
}

// إعادة رسم كل المهام
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    taskList.appendChild(createTaskElement(task, index));
  });
}

// إضافة اختبار جديد
addBtn.addEventListener("click", () => {
  const task = {
    title: document.getElementById("taskTitle").value,
    link: document.getElementById("taskLink").value,
    time: document.getElementById("taskTime").value,
    season: document.getElementById("taskSeason").value,
    number: document.getElementById("taskNumber").value,
    completed: false
  };

  if (!task.title || !task.link) {
    alert("يرجى إدخال العنوان والرابط!");
    return;
  }

  tasks.push(task);
  renderTasks();
  saveTasks();

  // تفريغ الحقول
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskLink").value = "";
  document.getElementById("taskTime").value = "";
  document.getElementById("taskNumber").value = "";
});

// البحث في المهام
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = tasks.filter(task => 
    task.title.toLowerCase().includes(query) || 
    task.number.includes(query)
  );
  taskList.innerHTML = "";
  filtered.forEach((task, index) => {
    taskList.appendChild(createTaskElement(task, tasks.indexOf(task)));
  });
});

// رسم المهام عند تحميل الصفحة
renderTasks();
