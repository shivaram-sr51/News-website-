const apiKey = "c52456d238a34e849524f992d6d52a89";

const feedContainer = document.getElementById("feed-container");

const searchField = document.getElementById("input-bar");

const searchButton = document.getElementById("search-button");

const sports = document.getElementById("sports");


async function fetchNews(){
     try{
        const apiUrl =`https://newsapi.org/v2/top-headlines?country=us&pageSize=51&apiKey=${apiKey}`;

        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
     }catch(error){
        console.error("Error fetching news",error );
        return[];

     }
}

sports.addEventListener("click" , async () => {
   const query = searchField.value.trim();
   if(query == "sports"){
      try{
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
 
}catch(error){
   console.log("Error fetching ", error);
}
   }
}) 

searchButton.addEventListener("click",async () =>{
   const query = searchField.value.trim();
   if(query !== ""){
      try{
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
      }catch(error){
         console.log("Error fetching ", error);
      }
   }
})

async function fetchNewsQuery(query){
   try{
      const apiUrl =`https://newsapi.org/v2/everything?q=${query}&pageSize=30&apiKey=${apiKey}`;
      

      const response = await fetch(apiUrl);
      const data = await response.json();
      return data.articles;
   }catch(error){
      console.error("Error fetching news",error );
      return[];

   }
}
 
function displayBlogs(articles){
feedContainer.innerHTML = "";
articles.forEach((article) => {
const feedCard = document.createElement("div")
feedCard.classList.add("feed")
const img = document.createElement("img")
img.classList.add("img-container")
img.src = article.urlToImage
img.alt = article.title
const title  = document.createElement("h2")
title.textContent = article.title
const description = document.createElement("p")
description.textContent = article.description

feedCard.appendChild(img)
feedCard.appendChild(title)
feedCard.appendChild(description)
feedCard.addEventListener("click",() =>{
   window.open(article.url,"_blank");
})
feedContainer.appendChild(feedCard)

});

}


(async () =>{
    try{
       const articles = await fetchNews();
       displayBlogs(articles);
    }catch(error){
        console.error("Error fetching news",error );
        
    }

})();