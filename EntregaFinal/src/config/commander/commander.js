const { Command } = require("commander"); //Importo la libreria commander
const program = new Command(); //Genero un nuevo comando para este proceso

//Definir la configuracion de mi programa
program
	// .option("-w", "Ingrese palabras", " ")
	.option("-d", "Variable para el debug", false) //Flag, descripcion, valor por defecto
	// .option("-p <port>", "Puerto de mi app", "4000")  //El puerto ya se ingresa por las variables de entorno
	.option("--mode <mode>", "Modo de trabajo", "development")
	.requiredOption(
		"-u <user>",
		"Usuario de la aplicacion",
		"No se ingreso ningun usuario"
	); //Ayuda a que el desarrallodor registre sus acciones

program.parse();

const opts = program.opts();
console.log(opts);
console.log(program.args);

module.exports = { opts };
