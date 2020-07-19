$(document).ready(() => {
    $("#bton").click(() => {
        checkAdmin(redirect);//redirect is the callback used to replace the page
    });
    function checkAdmin(callBack){
        const uName1=$("#user");
        const pass1=$("#pass");
        const msg=$("#msg")
        if (uName1.val()!=="admin"||pass1.val()!=="12345") {
            msg.text("You are not authorised to access")
            setTimeout(() => {
                msg.text('');            
            }, 3000);
            return false;
        }else{
            msg.text("Welcome Admin"); 
            setTimeout(() => {
                callBack();  
                return true;   
            }, 1000);
            
        }

    }
    const redirect=() => {
        window.location.replace("./todo.html")
    }
    
})
