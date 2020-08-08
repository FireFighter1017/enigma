var RotorClass = require("./rotor")
var strInput = "AAAAA" // Input letter entered by user
var arrInput = strInput.split("")
var strBaseAlpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" // Standard Alphabet
var strPatchedAlpha = "JBCDEFGHIAKLMNSPQRTOUVWXYZ" // Pegboard patched letters (A-J, S-O)
var dblstep = false
var ltr = "" // letter output from rotors
var arr = [] // array to process the rotors encodings

// Standard rotors definitions
var rotor_lhs = new RotorClass.Rotor("I","EKMFLGDQVZNTOWYHXUSPAIBRCJ",0,0,17)
var rotor_mid = new RotorClass.Rotor("II", "AJDKSIRUXBLHWTMCQGZNPYFVOE",0,0,5)
var rotor_rhs = new RotorClass.Rotor("III", "BDFHJLCPRTXVZNYEIWGAKMUSQO",0,0,23)
var reflector = new RotorClass.Rotor("UKW-B", "YRUHQSLDPXNGOKMIEBFZCWVJAT",0,0,1)


// enigma's rotor management on key pressed
function rotorsMovement() {

    // take care of double step flaw (M3 and older)
    if (dblstep) {
        rotor_mid.move()
        rotor_lhs.move()
        dblstep = false
    }
    // Move rotor 1
    //console.log("Right rotor - moved 1")
    rotor_rhs.move()
    if (rotor_rhs.notchIndicator()==1) {
        rotor_mid.move()
        if (rotor_mid.notch-rotor_mid.position == 1) {
            dblstep = true
            //rotor_mid.move()
        } else {
            dblstep=false//console.log("Left rotor - no movement")
        }

    } else {
        //console.log("Middle rotor - no movement")
    }
    
    //dblstep = rotor_mid.position-rotor_mid.notch == 0 && rotor_lhs.position-rotor_lhs.notch == 1

    console.log("-------- ROTOR DISPLAY --------")
    console.log("        [" +  
                rotor_lhs.display() + "]   [" + 
                rotor_mid.display() + "]   [" +
                rotor_rhs.display() + "]")
}

// main function to encode a letter using enigma
function encode(parInput) {
    var i = 0
    var ltr = ""
    var strOutput = [""]

    console.log("===============================")
    console.log("----- INITIALIZING ROTORS -----")
    console.log("order of rotors: ")
    console.log("  Right : " + rotor_rhs.id)
    console.log("  Middle: " + rotor_mid.id)
    console.log("  Left  : " + rotor_lhs.id)
    console.log(" ")
    console.log("-------- ROTOR DISPLAY --------")
    console.log("        [" + 
                rotor_lhs.display() + "]   [" + 
                rotor_mid.display() + "]   [" +
                rotor_rhs.display() + "]")
    console.log(" ")
    console.log("===============================")
    console.log("------ STARTING ENCODING ------")
    console.log(" ")
    for (i = 0; i < arrInput.length; i++) {
        console.log(" ")
        rotorsMovement();
        console.log(" ")
        console.log("----- ENCODE LETTER " + i + " -----")
    
        // letter position in the alphabet
        ltr = arrInput[i]
        console.log("input letter :" + ltr)
        //TODO: Plugboard mappings

        // encoding through rotors right to left
        //TODO: add logic for offset
        ltr = rotor_rhs.encode(ltr, "RTL")
        console.log("RIGHT rotor encoding = " + ltr)
        ltr = rotor_mid.encode(ltr, "RTL")
        console.log("MIDDLE rotor encoding = " + ltr)
        ltr = rotor_lhs.encode(ltr, "RTL")
        console.log("LEFT rotor encoding = " + ltr)

        // Reflector
        ltr = reflector.encode(ltr, "RTL")
        console.log("Reflector encoding = " + ltr)
        
        // encoding through rotors left to right
        ltr = rotor_lhs.encode(ltr, "LTR")
        console.log("LEFT rotor encoding = " + ltr)
        ltr = rotor_mid.encode(ltr, "LTR")
        console.log("MIDDLE rotor encoding = " + ltr)
        ltr = rotor_rhs.encode(ltr, "LTR")
        console.log("RIGHT rotor encoding = " + ltr)
        
        console.log(" ")        
        console.log(" ")
        console.log("-------- OUTPUT LETTER --------")
        console.log(" Encoded letter: [ " + ltr + " ]")

        console.log("===============================")
        console.log("------- END OF ENCODING -------")
        strOutput[i] = ltr

    }


    console.log("===============================")
    console.log("------ ENCODING RESULTS -------")
    console.log("Output:  [" + strOutput.join() + "]")
    console.log("")
    console.log("-------- ROTOR DISPLAY --------")
    console.log("        [" + 
                rotor_lhs.display() + "]   [" + 
                rotor_mid.display() + "]   [" +
                rotor_rhs.display() + "]")
}

encode(strInput)

