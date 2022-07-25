
const inputBtn = document.querySelector(".save-btn");
const tabBtn = document.querySelector(".tab-btn");
const deleteBtn = document.querySelector(".delete-btn");
const inputEl = document.querySelector(".input-el");
const ulEl = document.querySelector(".ul-el");
let myLeads = [];


// Get the leads from the localStorage - use JSON.parse() to convert string to array.
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") );
console.log(leadsFromLocalStorage);

// If leadsFromLocalStorage is truthy(items available), then set myLeads to its value and call renderLeads() 
// so that the saved items can be displayed even after page refresh
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        //ulEl.innerHTML += "<li>" + myLeads[i] + "</li>"; //---- same as below 3 lines of code
        /*
        const li = document.createElement("li"); //create element
        li.textContent = myLeads[i]; // set text content
        ulEl.append(li); //append to ul
        */
        
        /****************DOUBT*******************/
        //The below code is to display the items as unordered list in browser. But the bullets are not getting displayed
        //listItems += "<li>" + myLeads[i] + "</li>";

        //listItems += "<li><a target='_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>"  // target="_blank" will open the link in new tab
        
        //Use template strings to replace above code for easy readability
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }

    ulEl.innerHTML = listItems;
}


deleteBtn.addEventListener("dblclick", deleteInput);
inputBtn.addEventListener("click", saveInput);
tabBtn.addEventListener("click", tabInput);

function tabInput() {
    //save the current tab to saved list
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
}

function deleteInput() {
    //clear localstorage, myLeads and the DOM
    localStorage.clear();
    myLeads = [];
    render(myLeads);
}

function saveInput() {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    // Save the myLeads array to localStorage 
    // localStorage accepts only strings, so convert array to strings using JSON.stringify
    localStorage.setItem("myLeads", JSON.stringify(myLeads) );
    render(myLeads);
}

