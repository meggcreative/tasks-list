{
    let tasks = [];

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

    const render = () => {
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