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
  gnunet-namestore -z ebf -d -n "trusted" -t ATTR
  gnunet-namestore -z aba -d -n "trusted" -t ATTR
  gnunet-namestore -z bdb -d -n "trusted" -t ATTR
  gnunet-arm -e
  echo "Done"

}


which timeout > /dev/null 2>&1 && DO_TIMEOUT="timeout 10"
gnunet-arm -s
gnunet-arm -i abd

gnunet-identity -C ebf
gnunet-identity -C aba
gnunet-identity -C bdb
gnunet-identity -C ing
gnunet-identity -C ober
gnunet-identity -C generali
gnunet-identity -C raiffeisen
EBFKEY=$(gnunet-identity -d  | grep "^ebf -" | awk '{print $3}')
ABAKEY=$(gnunet-identity -d  | grep "^aba -" | awk '{print $3}')
BDBKEY=$(gnunet-identity -d  | grep "^bdb -" | awk '{print $3}')
OBERKEY=$(gnunet-identity -d  | grep "^ober -" | awk '{print $3}')
INGKEY=$(gnunet-identity -d  | grep "^ing -" | awk '{print $3}')
RAIFFEISENKEY=$(gnunet-identity -d  | grep "^raiffeisen -" | awk '{print $3}')
GENERALIKEY=$(gnunet-identity -d  | grep "^generali -" | awk '{print $3}')
gnunet-identity -d


gnunet-abd --createIssuerSide --ego=ebf --attribute="trusted" --subject="$ABAKEY trusted" -D 1 --ttl="2049-12-12 10:00:00"
gnunet-abd --createIssuerSide --ego=ebf --attribute="trusted" --subject="$BDBKEY trusted" -D 1 --ttl="2049-12-12 10:00:00"
gnunet-namestore -D -z ebf
gnunet-abd --createIssuerSide --ego=aba --attribute="trusted" --subject="$RAIFFEISENKEY"  --ttl="2049-12-12 10:00:00"
gnunet-abd --createIssuerSide --ego=aba --attribute="trusted" --subject="$GENERALIKEY"  --ttl="2049-12-12 10:00:00"
gnunet-namestore -D -z aba
gnunet-abd --createIssuerSide --ego=bdb --attribute="trusted" --subject="$OBERKEY"  --ttl="2049-12-12 10:00:00"
gnunet-abd --createIssuerSide --ego=bdb --attribute="trusted" --subject="$INGKEY"  --ttl="2049-12-12 10:00:00"
gnunet-namestore -D -z bdb


# Starting to resolve
curl  --location    --request POST 'http://127.0.0.1:7776/abd/verify' \
    --header 'Content-Type:application/json' \
    --data-raw "{
        \"issuer_key\": \"${EBFKEY}\",
        \"subject_key\": \"${INGKEY}\",
        \"issuer_attr\": \"trusted\",
        \"forward\": false,
        \"backward\": true
            }"
echo "next request \n"

curl  --location    --request POST 'http://127.0.0.1:7776/abd/verify' \
    --header 'Content-Type:application/json' \
    --data-raw "{
        \"issuer_key\": \"${ABAKEY}\",
        \"subject_key\": \"${RAIFFEISENKEY}\",
        \"issuer_attr\": \"trusted\",
        \"forward\": false,
        \"backward\": true
            }"

#cleanup
