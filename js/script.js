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
        const task = tasks[taskIndex];
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...task,
                done: !task.done
            },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleHideDoneTask = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const setAllTasksDone = () => {
        tasks = tasks.map(task => ({
            ...task,
            done: true,
        }));

        render();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removebutton, index) => {
            removebutton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toogleTaskDone(index);
            });
        });
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class="list__item${task.done && hideDoneTasks ? " list__item--hidden" : ""}">
                    <button class="js-done list__button list__button--done"> 
                        ${task.done ? " ✔  " : " "}
                    </button>
                   <span class="list__content${task.done ? " list__content--done" : ""}">
                    ${task.content}
                   </span>  
                    <button class="list__button list__button--remove js-remove"> 🗑 </button>
                </li>    
            `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        let buttonsHTMLContent = "";

        if (tasks.length > 0) {
            buttonsHTMLContent += `
            <button class ="js-hideDoneButton" 
            ${tasks.every(({done}) => !done) ? "disabled" : ""} 
            >
            ${hideDoneTasks ? "Pokaz" : "Ukryj"} ukończone 
            </button>
            <button class="js-completeAllButton"
            ${tasks.every(({done}) => done) ? "disabled" : ""}
            >
            Ukończ wszystkie
            </button>
            `
        };

        document.querySelector(".js-doneButtons").innerHTML = buttonsHTMLContent;

    };

    const bindHideButtonsEvents = () => {
        const hideDoneButton = document.querySelector(".js-hideDoneButton");

        if (!hideDoneButton) {
            return;
        }

        hideDoneButton.addEventListener("Click", () => {
            toggleHideDoneTask();
        });
    };


    const bindCompleteAllTasksEvent = () => {
        const completeAllButton = document.querySelector(".js-completeAllButton");

        if (!completeAllButton) {
            return;
        }
        completeAllButton.addEventListener("click", () => {
            setAllTasksDone();
        });
    };


    const render = () => {
        renderTasks();
        renderButtons();

        bindToggleDoneEvents();
        bindRemoveEvents();
        bindHideButtonsEvents();
        bindCompleteAllTasksEvent();

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

        if (newTaskContent === "") {
            return;
        };
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