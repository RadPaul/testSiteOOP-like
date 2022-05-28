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
        if (hr.readyState == 4 && hr.status == 200) {
            var return_data = hr.responseText;
            if (return_data.slice(0,2) == "OK") {
                Crumbs.setCookie("myid", return_data.slice(2));
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
                if (return_data.slice(0,2) == "OK") {
                    Crumbs.setCookie("myid", return_data.slice(2));
                    pageView();
                } else {alert(return_data); }
            }
        }
        hr.send(vars);
    }
}

//site personalization
function pageView() {
    Crumbs.checkCookie("myid");
    Crumbs.checkCookie("mode");
}

//shows/hides authentification form
function logForm() {
    if ((document.getElementById("profile").innerHTML=="Profile") && (document.getElementById("auth").style.display=="inline-block")){
        document.getElementById("auth").style.display="none";
    } else {
        document.getElementById("auth").style.display="inline-block";
    } 
}

//changes visual mode
function changeMode() {
    const sslink = document.getElementById("stylesheet");
    if (sslink.getAttribute("href") == "stylesheets/styleLight.css") {
        Crumbs.setCookie("mode","stylesheets/styleDark.css");
    } else {
        Crumbs.setCookie("mode","stylesheets/styleLight.css");
    }
    return sslink.setAttribute("href", Crumbs.getCookie("mode"));
}

//shows a random number (which is basically the only point of the site being a thing)
function likeAGame() {
    var hr = new XMLHttpRequest();
    var number = Math.round(Math.random()*10000);
    var name = Crumbs.getCookie("myid");
    var vars = "number="+number+"&name="+name;
    hr.open("POST", "php/statistics.php", true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
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
        var name = Crumbs.getCookie("myid");
    }
    var vars = "name="+name;
    hr.open("POST", "php/statistics.php", true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
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

//cookies usage
class Crumbs {
    static getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
            c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    
    static setCookie(cname, cvalue) {
        const d = new Date();
        d.setTime(d.getTime()+(30*24*60*60*1000));
        document.cookie = cname + "=" + cvalue + ";" + "expires=" + d.toUTCString() + ";";
    }

    static checkCookie(cname) {
        let cvalue = this.getCookie(cname);
        switch(cname) {
            case "mode":
                if (cvalue != "") {
                    document.getElementById("stylesheet").setAttribute("href", cvalue);;
                } else {
                    this.setCookie(cname, document.getElementById("stylesheet").getAttribute("href"));
                }
                break;
            case "myid":
                if (cvalue != "") {
                    document.getElementById("profile").innerHTML=cvalue;
                    document.getElementById("profile").setAttribute("onclick", "myStat()");
                    document.getElementById("auth").style.display="none";;
                }
                break;
            default:
                console.log("Wrong cookie's name");
        }
    }
}