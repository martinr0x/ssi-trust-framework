
export default function policy (ebf,eutl) {

  return `package webshop

verifyAbd :="http://abd:7776/abd/verify"
trustSchemeEBF  = "${ebf}"
trustSchemeEUTL = "${eutl}"
maxOrderValueWithoutSolvency = 10000

default solvencyVerificationRequired = false
solvencyVerificationRequired = true{
    maxOrderValueWithoutSolvency < input.order.orderValue.value
    input.order.paymentCondition == "CashOnDelivery"
}

default isOrderTrusted = false
isOrderTrusted = true{

    input.order.ageVerificationRequired == false
    solvencyVerificationRequired == false
}
isOrderTrusted = true{

    input.order.ageVerificationRequired == false
    solvencyTrusted == true
}

isOrderTrusted = true{

    ageVerificationTrusted == true
    solvencyVerificationRequired == false
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
            "backward": true,
            "forward": false
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
            "backward": true,
            "forward": false
            }
        })
    response.body["success"] == true
}`
}
