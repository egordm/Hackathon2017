const loadingArray = ['is procastinating','is learning','neemt er een poar','is using your data','is mining bitcoin','is coding','Is van t rad af','is predicting','is calculating','is ordering','is reading','is writing','is parsing'];
const regexurl = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])?/;

let incrementalTimer = 0;
// takes care of the search function
function timerFunction(){
    a= loadingArray[incrementalTimer];
    a = 'The machine ' + a;
    // rip console VV
   // console.log(a);
    $("#loaderText").text(a);
    incrementalTimer++;
    setInterval(function () {

        if (incrementalTimer >= loadingArray.length) {
            incrementalTimer = 0;
        }
        a= loadingArray[incrementalTimer];
        a = 'The machine ' + a;
      //  console.log(a);
        $("#loaderText").text(a);
        incrementalTimer ++;



    }, 2000);

}
$(document).ready(function() {
    $("#search-button").click(function(event) {
        searchinput = $("#search").val();
        output = {url : searchinput};
        console.log(output);
        let is_url=regexurl.test(searchinput);
        if(is_url){
            timerFunction();
            $("#mainSector").addClass('hide');
            $("#loadingSector").removeClass('hide');
            $.post("http://127.0.0.1:5000/classify", output, function(response){

            })
            .done(function(response) {
                $("#loadingSector").addClass('hide');
                $("#mainSector").removeClass('hide');
                console.log(response);
            })
            .fail(function(response) {
                Materialize.toast('there has been an internal error, please wait', 4000);
            })
        }
        else{
            Materialize.toast('this is not an url', 4000);
        }

    });


});