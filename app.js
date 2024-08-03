let url = "https://newsapi.org/v2/everything?q=";
let apiKey= "87c833f7ede247399e99ea4b0524d43d";

window.addEventListener("load", () => fetchnews("sports"));
async function fetchnews(query){
    const news = await fetch(`${url}${query}&apiKey=${apiKey}`);
     const news_data = await news.json();
     bindData(news_data.articles);
}

function bindData(articles){
    const card_container = document.querySelector("#card_container");
    const card_temp = document.querySelector("#card_temp");
    card_container.innerHTML = " ";
    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardclone = card_temp.content.cloneNode(true);
        filldataincard(cardclone,article);
        card_container.appendChild(cardclone);
        
    });
    function filldataincard(cardclone,article){
        let img = cardclone.querySelector("#card_img");
        let title = cardclone.querySelector("#news_title");
        let source = cardclone.querySelector("#news_source");
        let disc = cardclone.querySelector("#news_desc");

        img.src = article.urlToImage;
        title.innerHTML = article.content;
        source.innerHTML = article.source.name;
        disc.innerHTML = article.description;
        cardclone.firstElementChild.addEventListener("click", ()=>{
            window.open(article.url, "_blank");
        });

    }
}

let addclass = null;
function newnews(id){
    fetchnews(id);
    let navitem = document.getElementById(id)
    addclass?.classList.remove("active");
    addclass = navitem;
    addclass.classList.add("active");
}

// search news
const searchnews = document.querySelector("#searchnews");
const searchbtn = document.querySelector("#searchbtn");
searchbtn.addEventListener("click", () =>{
    let searchtext = searchnews.value;
    console.log(searchtext);
    fetchnews(searchtext);
});
// search news
