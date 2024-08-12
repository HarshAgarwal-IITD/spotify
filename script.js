async function getSongs() {
    // const a = await fetch("http://127.0.0.1:5500/mp3/song.html");
    // const response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = 
    `
            <tr>
                <td><a href="mp3/better-day-186374.mp3">Better Day</a></td>
            </tr>
            <tr>
                <td><a href="mp3/coverless-book-lofi-186307.mp3">Coverless Book</a></td>
            </tr>
            <tr>
                <td><a href="mp3/in-slow-motion-inspiring-ambient-lounge-219592.mp3">In Slow Motion</a></td>
            </tr>
            <tr>
                <td><a href="mp3/mellow-future-bass-bounce-on-it-184234.mp3">Mellow Future Bass</a></td>
            </tr>
            <tr>
                <td><a href="mp3/midnight-forest-184304.mp3">Midnight Forest</a></td>
            </tr>
            <tr>
                <td><a href="mp3/night-detective-226857.mp3">Night Detective</a></td>
            </tr>
          
            <tr>
                <td><a href="mp3/no-place-to-go-216744.mp3">No Place to Go</a></td>
            </tr>
            <tr>
                <td><a href="mp3/sad-soul-chasing-a-feeling-185750.mp3">Sad Soul</a></td>
            </tr>
            <tr>
                <td><a href="mp3/Tu Hai Kahan(PagalWorld.com.so).mp3">Tu Hai Kahan</a></td>
            </tr>
        </tbody>
    </table>



    `;
    //    console.log(div);
    const songData = div.getElementsByTagName("a");
    let songs = {}

    for (let index = 0; index < songData.length; index++) {
        const songLink = songData[index].href;
        const songName = songData[index].innerText

        songs[songName] = songLink;
    }

    //    console.log(songLinks)
    return songs;



}
function findCurrentSong(songLink)
{
    let songIndex=0;
    songs =document.querySelectorAll('li');
    for (let index = 0; index < songs.length; index++) {
        const element = songs[index];
        if(element.id==songLink)
        {
            songIndex=index;
            break;
        }
        
    }
    

    return songIndex; 
}
function formatTime(ms) {
    // Convert milliseconds to total seconds
    const totalSeconds = Math.floor(ms);

    // Calculate minutes and seconds
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // Format the time as MM:SS
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}


async function main() {

    let currentSong = new Audio();
    
    const songsData = await getSongs();
    let songLink = '';
    let LibraryIcon = '';
    let playerIcon = document.getElementById('playerPlay');
    let playerContent = '';

    const playlist = document.querySelector("ul");
    let count =0;

    //adding songs 
    for (const key in songsData) {
        const li = document.createElement("li")
        li.innerHTML = ` <img src="img/music.svg" class="invert" alt="">
                    <span> <div>${key}</div>
                        
                    </span>
                    <button >PLAY  
                     <img  src="img/play.svg" class="invert" alt=""> 
                     
                        <a href=${songsData[key]}></a>
                    </button>
                    `
        playlist.appendChild(li);
        li.id = songsData[key];
      


        // adding eventlistener to each song
        li.querySelector('button').addEventListener('click', () => {
            let currSongLink = li.querySelector('a').href;
            let currentLi;
           
            // check if any other song is playing
            if (songLink != currSongLink && songLink != '') {

                 currentLi = document.getElementById(songLink);


                currentLi.querySelector('button').querySelector('img').src = 'img/play.svg';
                
                playerIcon.src = 'img/play.svg';



            }
        
            
            songLink = currSongLink;
            //change id of player
            document.getElementsByClassName('player')[0].id=songLink
            LibraryIcon = li.querySelector('button').querySelector('img');

            playerContent = document.getElementsByClassName('songName')[0];
            
           
            // console.log(playerContent)
            playerContent.innerHTML = key;


            if (currentSong.src !== songLink) {
                currentSong.src = songLink;
                currentSong.play();

                LibraryIcon.src = "img/pause.svg";
                playerIcon.src = "img/pause.svg";
            } else {
                if (currentSong.paused) {
                    currentSong.play();
                    LibraryIcon.src = "img/pause.svg";
                    playerIcon.src = "img/pause.svg";
                } else {
                    currentSong.pause();
                    LibraryIcon.src = "img/play.svg";
                    playerIcon.src = "img/play.svg";
                }


            }
            //add event listener to update time
            currentSong.addEventListener("timeupdate", () => {
                document.getElementsByClassName('songInfo')[0].innerHTML = `${formatTime(currentSong.currentTime)} / ${formatTime(currentSong.duration)}`;
            })

        });





    }
    //adding functionality to player button

    document.getElementById('playerPlay').addEventListener('click', () => {


        //check if any song is played , plays first if none is being played
        if (songLink == '') {
            let currentLi = document.getElementsByTagName('li')[0];


            songName = currentLi.querySelector('span').querySelector('div').innerText;
            document.getElementsByClassName('songName')[0].innerHTML = songName;
            songLink = currentLi.querySelector('a').href;
            

            LibraryIcon = document.querySelector('button').querySelector('img');
            LibraryIcon.src = 'img/pause.svg';


        }
          //change id of player
          document.getElementsByClassName('player')[0].id=songLink

        


        // Check if the current song source is different from the new song link
        if (currentSong.src !== songLink) {
            currentSong.src = songLink;
            // Ensure currentSongIndex is updated correctly
            currentSong.play();
            LibraryIcon.src = "img/pause.svg";
            playerIcon.src = "img/pause.svg";
        } else {
            // Toggle play/pause based on the current state
            if (currentSong.paused) {
                currentSong.play();
                LibraryIcon.src = "img/pause.svg";
                playerIcon.src = "img/pause.svg";
            } else {
                currentSong.pause();
                LibraryIcon.src = "img/play.svg";
                playerIcon.src = "img/play.svg";
            }
        }
        //add event listener to update time
        currentSong.addEventListener("timeupdate", () => {
            document.getElementsByClassName('songInfo')[0].innerHTML = `${formatTime(currentSong.currentTime)} / ${formatTime(currentSong.duration)}`;
        })

    });


    // adding functionality to prev button;
    document.getElementById('prevSongBtn').addEventListener('click', () => {
        //check if any song has been played or is in the first song
        if (document.getElementsByClassName('player')[0].id == '' || document.getElementsByClassName('player')[0].id == document.getElementsByTagName('li')[0].id)
        {
            console.log('true');
            return;
        }
        // change icons of currentsong
        document.getElementById(songLink).querySelector('button').querySelector('img').src='img/play.svg';
        playerIcon.src='img/play.svg';
        currentSong.pause();
        //some song is already been played means we have player id as songLink 
        //we can find the prev song using data-index;
        let index=findCurrentSong(songLink);
        let currentLi=document.getElementsByTagName('li')[index-1];
        //updating player icon 
        LibraryIcon=currentLi.querySelector('button').querySelector('img');
        
       
        songLink=currentLi.querySelector('a').href;
        songName = currentLi.querySelector('span').querySelector('div').innerText;

        document.getElementsByClassName('songName')[0].innerHTML = songName;
        document.getElementsByClassName('player')[0].id=songLink
        
        currentSong.addEventListener("timeupdate", () => {
            document.getElementsByClassName('songInfo')[0].innerHTML = `${formatTime(currentSong.currentTime)} / ${formatTime(currentSong.duration)}`;
        })



    })

    //adding functionality of next button
    document.getElementById('nextSongBtn').addEventListener('click', () => {
        //check if  is in the last song
        if (document.getElementsByClassName('player')[0].id == document.getElementsByTagName('li')[8].id)
        {
            console.log('true');
            return;
        }
        // change icons of currentsong
        document.getElementById(songLink).querySelector('button').querySelector('img').src='img/play.svg';
        playerIcon.src='img/play.svg';
        currentSong.pause();
        //some song is already been played means we have player id as songLink 
        //we can find the prev song using data-index;
        let index=findCurrentSong(songLink);
        let currentLi=document.getElementsByTagName('li')[index+1];
        //updating player icon 
        LibraryIcon=currentLi.querySelector('button').querySelector('img');
       
        songLink=currentLi.querySelector('a').href;
        songName = currentLi.querySelector('span').querySelector('div').innerText;

        document.getElementsByClassName('songName')[0].innerHTML = songName;
        document.getElementsByClassName('player')[0].id=songLink
        
        currentSong.addEventListener("timeupdate", () => {
            document.getElementsByClassName('songInfo')[0].innerHTML = `${formatTime(currentSong.currentTime)} / ${formatTime(currentSong.duration)}`;
        })




    })


}
main()


