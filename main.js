
const chart1 = document.querySelector('#chart1');
const chart2 = document.querySelector('#chart2');
const dataWrapper = document.querySelector('.data-wrapper')

const BASE_URL = "https://datausa.io/api/data";
const QUERY_POPULATION = "?drilldowns=Nation&measures=Population";


const fetcFunc = async () => {
    //try and catch is like if else statement
    try {
        //ways to concatinate two strings; 1. concat(); 2, + sign; 3: `${url}someStringAfterUrl${params}`
        const response = await fetch(BASE_URL.concat(QUERY_POPULATION))
        const example = await response.json()

        const data = example.data
        // const {data} = example
        //passing feteched data to a function
        displayDataOnUI(data)

    } catch (error) {
        console.log(error, 'error')
    }
}
fetcFunc();

//display data on UI 
//receiving data in function
const displayDataOnUI = (data) => {
    console.log(data, 'data')
    const arrayOfYears = [];
    const arrayOfPopulation = []
    data.forEach((singleData) => {
        const div = document.createElement('div')
        div.innerHTML = `${singleData.Population.toLocaleString()} - ${singleData.Year}`
        dataWrapper.appendChild(div)
        arrayOfPopulation.push(singleData.Population);
        arrayOfYears.push(singleData.Year)
    })

    displayBarChart(arrayOfYears, arrayOfPopulation)
    displayLineChart(arrayOfYears,arrayOfPopulation);
}

//create a bar chart

const displayBarChart = (arrayOfYears, arrayOfPopulation) => {
    const data = {
        labels: arrayOfYears,
        datasets: [{
            label: 'Population in US',
            data: arrayOfPopulation,
            borderColor: "rgb(255, 0, 0)",
            backgroundColor: "rgba(255, 0, 0, 0.2",

        }]
    }

    const config = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    min: 315000000,
                }
            },
        }
    }
    // new Chart excepts 2 parametrs: 1- canvas, 2 - object with specifiyng type of the chart, 2- data that needs to be shown, 3 -options 
    new Chart(chart1, config)

}
const displayLineChart = (arrayOfYears, arrayOfPopulation) => {
    const data = {
        labels: arrayOfYears,
        datasets: [{
            label:'Population in US',
            data: arrayOfPopulation,
            borderColor: "rgba(255, 0, 0, 0.2)",
            backgroundColor: "rgba(255, 0, 0, 0.2)",
            tension: 0.1,
    
        }]
    }
    const config = {
        type: 'line',
        data: data,
        options: {
            scales: {
                y: {
                    min: 315000000,
                }
            },
        }
    }
    new Chart(chart2, config)

}














