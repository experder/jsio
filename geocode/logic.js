let geocode_counter;
let geocode_results;
let geocode_results_counter;
let geocode_service;
function geocode(myin){

    let radioValue = $("input[name='service']:checked").val();
    if(!radioValue){
        progress("Please specify service!");
        return;
    }
    geocode_service = radioValue;

    if(!(myin.trim())){
        progress("0/0");
        return;
    }

    geocode_results = [];
    geocode_results_counter = 0;
    let inArray = myin.trim().split("\n");
    progress("0/"+inArray.length);
    if (inArray.length===1){
        geocode_counter = 1;
        geocode_single(inArray[0].trim(),10, function(data){geocode_done(data, 0);});
        return;
    }
    geocode_counter = 0;
    for (let i = 0; i < inArray.length; i++){
        if(inArray[i].trim()){
            geocode_counter++;
            geocode_single(inArray[i].trim(), 1, function(data){geocode_done(data, i);});
        }
    }
}
function geocode_done(data, id){
    geocode_results[id] = geocode_process(data);
    geocode_results_counter++;
    progress(geocode_results_counter+"/"+geocode_counter);
    //if(geocode_results.length===geocode_counter)
    {
        done(geocode_results.join("\n"));
    }
}
function geocode_process(data){
    if(geocode_service==='nominatim'){
        return geocode_line_array(data);
    }
    if(geocode_service==='geokeo'){
        return geocode_line_array(data.results);
    }
    if(geocode_service==='xyz'){
        return geocode_line_array([data]);
    }
    if(geocode_service==='geoapify'){
        return geocode_line_array(data.features);
    }
    return null;
}
function geocode_line_array(data){
    if (geocode_counter===1){
        let result = [];
        for (let i = 0; i < data.length; i++){
            result.push(geocode_line_simple(data[i]));
        }
        return result.join("\n");
    }
    return geocode_line_simple(data[0]);
}
function geocode_line_simple(data){
    if(geocode_service==='nominatim'){
        return data.type
            +"\t"+data.address.road
            +"\t"+data.address.house_number
            +"\t"+data.address.postcode
            +"\t"+data.address.city
            +"\t"+data.address.country
            +"\t"+geocode_format_latlon(data.lat,data.lon);
    }
    if(geocode_service==='geokeo'){
        return data.class+"/"+data.type
            +"\t"+data.address_components.street
            +"\t"//+data.address_components.house_number
            +"\t"+data.address_components.postcode
            +"\t"+data.address_components.city
            +"\t"+data.address_components.country
            +"\t"+geocode_format_latlon(data.geometry.location.lat,data.geometry.location.lng);
    }
    if(geocode_service==='xyz'){
        return ""
            +"\t"+data.standard.addresst
            +"\t"+data.standard.stnumber
            +"\t"+data.standard.postal
            +"\t"+data.standard.city
            +"\t"+data.standard.countryname
            +"\t"+geocode_format_latlon(
                data.latt,
                data.longt
            );
    }
    if(geocode_service==='geoapify'){
        return data.properties.result_type
            +"\t"+data.properties.street
            +"\t"+data.properties.housenumber
            +"\t"+data.properties.postcode
            +"\t"+(data.properties.city?data.properties.city:data.properties.suburb)
            +"\t"+data.properties.country
            +"\t"+geocode_format_latlon(
                data.properties.lat,
                data.properties.lon
            );
    }
    return null;
}
function geocode_format_latlon(lat,lon){
    lat = (lat*1).toFixed(7);
    lon = (lon*1).toFixed(7);
    return lat+","+lon;
}
function geocode_single(address, limit=1, callback=function(data){console.log(data);}){
    if(geocode_service==='nominatim'){
        request_json("https://nominatim.openstreetmap.org/search", {
            "format": "jsonv2",
            "q": address,
            "limit": limit,
            "addressdetails": 1,
            //"email": "...",
        }, callback);
    }
    if(geocode_service==='geokeo'){
        request_json("https://geokeo.com/geocode/v1/search.php", {
            "api": "YOUR_API_KEY",
            "q": address,
        }, callback);
    }
    if(geocode_service==='xyz'){
        request_json("https://geocode.xyz/"+encodeURIComponent(address), {
            "auth": "...",
            "json": 1,
        }, callback);
    }
    if(geocode_service==='geoapify'){
        request_json("https://api.geoapify.com/v1/geocode/search", {
            "text": address,
            "apiKey": apikey_geoapify,
            "format": "geojson",
            "limit": limit,
        }, callback);
    }
}
