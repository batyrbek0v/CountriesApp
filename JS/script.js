const RouteList = [
    {
        title:'All Countries',
        route:'all',
    },
    {
        title:'Africa',
        route:'africa',
    },
    {
        title:'America',
        route:'americas',
    },
    {
        title:'Asia',
        route:'asia',
    },
    {
        title:'Europe',
        route:'europe',
    },
    {
        title:'Oceania',
        route:'oceania',
    },
]
const endPointList = {
    all:'all',
    capital:'capital',
    region:'region',
    name:'name'
}

const $navbarList = document.querySelector('.navbar_List')
const $loader = document.querySelector('.loader')
const $wrapper = document.querySelector('.wrapper')
const $select = document.querySelector('.select')
const $searchInput = document.querySelector('.searchInput')
const $nav = document.querySelector('.nav')


function getBase(endPoint, cb) {
    fetch(`https://restcountries.com/v3.1/${endPoint}`)
    .then(res => res.json())
    .then(res => cb(res))
}

window.addEventListener('load' , () => {
    $loader.innerHTML = '<div class="lds-facebook"><div></div><div></div><div></div></div>'
    const links = RouteList.map(({title,route}) => {
        return routeTemplate(title,route)
    }).join('')
    $navbarList.innerHTML = links

    getBase(endPointList.all , res => {
        cardTemplate(res)
    })
})

function routeTemplate(title,route) {
    return `
        <li class="nav-item">
            <a onclick="getRoute('${route}')" class="nav-link">${title}</a>
        </li>
    `
}

function getRoute(route) {
    console.log(route);
    if(route === 'all'){
        getBase(`${endPointList.all}`, res => {
            cardTemplate(res)
        })
    }else{
        getBase(`${endPointList.region}/${route}`, res => {
            cardTemplate(res)
        })
    }
}

function cardTemplate(base) {
    console.log(base);
    const template = base.map(item => {
        return card(item)
    }).join('')   
    $wrapper.innerHTML = template
}

function card(country) {
    console.log(country);
    return `
        <div class="card">
            <div class="card_title">
                <p>${country.name.common} ${country.flag ? country.flag : '...'}</p>
            </div>
            <div class="card_image">
            <img src="${country.flags.svg}">
            </div>
            <div class="card_footer">
                <button>More</button>
            </div>
        </div>
    `
}

$select.addEventListener('change', e => {
    var value = e.target.value;
    if(value === 'Capital'){
        $searchInput.setAttribute('placeholder', 'Search by: Capital')
        $nav.style.background = '#288ba8'
        $nav.style.color = 'aliceblue'
    }else{
        $searchInput.setAttribute('placeholder', 'Search by: Contry')
        $nav.style.background = '#7066A9'
        $nav.style.color = 'aliceblue'
    }
})

$searchInput.addEventListener('input', e => {
    var value = e.target.value;
    var selected = $select.value;
    if(selected === 'Capital'){
        getBase(`${endPointList.capital}/${value}`, res => {
            cardTemplate(res)
        })
    }else{
        getBase(`${endPointList.name}/${value}`, res => {
            cardTemplate(res)
        })
    }
})