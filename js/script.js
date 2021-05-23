{
    let tasks = [];
    let hideDoneTasks = false;


    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];

        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),

        ];

        render();
    };

    const toogleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done
            },
            ...tasks.slice(taskIndex + 1),
        ];
        render();

    };



    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removebutton, index) => {
            removebutton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toogleTaskDone(index);
            });
        });
    }

    const bindButtonsEvents = () => {
        const hideDoneTasks = document.querySelector(".js-hideDoneTask");

        hideDoneTasks.addEventListener("click", () => {
            tasks.forEach((task, taskIndex) => {
                tasks[taskIndex].classList.toogle("list__item--hidden");
            })
        })

        const completeAllTasks = document.querySelector("js-completeAllTasks");

        completeAllTasks.addEventListener("click", () => {
            tasks.forEach((task, index) => {
                tasks = [
                    ...tasks.slice(0, index),
                    {...task,
                        done: true
                    },
                    ...tasks.slice(index + 1),
                ]
            });
        });

        render();
    }

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class="list">
                    
                    <button class="js-done list__button list__button--done"> 
                        ${task.done ? " ✔  " : " "}
                    </button>
                   <span class="list__content${task.done ? " list__content--done" : ""}">
                    ${task.content}
                   </span>  
                    <button class="list__button list__button--remove js-remove"> 🗑 </button>
                </li>    
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
        bindEvents();
    };

    const renderButtons = () => {
        let buttonsHTMLContent = "";

        if (tasks.length > 0) {
            buttonsHTMLContent += `
            <button class =" js-hideTaskDone" 
            ${tasks.every(({done}) => !done) ? "disabled" : ""} 
            >
            ${hideDoneTasks ? "Pokaz" : "Ukryj"} ukończone 
            </button>
            <button class ="completeAllTasks"
            ${tasks.every(({done}) => done) ? "disabled" : ""}
            >
            Ukończ wszystkie
            </button>
            `;
        };

        document.querySelector(".js-doneButtons").innerHTML = buttonsHTMLContent;

    };


    const render = () => {
        renderTasks();
        renderButtons();
    };

    const clearInput = (inputContent) => {
        inputContent.value = "";

    };

    const setFocus = (inputContent) => {
        inputContent.focus();
    };

    const onFormSubmit = (event) => {

        event.preventDefault();

        const inputContent = document.querySelector(".js-newTask");
        const newTaskContent = inputContent.value.trim();

        console.log(newTaskContent);

        if (newTaskContent === "") {
            return;
        }
        addNewTask(newTaskContent);
        clearInput(inputContent);
        setFocus(inputContent);
    };


    const init = () => {
        render();
        const form = document.querySelector(".form");
        const inputContent = document.querySelector(".js-newTask");

        form.addEventListener("submit", onFormSubmit);
        setFocus(inputContent);

    };

    init();

}