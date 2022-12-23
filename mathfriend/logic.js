const highest_result = 10;
let answer = null;
$(function(){
    $("#maxNumHeader").text(""+highest_result);
    document.getElementById("answer").onkeyup = function(e) {
        if(e.key==="Enter"){
            mathfriend();
            return false;
        }
        let result = ""
        if(parseInt($('#answer').val())===answer){
            result = "✅ "+lob[Math.floor(Math.random()*lob.length)]+"!";
            result = result.toUpperCase();
        }
        $('#result').val(result);
    };
});
const lob=[
    "Richtig",
    "Richtig gerechnet",
    "Gratuliere",
    "Gratulation",
];
function mathfriend(){
    answer = randomIntFromInterval(0, highest_result);
    const operator_index = Math.floor(Math.random()*2);
    let operator,zahl1,zahl2;
    if(operator_index===0){
        operator = "+";
        zahl1 = randomIntFromInterval(0, answer);
        zahl2 = answer-zahl1;
    }else if(operator_index===1){
        operator = "-";
        zahl1 = randomIntFromInterval(answer, highest_result);
        zahl2 = zahl1-answer;
    }
    let aufgabe = zahl1+" "+operator+" "+zahl2+" =";
    console.log(answer);
    $('#question').val(aufgabe);
    $('#answer').val('').focus();
    $('#result').val('');
}
