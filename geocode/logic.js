let geocode_counter;
let geocode_results;
function geocode(myin){
    if(!(myin.trim())){
        progress("0/0");
        return;
    }
    geocode_results = [];
    let inArray = myin.trim().split("\n");
    progress("0/"+inArray.length);
    if (inArray.length===1){
        geocode_counter = 1;
        geocode_single(inArray[0].trim(),5, geocode_done);
        return;
    }
    geocode_counter = 0;
    for (let i = 0; i < inArray.length; i++){
        if(inArray[i].trim()){
            geocode_counter++;
            geocode_single(inArray[i].trim(), 1, geocode_done);
        }
    }
}
function geocode_done(data){
    geocode_results.push(geocode_process(data));
    progress(geocode_results.length+"/"+geocode_counter);
    if(geocode_results.length===geocode_counter){
        done(geocode_results.join("\n"));
    }
}
function geocode_process(data){
    if (geocode_counter===1){
        return geocode_line_detail(data);
    }
    return geocode_line_simple(data[0]);
}
function geocode_line_detail(data){
    let result = [];
    for (let i = 0; i < data.length; i++){
        let row = data[i];
        result.push(row.display_name
            +"\t"+row.lat+","+row.lon
        );
    }
    return result.join("\n");
}
function geocode_line_simple(data){
    return data.display_name+"\t"+data.lat+","+data.lon;
}
function geocode_single(address, limit=1, callback=function(data){console.log(data);}){
    request_json("https://nominatim.openstreetmap.org/search", {
        "format": "jsonv2",
        "q": address,
        "limit": limit,
    }, callback);
}
