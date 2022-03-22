
package webshop



verifyAbd :="http://127.0.0.1:7776/abd/verify"
trustSchemeEBF  = "000G0012V5ZV0TQC6MVWGATR7QX54R63FATH6FXPVYAFCKGB8BWWY5BFKR"
trustSchemeEUTL = "000G00773DAFT2QKJZJ1EHGB2V77QN0F7T17TXB2XK92R3W3JKTPEKZN90"
maxOrderValueWithoutSolvency = 10000

default isOrderTrusted = false
isOrderTrusted = true{

    input.order.ageVerificationRequired == false
    maxOrderValueWithoutSolvency > input.order.quantity * input.order.price.value
}
isOrderTrusted = true{

    input.order.ageVerificationRequired == false
    solvencyTrusted == true
}

isOrderTrusted = true{
    
    maxOrderValueWithoutSolvency > input.order.quantity * input.order.price.value
    ageVerificationTrusted == true
}
isOrderTrusted = true{
    solvencyTrusted == true
    ageVerificationTrusted == true
}

default solvencyTrusted = false
solvencyTrusted = true {          

    solvency := input.solvencyVC
    solvency.type[_] == "SolvencyCredential" 
    solvency.credentialSubject.solvency.value != "insufficient"

    response := http.send({
        "url":verifyAbd, 
        "method":"POST" ,
        "body":{
            "issuer_key": trustSchemeEBF,
            "subject_key": solvency.issuer.id,
            "issuer_attr": "trusted",
            "backward": true
            }
        })
    response.body["success"] == true
}

ageVerificationTrusted = true {          
    age := input.ageVC

    age.type[_] == "AgeVerificationCredential"
    age.credentialSubject.age.value == "legalAge"
    
    response := http.send({
        "url":verifyAbd, 
        "method":"POST" ,
        "body":{
            "issuer_key": trustSchemeEUTL,
            "subject_key": age.issuer.id,
            "issuer_attr": "trusted",
            "backward": true
            }
        })
    response.body["success"] == true
}

