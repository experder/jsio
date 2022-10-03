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
    //url="demo.json";
    $.ajax({
        dataType: "json",
        url: url,
        data: args,
        success: callback
    });
}