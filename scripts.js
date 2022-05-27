//adding input for password verification by user
function repass() {
    var chbox=document.getElementById('registration');
    if (chbox.checked) {
        document.getElementById('repassword').style.display="inline";
        document.getElementById('submit').setAttribute('onclick','newUser()');
    } else {
        document.getElementById('repassword').style.display="none";
        document.getElementById('submit').setAttribute('onclick','oldUser()');
    }
}

//logging in
function oldUser() {
    var hr = new XMLHttpRequest();
    var login = document.getElementById("login").value;
    var password = document.getElementById("password").value;
    var todo = "login";
    var vars = "login="+login+"&password="+password+"&todo="+todo;
    hr.open("POST", "php/authentification.php", true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function() {
        console.log(hr);
        if (hr.readyState == 4 && hr.status == 200) {
            var return_data = hr.responseText;
            console.log(return_data);
            if (return_data == "OK") {
                localStorage.setItem("myid", login);
                pageView();
            } else {alert(return_data); }
        }
    }
    hr.send(vars);
}

//making new account
function newUser() {
    var hr = new XMLHttpRequest();
    var login = document.getElementById("login").value;
    var password = document.getElementById("password").value;
    var repassword = document.getElementById("repassword").value;
    if (password !== repassword) {
        alert ("passwords do not match");
    } else {
        var todo = "registration";
        var vars = "login="+login+"&password="+password+"&todo="+todo;
        hr.open("POST", "php/authentification.php", true);
        hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        hr.onreadystatechange = function() {
            console.log(hr);
            if (hr.readyState == 4 && hr.status == 200) {
                var return_data = hr.responseText;
                console.log(return_data);
                if (return_data == "Registered succesfully") {
                    localStorage.setItem("myid", login);
                    pageView();
                } else {alert(return_data); }
            }
        }
        hr.send(vars);
    }
}

//site personalization
function pageView() {
    if (localStorage.getItem("myid")) {
        document.getElementById("profile").innerHTML=localStorage.getItem("myid");
        document.getElementById("profile").setAttribute("onclick", "myStat()");
        document.getElementById("auth").style.display="none";
    }
    //user stylesheet mode
    if (localStorage.getItem("mode") === null) {
        localStorage.setItem("mode", document.getElementById("stylesheet").getAttribute("href"));
    } else {
        document.getElementById("stylesheet").setAttribute("href", localStorage.getItem("mode"));
    }
}

//shows/hides authentification form
function logForm() {
    if ((document.getElementById("profile").innerHTML=="Profile") && (document.getElementById("auth").style.display=="inline-block")){
        document.getElementById("auth").style.display="none";
    } else {
        document.getElementById("auth").style.display="inline-block";
    } 
}

//change the styleshhet mode function
function changeMode() {
    const sslink = document.getElementById("stylesheet");
    if (sslink.getAttribute("href") == "stylesheets/styleLight.css") {
        localStorage.setItem("mode","stylesheets/styleDark.css");
    } else {
        localStorage.setItem("mode","stylesheets/styleLight.css");
    }
    return sslink.setAttribute("href", localStorage.getItem("mode"));
}

//function that shows a random number (which is basically the only point of the site being a thing)
function likeAGame() {
    // Create our XMLHttpRequest object
    var hr = new XMLHttpRequest();
    // Create some variables we need to send to our PHP file
    var number = Math.round(Math.random()*10000);
    var name = localStorage.getItem("myid");
    var vars = "number="+number+"&name="+name;
    hr.open("POST", "php/statistics.php", true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // Access the onreadystatechange event for the XMLHttpRequest object
    hr.onreadystatechange = function() {
        if(hr.readyState == 4 && hr.status == 200) {
            var return_data = hr.responseText;
            document.getElementById("status").innerHTML = return_data;
        }
    }
    hr.send(vars); // Executing the request
}

//user's stat POST data
function myStat(value){
    var hr = new XMLHttpRequest();
    if (value=='all') {
        var name = null;
    } else {
        var name = localStorage.getItem("myid");
    }
    var vars = "name="+name;
    hr.open("POST", "php/statistics.php", true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // Access the onreadystatechange event for the XMLHttpRequest object
    hr.onreadystatechange = function() {
        if(hr.readyState == 4 && hr.status == 200) {
            var return_data = hr.responseText;
            document.getElementById("content").innerHTML = '<p id="myStat">' + return_data + '</p>';
        }
    }
    hr.send(vars); // Executing the request
}

function play() {
    console.log("played well");
    document.getElementById("content").innerHTML='<p onclick="likeAGame();">Try</p><p id="status"> </p>';

}