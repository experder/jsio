function process(functionName){
    let myin = $("#myin").val();
    window[functionName](myin);
}
function done(result){
    $("#myout").val(result);
}
function progress(progressHtml){
    $("#progress").html(progressHtml);
}
function request_json(url, args={}, callback=function(data){console.log(data);}){
    console.log(url+"?"+buildGetString(args));
    // return;
    // url="/test.php";
    // if(geocode_service==='nominatim'){ url="demo_nominatim.json"; }
    // if(geocode_service==='geokeo'){ url="demo_geokeo.json"; }

    // $.ajaxSetup({
    //     beforeSend: function(request) {
    //         request.setRequestHeader("Access-Control-Allow-Origin", '*');
    //     }
    // });
    $.ajax({

        // //https://stackoverflow.com/questions/3372962/can-i-remove-the-x-requested-with-header-from-ajax-requests
        // // 'xhr' option overrides jQuery's default
        // // factory for the XMLHttpRequest object.
        // // Use either in global settings or individual call as shown here.
        // xhr: function() {
        //     // Get new xhr object using default factory
        //     let xhr = jQuery.ajaxSettings.xhr();
        //     // Copy the browser's native setRequestHeader method
        //     let setRequestHeader = xhr.setRequestHeader;
        //     // Replace with a wrapper
        //     xhr.setRequestHeader = function(name, value) {
        //         // Ignore the X-Requested-With header
        //         if (name === 'X-Requested-With') return;
        //         // Otherwise call the native setRequestHeader method
        //         // Note: setRequestHeader requires its 'this' to be the xhr object,
        //         // which is what 'this' is here when executed.
        //         setRequestHeader.call(this, name, value);
        //     }
        //     // pass it on to jQuery
        //     return xhr;
        // },

        dataType: "json",
        url: url,
        data: args,
        success: callback
    });
}
function buildGetString(args){
    let string = [];
    for (const [key, value] of Object.entries(args)) {
        string.push(encodeURIComponent(key)+"="+encodeURIComponent(value));
    }
    return string.join("&");
}
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
