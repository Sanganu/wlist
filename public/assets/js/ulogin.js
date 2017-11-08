$(function() {
     //$("#myaccount").hide();
     //$("#htdivnewuserlogin").hide();
     console.log('in ulogin');
  /*   $("#createlogin").on("click",function(event)
      {
        event.preventDefault();
        //$("htdivnewuserlogin").show();
      });
*/
     $("#htnewuser").on("click",function(){
        // Check whether email already used
          event.preventDefault();
        console.log("In create account ");
        var validinput = checkinput();

              if (validinput )
              {
                var email = $("#htemail").val().trim();
                event.preventDefault();
                console.log('check email exist');

                $.ajax("/api/users/check/"+email,{
                  type : "GET"
                }).then(function(response)
                   {
                     if (response.status === 404)
                     {
                       console.log("User Account with this Email-Id already Exist");
                       acexist();
                     }
                     else if(response.status === 200)
                     {
                         var newuser = {
                           fname : $("#htuser_fname").val().trim(),
                           lname : $("#htuser_lname").val().trim(),
                           email: $("#htemail").val().trim(),
                           pword : $("#htconfirmpassword").val().trim()
                         };
                         $.ajax("/api/users/add",
                           {
                             type: "POST",
                             data : newuser
                           }).then(
                                function()
                                {
                                  $("#myaccount").show();
                                }
                           ); //end ajax add
                       } //end of else if 200
                    }); //end of ajax email already exist
                } //end of if pwd
        });   // end of on click
}); // end of function


function acexist()
{
    $("#htuser_lname").val() = "";
    $("#htuser_fname").val() = "";
    $("#htemail").val() = "";
    $("#htpassword").val() = "";
    $("#htconfirmpassword").val() = "";
    $("#ht-yesnoemail").text("Account already exist for this Email Id!!!");
}

function checkpassword()
{
    var pwd1 = $("#htpassword").val().trim();
    var pwd2 = $("#htconfirmpassword").val().trim();

    if( pwd1 === pwd2)
    {
      return true;
    }
    else {
      $("#htpassword").val() = "";
      $("#htconfirmpassword").val() = "";
      $("#ht-yesnopwd").text("Password mismatch");
      return false;
    }
}


function checkinput()
{
    var rightone = true;
    var input1 = $("#htuser_fname").val().trim() ;
    var input2 = $("#htuser_lname").val().trim() ;
    var input3 = $("#htemail").val().trim();
    var input4 = $("#htpassword").val().trim() ;
    var input5 = $("#htconfirmpassword").val().trim() ;

    if ( input1 === "")
    {
      $("#ht-fname").text("First Name cannot be null");
      rightone = false;
    }
    if ( input2 === "")
    {
      $("#ht-lname").text("Lastt Name cannot be null");
      rightone = false;
    }
    if ( input3 === "")
    {
      $("#ht-yesnoemail").text("Email cannot be null");
      rightone = false;
    }
    if ( input4 === "")
    {
      $("#ht-yesnopwd1").text("Password cannot be null");
      rightone = false;
    }
    if ( input5 === "")
    {
      $("#ht-yesnopwd2").text("Required field");
      rightone = false;
    }
    if ( checkpassword)
    {
      console.log("Input -Checking password");
    }
    else {
      rightone = false;
    }
    return rightone;
}
