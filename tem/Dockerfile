FROM ubuntu:20.04

ENV DEBIAN_FRONTEND noninteractive

# Install tools and dependencies
RUN apt-get update && \
    apt-get -y install --no-install-recommends \
      ca-certificates \
      libsasl2-modules \
      curl \
      automake \
      autopoint \
      autoconf \
      texinfo \
      pkg-config \
      build-essential \
      libtool \
      libltdl-dev \
      libgpg-error-dev \
      libidn11-dev \
      libunistring-dev \
      libglpk-dev \
      libbluetooth-dev \
      libextractor-dev \
      libmicrohttpd-dev \
      libgnutls28-dev \
      libgcrypt20-dev \
      libpq-dev \
      libsqlite3-dev \
      libjansson-dev \
      libcurl4-gnutls-dev \
      libsodium-dev \
      recutils \
      # for vpn and exit
      iptables \
      wget && \
    apt-get clean all && \
    apt-get -y autoremove && \
    rm -rf \
      /var/lib/apt/lists/* \
      /tmp/*

# Install GNUnet
ENV GNUNET_PREFIX /usr/local/gnunet
ENV CFLAGS '-g -Wall -O0'

COPY ./gnunet.tar.gz /tmp/gnunet.tar.gz
RUN cd /tmp && tar -xvf gnunet.tar.gz && rm gnunet.tar.gz && mv gnunet* /gnunet

RUN cd /gnunet && \
      ./configure \
        --prefix="$GNUNET_PREFIX" \
        --enable-logging=verbose \
        --enable-experimental=yes && \
      make -j3 && \
      make install && \
      ldconfig && \
    cd - && \
    rm -fr /gnunet

# Configure GNUnet
COPY ./gnunet.conf /etc/gnunet.conf
COPY ./docker-entrypoint.sh /usr/local/bin/docker-entrypoint
COPY createEBFTrustScheme.sh .
COPY createEUTLTrustScheme.sh .
RUN chmod 755 /usr/local/bin/docker-entrypoint

ENV PATH "$GNUNET_PREFIX/bin:/usr/local/bin:$PATH"

ENTRYPOINT ["docker-entrypoint"]
