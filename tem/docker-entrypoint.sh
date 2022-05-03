#!/bin/bash -e

#echo "${LOCAL_PORT_RANGE:-49152 65535}" > /proc/sys/net/ipv4/ip_local_port_range
if [[ -e /etc/gnunet-cfg ]]; then
  cp /etc/gnunet-cfg/gnunet.conf /etc/gnunet.conf
fi

sed -i 's/$GNUNET_PORT/'${GNUNET_PORT:-2086}'/g' /etc/gnunet.conf
sed -i 's/$ADDR_EXT/'${ADDR_EXT:-AUTO}'/g' /etc/gnunet.conf

if [[ $# -eq 0 ]]; then
    gnunet-arm -s
    ./createEBFTrustScheme.sh
    ./createEUTLTrustScheme.sh
  exec gnunet-arm \
    --config=/etc/gnunet.conf \
    --start \
    --monitor
elif [[ -z $1 ]] || [[ ${1:0:1} == '-' ]]; then
  exec gnunet-arm "$@"
else
  exec "$@"
fi
