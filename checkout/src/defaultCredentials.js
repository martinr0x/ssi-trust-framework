export default {
    solvencyVC : {
        raka:  {
                "id": "0892f680-6aeb-11eb-9bcf-f10d8993fde5",
                "type": [
                    "VerifiableCredential",
                    "SolvencyCredential"
                ],
                "issuer": {
                    "id": "000G0004JHVPG5AFA6GATQME704RRXA83Y6HT7C32WN3PYPT7RYRTQ5YP4",
                    "name": "Raiffeisen Bank"
                },
                "issuanceDate": "2022-02-11T23:09:06.803Z",
                "expirationDate": "2022-07-01T19:23:24Z",
                "credentialSubject": {
                    "id": "did:example:ebfeb1f712ebc6f1c276e12ec21",
                    "solvency": {
                        "value": "sufficient"
                    }
                },
                "proof": {
                    "type": "Ed25519Signature2018",
                    "created": "2022-02-17T15:25:26Z",
                    "jws": "eyJhbGciOiJFZERTQYjY0Il19..nlcAA",
                    "proofPurpose": "assertionMethod",
                    "verificationMethod": "https://pathToIssuerPublicKey"
                }

        },
        fake: {

                "id": "0892f680-6aeb-11eb-9bcf-f10d8993fde7",
                "type": [
                    "VerifiableCredential",
                    "SolvencyCredential"
                ],
                "issuer": {
                    "id": "000G0004JHVPG5AFA6GATQME704RRXA83Y6HT7C32WN3PYPT7RYRTQ5YP3",
                    "name": "Fake Bank"
                },
                "issuanceDate": "2022-02-11T23:09:06.803Z",
                "expirationDate": "2022-07-01T19:23:24Z",
                "credentialSubject": {
                    "id": "did:example:ebfeb1f712ebc6f1c276e12ec21",
                    "solvency": {
                        "value": "sufficient"
                    }
                },
                "proof": {
                    "type": "Ed25519Signature2018",
                    "created": "2022-02-17T15:25:26Z",
                    "jws": "eyJhbGciOiJFZERTQYjY0Il19..nlcAA",
                    "proofPurpose": "assertionMethod",
                    "verificationMethod": "https://pathToIssuerPublicKey"
                }
            }
        },

    ageVC :{
        deutschepost: {
            "id": "0562f680-6aeb-11eb-avcf-f10d8233fdb8",
            "type": [
                "VerifiableCredential",
                "AgeVerificationCredential"
            ],
            "issuer": {
                "id": "000G0075X0KKBRXFXJND2EMR6CPQTSH8EQ2KA6NECBK8FEV95R67BPW0Z0",
                "name": "Deutsche Post"
            },
            "issuanceDate": "2022-02-11T22:09:06.803Z",
            "expirationDate": "2022-07-01T15:23:24Z",
            "credentialSubject": {
                "id": "did:example:ebfeb1f712ebc6f1c276e12ec21",
                "age": {
                    "type": "age of majority",
                    "value": "legalAge"
                }
            },
            "proof": {
                "type": "Ed25519Signature2018",
                "created": "2022-02-17T15:25:26Z",
                "jws": "eyJhbGciOiJFZERTQYjY0Il19..nlcAA",
                "proofPurpose": "assertionMethod",
                "verificationMethod": "https://pathToIssuerPublicKey"
            }
        }
    }
}
