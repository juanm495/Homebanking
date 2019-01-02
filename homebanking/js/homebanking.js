//Declaración de variables globales
var loggedIn = false;
var nombreUsuario = "Juanm4";
var codigoSeguridad = 4874;
var saldoCuenta;
var limiteExtraccion;
var usuarioLogeado;

//variable users holds all info on accounts

var users = [
    { nombre: "juanm4", codigo: 4874, saldoCuenta: 4000, limiteExtraccion: 2000 },
    { nombre: "juanm5", codigo: 1234, saldoCuenta: 4000, limiteExtraccion: 1500 },
    { nombre: "asd", codigo: 'asd', saldoCuenta: 3000, limiteExtraccion: 1400 },
];
    
logIn();
actualizarUi();


// logIn function allows us to log in into our bank acc
function logIn() {
    var logueado = prompt("Ingrese nombre de usuario");
    var logueadoPsw = prompt("Ingrese su codigo de seguridad");
    
    //next loop checks if input == stored info

    for (var i = 0; i < users.length; i++) {
        if (logueado == users[i].nombre && logueadoPsw == users[i].codigo) {
            saldoCuenta = users[i].saldoCuenta;
            limiteExtraccion = users[i].limiteExtraccion;
            usuarioLogeado = users[i];
            loggedIn = true;
            currentIndex = i;
            actualizarUi();
            // TIP:  We found our user, no need to keep looking
            return;
        }
    }
        
		if (!loggedIn) {
      alert("Su nombre de usuario o contraseña es incorrecto");
    	saldoCuenta = 0;
    }
}

function cambiarLimiteDeExtraccion() {
    if (checkLogin()) {
        var cambioLimite = prompt("Cual quiere que sea su limite?");
        if (!isNaN(cambioLimite) && cambioLimite != null  && (cambioLimite > 0)) { 
            users[currentIndex].limiteExtraccion = parseFloat(cambioLimite);
            actualizarLimiteEnPantalla();
        } 
            else {alert ('El valor ingresado es incorrecto');
        }
    }
}


function extraerDinero() {
    if (checkLogin()) {
        var dineroExtraccion = prompt("Cuanto dinero desea retirar?");
        if (!isNaN(dineroExtraccion) && (dineroExtraccion != null) && (dineroExtraccion % 100 == 0)  && (dineroExtraccion > 0)) {
            if (dineroExtraccion <= limiteExtraccion && dineroExtraccion <= users[currentIndex].saldoCuenta) {
                users[currentIndex].saldoCuenta = users[currentIndex].saldoCuenta - parseFloat(dineroExtraccion); 
                actualizarSaldoEnPantalla();
            }
            else { 
                alert('El monto seleccionado es mayor al limite o no dispone de suficiente dinero');
            }
        }
        else{alert('El valor ingresado es invalido');}
    } 
}

function depositarDinero() {
    if (checkLogin()) {
        var dineroDeposito = prompt("Cuanto dinero desea depositar?");
        if ((dineroDeposito != null) && (dineroDeposito % 100 == 0) && (dineroDeposito > 0)) {
            users[currentIndex].saldoCuenta = users[currentIndex].saldoCuenta + parseFloat(dineroDeposito); 
            actualizarSaldoEnPantalla();
        }
    }
}

function pagarServicio() {
    switch(prompt("Que servicio desea pagar?")) {
        case "agua":
            var serviciosPago = prompt("Cuanto desea pagar de agua?");
            
            //validations
            
            if (serviciosPago <= limiteExtraccion && serviciosPago <= users[currentIndex].saldoCuenta && serviciosPago != null && (serviciosPago % 100 == 0)) {
                users[currentIndex].saldoCuenta = users[currentIndex].saldoCuenta - parseFloat(serviciosPago); 
                actualizarSaldoEnPantalla();
            }  else { 
                alert('El monto seleccionado invalido');
            }
                break;
        case "luz":
            var serviciosPago = prompt("Cuanto desea pagar de luz?");
            
            //validations
            
            if (serviciosPago <= limiteExtraccion && serviciosPago <= users[currentIndex].saldoCuenta && serviciosPago != null && (serviciosPago % 100 == 0)) {
                 users[currentIndex].saldoCuenta = users[currentIndex].saldoCuenta - parseFloat(serviciosPago); 
                actualizarSaldoEnPantalla();
            } else { 

                alert('El monto seleccionado invalido');
            }
                break;
        case "internet":
            var serviciosPago = prompt("Cuanto desea pagar de internet?");

            //validations

            if (serviciosPago <= limiteExtraccion && serviciosPago <= users[currentIndex].saldoCuenta && serviciosPago != null && (serviciosPago % 100 == 0)) {
                users[currentIndex].saldoCuenta = users[currentIndex].saldoCuenta - parseFloat(serviciosPago); 
                actualizarSaldoEnPantalla();
            }  else { 
                alert('El monto seleccionado invalido');
            }
                break;
        default: alert("No entendimos el servicio (agua, luz o internet) que quiere pagar, por favor reintentelo.");

    }
}

function transferirDinero() {
    var transferNumber = prompt("Cuanto desea transferir?")
    var transferName = prompt("A que cuenta quiere transferir el dinero?")

    //validations

    if ((transferNumber != null) && (transferName != null) && (transferNumber > 0) && (!isNaN(transferNumber))) {

        for (let i = 0; i < users.length; i++) {
    
            if (users[i].nombre == transferName && transferNumber <= users[currentIndex].limiteExtraccion && transferNumber <= users[currentIndex].saldoCuenta) {
        		
                users[i].saldoCuenta = saldoCuenta + parseFloat(transferNumber);

                users[currentIndex].saldoCuenta = saldoCuenta - parseFloat(transferNumber);

                saldoCuenta = saldoCuenta - parseFloat(transferNumber);

           	    actualizarUi();
            
                return;
            }
        }

    } else { 
        alert('El monto seleccionado invalido o el usuario no existe')
    }
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    if (loggedIn) {
        document.getElementById("nombre").innerHTML = "Bienvenido/a " + usuarioLogeado.nombre;
    }
}

function actualizarSaldoEnPantalla() {
    if (loggedIn) {
        document.getElementById("saldo-cuenta").innerHTML = "$" + users[currentIndex].saldoCuenta.toFixed(2);
    }
}

function actualizarLimiteEnPantalla() {
    if (loggedIn) {
        document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + users[currentIndex].limiteExtraccion;
    }
}

function actualizarUi() {
    actualizarLimiteEnPantalla();
    actualizarSaldoEnPantalla();
    cargarNombreEnPantalla();

}
function checkLogin(){
    if (!loggedIn){
        alert("No tiene permiso para hacer esto.");
    }

    return loggedIn;
}