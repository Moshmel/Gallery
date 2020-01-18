function init()
{
        console.log('Todos App');
        createUsers();
}
function onDoLogin()
{
    var form=document.getElementsByTagName('form');
    if(doLogin(form[0][0].value,form[0][1].value)!==undefined)
        {alert('ahalan ahalan')
        document.getElementById('formContent').style.display='none';
        }
     else alert('wrong userName\password');
    
   
}