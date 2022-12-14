const selectId = id => {
  const selectData=  document.getElementById(id);
  return selectData ;
}


selectId("submitForm").addEventListener('submit', event =>{
  event.preventDefault();
    const searchValue= selectId("searchValue").value ;
  if(searchValue !== "") {
    callApi(searchValue);
    selectId("searchValue").style.border= "1px solid #55efc4";
    selectId("containerParent").style.display="block";
    document.querySelector(".lyricsDiv").style.display="none";
  }else{
    selectId("searchValue").style.border= "1px solid red"
  }
   
})


const callApi = searchText =>{
  fetch(`https://api.lyrics.ovh/suggest/${searchText}`)
  .then(res => res.json())
  .then(data => dispalayData(data))
  .catch(err => console.log("song not find"))
}

const dispalayData = data =>{
  const dataArray = data.data ;
  selectId("containerParent").innerHTML= ""
  dataArray.forEach(songObj => {
    const songContent= document.createElement("div");
    songContent.innerHTML =`
    <div id="songContainer" class="col-xl-10 col-md-10 text-center m-auto mt-3">
            <h5 class="song-title">${songObj.title}</h5>
            <p class="song-artist">${songObj.artist.name}</p>
            <audio controls>
             <source src="${songObj.preview}" type="audio/mpeg">
            </audio>
            <button id="lyricBtn" onclick="getLyrics('${songObj.artist.name}','${songObj.title}')">Get Lyrics</button>
        </div>
    `
    selectId("containerParent").appendChild(songContent);
  })

}
const getLyrics= (artist, title) =>{
  selectId("containerParent").style.display="none";
   const lyricsDiv= document.createElement("div");
   lyricsDiv.className= "lyricsDiv col-md-10 m-auto text-center";
   selectId("lyricsContainer").innerHTML= "";

   lyricsDiv.innerHTML=`
     <div id="lyricClose" onclick="hideLyrics()" class=" d-flex justify-content-end">
     <i class="bi bi-x-circle-fill"></i>
     </div>
     <h5>${artist}</h5>
     <p>${title}</p>
     <p>No lyrics found <span><i class="bi bi-bug-fill"></i></span></p>
   `

   selectId("lyricsContainer").appendChild(lyricsDiv);

}

const hideLyrics= hide =>{
  selectId("containerParent").style.display="block";
  document.querySelector(".lyricsDiv").style.display="none";
}