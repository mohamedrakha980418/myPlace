//? var
//? class
class GetLocationButton{
    getLocation_Button = document.getElementById(`getLocation_Button`);
    map_Iframe = document.getElementById(`map_Iframe`);
    alert_div = document.getElementById(`alert_div`);

    //stop get location
    userLocation;

    constructor(){
        this.showLastLocation();
        this.clickOnGetLocation_Button();
    }

    clickOnGetLocation_Button(){
        this.getLocation_Button.addEventListener(`click`,()=>{
            if (this.getLocation_Button.innerText === `تحديد موقعى`) {
                this.getLocation();
            } else if (this.getLocation_Button.innerText === `ايقاف العرض`){
                this.stopGetLocation();
                this.alertForMap(`لقد قمت بإيقاف عرض موقعك`);
                this.changeTextForGetLocation_Button(`تحديد موقعى`);
            }
        });
    }

    //get location
        getLocation(){
            this.userLocation =  navigator.geolocation.watchPosition(position=>{
                this.map(position.coords.longitude,position.coords.latitude);
                this.alertForMap(`يتم عرض موقعك الان بشكل مباشر`);
                this.changeTextForGetLocation_Button(`ايقاف العرض`);
                this.getLocationForLocalStorage(position.coords.longitude,position.coords.latitude);
            },()=>{
                this.alertForMap(`لقد منعت الحصول على موقعك`);
            });
        }

            map(long,lati){
                this.map_Iframe.src = `https://www.openstreetmap.org/export/embed.html?bbox=${long},${lati}&amp;layer=mapnik`;
            }

            alertForMap(text){
                this.alert_div.innerText = text;
                this.alert_div.style.display = `block`;
            }

            changeTextForGetLocation_Button(text){
                this.getLocation_Button.innerText = text;
            }

    // stop get location
        stopGetLocation(){
            navigator.geolocation.clearWatch(this.userLocation);
            this.map(0,0);
            this.getLocationForLocalStorage(0,0);
        }

    //Show last location
        showLastLocation(){
            onload = ()=>{
                if (localStorage.getItem(`longitude`) != 0 && localStorage.getItem(`latitude`) != 0) {
                    this.map(localStorage.getItem(`longitude`),localStorage.getItem(`latitude`));
                    this.alertForMap(`يتم عرض موقعك الان بشكل مباشر`);
                    this.changeTextForGetLocation_Button(`ايقاف العرض`);
                }
            };
        }

            getLocationForLocalStorage(long,lati){
                localStorage.setItem(`longitude`,long);
                localStorage.setItem(`latitude`,lati);
            }
}

//? function
//? run
let rGetLocationButton = new GetLocationButton();