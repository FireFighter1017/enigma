class _Rotor{

    constructor(rotorId, rotorEncoding, rotorRingsetting, rotorStart, rotorNotch){
        this._id = rotorId
        this._encoding = rotorEncoding
        this._ringsetting = rotorRingsetting
        this._position = rotorStart
        this._notch = rotorNotch
    }

// properties
    get id(){
        return this._id
    }
    set id(x){
        this._id = x
    }
    get encoding(){
        return this._encoding
    }
    get notch(){
        return this._notch
    }
    get position(){
        return this._position
    }
    set position(x){
        this._position = x
    }



// methods
    move(){
        this._position += 1
        //console.log("rotor " + this._id + " moved")
        console.log("Rotor " + this._id + " moved to position: " + this._position)
        if (this._position > 25) {
            console.log("Rotor " + this._id + " completed a full rotation")
            this._position = 0
            console.log("Rotor " + this._id + " moved to position : " + this._position)
        }
        console.log("Rotor " + this._id + " letter displayed: " + this.display())
    }
    notchIndicator(){
        if (this._position == this._notch) {
            return 1
        } else {
            0
        }
    }
    display(){
        var strAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"       
        return strAlphabet.substr(this._position,1)
    }
    encode(x, direction){
        var strAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        var intStrIndex = 0
        var strLetter = ""
        var strOutput = ""
        var strInLetters = ""
        var strOutLetters = ""

        // Apply wiring depending on direction of encoding
        if (direction == "RTL") { // first encoding pass, left to right
            strInLetters = strAlphabet
            strOutLetters = this._encoding
            console.log("Input letter " + x + " alphabet position is " + strAlphabet.indexOf(x))
        }
        if (direction == "LTR") { // return from reflector, right to left
            strInLetters = this._encoding
            strOutLetters = strAlphabet
            console.log("Input letter " + x + " encoding position is " + this._encoding.indexOf(x))
        }
        
        //TODO: apply ring setting offset
        //

        // Find logical input connector index
        intStrIndex = strAlphabet.indexOf(x) + this._position
        
        // Apply rotor offset 
        if (intStrIndex > 25) {
            intStrIndex = intStrIndex - 26
            console.log("cycle forward rotor")
        }
        // Find physical input connector index
        intStrIndex = strInLetters.indexOf(strAlphabet.substr(intStrIndex, 1))
        console.log("Rotor " + this._id + " position is " + this._position + " entry point at " + intStrIndex)

        // find wired output connector
        strLetter = strOutLetters.substr(intStrIndex, 1)
        console.log("Rotor " + this._id + " entry connector: " + strInLetters.substr(intStrIndex, 1) + " wired to " + strLetter)

        // Apply rotor offset to find relative output
        intStrIndex = strAlphabet.indexOf(strLetter)
        if (intStrIndex < this._position) {
            intStrIndex += 26
            console.log("cycle back rotor")
        }
        strOutput = strAlphabet.substr(intStrIndex - this._position, 1)

        //TODO: apply ring setting to find relative output 
        return strOutput
    }
    
}

module.exports = {
    Rotor:_Rotor
}