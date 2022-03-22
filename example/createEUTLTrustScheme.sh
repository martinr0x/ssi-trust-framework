#!/usr/bin/env bash
trap "gnunet-arm -e " SIGINT

LOCATION=$(which gnunet-config)
if [ -z $LOCATION ]
then
  LOCATION="gnunet-config"
fi
$LOCATION --version 1> /dev/null
if test $? != 0
then
	echo "GNUnet command line tools cannot be found, check environmental variables PATH and GNUNET_PREFIX"
	exit 77
fi


function cleanup {
  echo "+++ Cleanup +++"

  # Cleanup properly
  gnunet-namestore -z eutl -d -n "trusted" -t ATTR
  gnunet-namestore -z at -d -n "trusted" -t ATTR
  gnunet-namestore -z de -d -n "trusted" -t ATTR
  gnunet-arm -e
  echo "Done"

}


which timeout > /dev/null 2>&1 && DO_TIMEOUT="timeout 10"
gnunet-arm -s
gnunet-arm -i abd

gnunet-identity -C eutl
gnunet-identity -C at
gnunet-identity -C de
gnunet-identity -C atrust
gnunet-identity -C globaltrust
gnunet-identity -C deutschepost
gnunet-identity -C medisign
EUTLKEY=$(gnunet-identity -d  | grep "^eutl -" | awk '{print $3}')
ATKEY=$(gnunet-identity -d  | grep "^at -" | awk '{print $3}')
DEKEY=$(gnunet-identity -d  | grep "^de -" | awk '{print $3}')
ATRUSTKEY=$(gnunet-identity -d  | grep "^atrust -" | awk '{print $3}')
GLOBALTRUSTKEY=$(gnunet-identity -d  | grep "^globaltrust -" | awk '{print $3}')
DEUTSCHEPOSTKEY=$(gnunet-identity -d  | grep "^deutschepost -" | awk '{print $3}')
MEDISIGNKEY=$(gnunet-identity -d  | grep "^medisign -" | awk '{print $3}')
gnunet-identity -d

gnunet-abd --createIssuerSide --ego=eutl --attribute="trusted" --subject="$ATKEY trusted" -D 1 --ttl="2049-12-12 10:00:00"
gnunet-abd --createIssuerSide --ego=eutl --attribute="trusted" --subject="$DEKEY trusted" -D 1 --ttl="2049-12-12 10:00:00"
gnunet-namestore -D -z eutl
gnunet-abd --createIssuerSide --ego=at --attribute="trusted" --subject="$ATRUSTKEY"  --ttl="2049-12-12 10:00:00"
gnunet-abd --createIssuerSide --ego=at --attribute="trusted" --subject="$GLOBALTRUSTKEY"  --ttl="2049-12-12 10:00:00"
gnunet-namestore -D -z at
gnunet-abd --createIssuerSide --ego=de --attribute="trusted" --subject="$DEUTSCHEPOSTKEY"  --ttl="2049-12-12 10:00:00"
gnunet-abd --createIssuerSide --ego=de --attribute="trusted" --subject="$MEDISIGNKEY"  --ttl="2049-12-12 10:00:00"
gnunet-namestore -D -z de





# Starting to resolve
curl  --location    --request POST 'http://127.0.0.1:7776/abd/verify' \
    --header 'Content-Type:application/json' \
    --data-raw "{
        \"issuer_key\": \"${EUTLKEY}\",
        \"subject_key\": \"${ATRUSTKEY}\",
        \"issuer_attr\": \"trusted\",
        \"forward\": false,
        \"backward\": true
            }"
echo "next request \n"

curl  --location    --request POST 'http://127.0.0.1:7776/abd/verify' \
    --header 'Content-Type:application/json' \
    --data-raw "{
        \"issuer_key\": \"${DEKEY}\",
        \"subject_key\": \"${DEUTSCHEPOSTKEY}\",
        \"issuer_attr\": \"trusted\",
        \"forward\": false,
        \"backward\": true
            }"

#cleanup
